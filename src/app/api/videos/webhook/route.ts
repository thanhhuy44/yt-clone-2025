import { eq } from "drizzle-orm";
import {
  VideoAssetCreatedWebhookEvent,
  VideoAssetErroredWebhookEvent,
  VideoAssetReadyWebhookEvent,
  VideoAssetTrackReadyWebhookEvent,
} from "@mux/mux-node/resources/webhooks";
import { headers } from "next/headers";
import { mux } from "@/lib/mux";
import { videos } from "@/db/schema";
import { db } from "@/db";

const SIGNING_SECRET = process.env.MUX_WEBHOOK_SECRET!;

type WebhookEvent =
  | VideoAssetCreatedWebhookEvent
  | VideoAssetErroredWebhookEvent
  | VideoAssetReadyWebhookEvent
  | VideoAssetTrackReadyWebhookEvent;

export const POST = async (request: Request) => {
  if (!SIGNING_SECRET) throw new Error("Missing MUX_WEBHOOK_SECRET");
  const headersPayload = await headers();
  const muxSignature = headersPayload.get("mux-signature");
  if (!muxSignature)
    throw new Response("No signature found!", {
      status: 400,
    });
  const payload = await request.json();
  console.log("🚀 ~ POST ~ payload:", payload.type)
  const body = JSON.stringify(payload);
  mux.webhooks.verifySignature(
    body,
    {
      "mux-signature": muxSignature,
    },
    SIGNING_SECRET
  );
  switch (payload.type as WebhookEvent["type"]) {
    case 'video.asset.created': {
      const data = payload.data as VideoAssetCreatedWebhookEvent["data"];
      if (!data.upload_id) {
        return new Response("No upload id found", {
          status: 400,
        });
      }
      await db
        .update(videos)
        .set({
          muxAssetId: data.id,
          muxStatus: data.status,
        })
        .where(eq(videos.muxUploadId, data.upload_id));
      break;
    }
    case 'video.asset.ready': {
      const data = payload.data as VideoAssetReadyWebhookEvent["data"];
      if (!data.upload_id) {
        return new Response("No upload id found", {
          status: 400,
        });
      }

      const playbackId = data.playback_ids?.[0]?.id;
      if (!playbackId){
        return new Response("No playback id found", {
          status: 400,
        });
      }
      const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.png`
      const previewUrl  = `https://image.mux.com/${playbackId}/animated.gif`
      const duration = data.duration ? Math.round(data.duration * 1000) : 0
      
        
      await db.update(videos).set({
        muxStatus: data.status, 
        muxPlaybackId: playbackId,
        thumbnailUrl,
        previewUrl,
        duration
      }).where(eq(videos.muxUploadId, data.upload_id))
      break
    }

  }
  return new Response("Webhook received", { status: 200 });
};
