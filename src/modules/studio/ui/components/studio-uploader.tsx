"use client";

import { Button } from "@/components/ui/button";
import MuxUploader, {
  MuxUploaderDrop,
  MuxUploaderFileSelect,
  MuxUploaderProgress,
  MuxUploaderStatus,
} from "@mux/mux-uploader-react";
import { Upload } from "lucide-react";

interface StudioUploaderProps {
  endpoint?: string;
  onSuccess: () => void;
}

const UPLOADER_ID = "video-uploader";

export const StudioUploader: React.FC<StudioUploaderProps> = ({
  endpoint,
  onSuccess,
}) => {
  return (
    <div>
      <MuxUploader
        onSuccess={onSuccess}
        endpoint={endpoint}
        id={UPLOADER_ID}
        className="hidden group/uploader "
      />
      <MuxUploaderDrop muxUploader={UPLOADER_ID} className="group/drop">
        <div slot="heading" className="flex flex-col items-center gap-y-6">
          <div className="flex items-center justify-center rounded-full bg-muted size-32">
            <Upload className="size-10 text-muted-foreground group/drop-[&[active]]:animate-bounce transition-all duration-3" />
          </div>
          <div className="text-center">
            <p className="text-sm">Drag and drop video files to upload</p>
            <p className="text-xs text-muted-foreground">
              Your videos will be private until you publish them!
            </p>
          </div>
          <MuxUploaderFileSelect muxUploader={UPLOADER_ID}>
            <Button type="button" className="rounded-full">
              Select files
            </Button>
          </MuxUploaderFileSelect>
        </div>
        <div slot="separator" className="hidden"></div>
        <MuxUploaderStatus muxUploader={UPLOADER_ID} className="text-sm" />
        <MuxUploaderProgress
          muxUploader={UPLOADER_ID}
          className="text-sm"
          type="percentage"
        />
        <MuxUploaderProgress muxUploader={UPLOADER_ID} type="bar" />
      </MuxUploaderDrop>
    </div>
  );
};
