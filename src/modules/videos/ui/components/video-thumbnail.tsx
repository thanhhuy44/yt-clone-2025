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
}: VideoThumbnailProps) => {
  return (
    <div className="relative group">
      {/* Thumbnail wrapper */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        <Image
          src={imageUrl}
          alt="video thumbnail"
          fill
          className="size-full object-cover object-center group-hover:opacity-0"
        />
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="video preview"
            fill
            className="size-full object-cover object-center opacity-0 group-hover:opacity-100"
          />
        ) : null}
      </div>

      {/* Video durationbox */}
      {/* TODO: Add video duration box */}
    </div>
  );
};
