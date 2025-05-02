import { formatDuration } from "@/lib/utils";
import Image from "next/image";

type VideoThumbnailProps = {
  title: string;
  duration: number;
  imageUrl?: string;
  previewUrl?: string;
};
export const VideoThumbnail = ({
  imageUrl = "/placeholder.svg",
  previewUrl,
  duration,
}: VideoThumbnailProps) => {
  console.log("🚀 ~ previewUrl:", previewUrl);
  console.log("🚀 ~ imageUrl:", imageUrl);
  return (
    <div className="relative group">
      {/* Thumbnail wrapper */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        <Image
          // src={imageUrl}
          src={"/placeholder.svg"}
          alt="video thumbnail"
          fill
          className="size-full object-cover object-center group-hover:opacity-0"
        />
        {previewUrl ? (
          <Image
            // src={previewUrl}
            src={"/placeholder.svg"}
            alt="video preview"
            fill
            className="size-full object-cover object-center opacity-0 group-hover:opacity-100"
          />
        ) : null}
      </div>

      {/* Video durationbox */}
      {/* TODO: Add video duration box */}
      <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
        {formatDuration(duration)}
      </div>
    </div>
  );
};
