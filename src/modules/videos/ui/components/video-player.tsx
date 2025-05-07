"use client";

import { DEFAULT_THUMBNAIL } from "@/constants";
import MuxPlayer from "@mux/mux-player-react";

type Props = {
  playbackId?: string | null;
  thumbnailUrl?: string | null;
  autoPlay?: boolean;
  onPlay?: VoidFunction;
};
export const VideoPlayer = ({
  playbackId = "",
  thumbnailUrl = DEFAULT_THUMBNAIL,
  autoPlay = true,
  onPlay = () => {},
}: Props) => {
  return (
    <div>
      <MuxPlayer
        autoPlay={autoPlay}
        playbackId={playbackId!}
        onPlay={onPlay}
        poster={thumbnailUrl!}
        playerInitTime={0}
        thumbnailTime={0}
        className="size-full object-contain"
        accentColor="#ff2056"
      />
    </div>
  );
};
