"use client";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { StudioUploader } from "./studio-uploader";
import { useRouter } from "next/navigation";

export const StudioUploadModal = () => {
  const router = useRouter();
  const utils = trpc.useUtils();
  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      toast.success("Video created!");
      utils.studio.getMany.invalidate();
    },
  });

  const onSuccess = () => {
    if (!create.data?.video.id) return;

    create.reset();
    router.push(`/studio/videos/${create.data?.video.id}`);
  };
  return (
    <>
      <ResponsiveDialog
        title="Upload video"
        open={!!create.data?.url}
        onOpenChange={() => create.reset()}
      >
        <StudioUploader endpoint={create.data?.url} onSuccess={onSuccess} />
      </ResponsiveDialog>
      <Button
        onClick={() => create.mutate()}
        variant="secondary"
        disabled={create.isPending}
      >
        {create.isPending ? <Loader2 className="animate-spin" /> : <Plus />}
        <span>Create</span>
      </Button>
    </>
  );
};
