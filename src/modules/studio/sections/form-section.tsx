"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/trpc/client";
import {
  Copy,
  CopyCheck,
  Globe,
  ImagePlus,
  Lock,
  MoreVertical,
  RotateCcw,
  Sparkle,
  Trash,
} from "lucide-react";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { videoUpdateSchema } from "@/db/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { VideoPlayer } from "@/modules/videos/ui/components/video-player";
import Link from "next/link";
import { snakeCaseToTitle } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DEFAULT_THUMBNAIL } from "@/constants";

type Props = {
  id: string;
};

const FormSectionSkeleton = () => {
  return <div>Loading</div>;
};

const FormSectionSuspense = ({ id }: Props) => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const utils = trpc.useUtils();

  const [video] = trpc.studio.getOne.useSuspenseQuery({ id });
  const [categories] = trpc.categories.getMany.useSuspenseQuery();

  const update = trpc.videos.update.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();
      utils.studio.getOne.invalidate({ id });
      toast.success("Video updated successfully!");
    },
    onError: (error) => {
      console.error("🚀 ~ FormSectionSuspense ~ error:", error);
      toast.error("Something went wrong");
    },
  });

  const remove = trpc.videos.remove.useMutation({
    onSuccess: async () => {
      await utils.studio.getMany.invalidate();
      toast.success("Video removed successfully!");
      router.replace("/studio");
    },
    onError: (error) => {
      console.error("🚀 ~ FormSectionSuspense ~ error:", error);
      toast.error("Something went wrong");
    },
  });

  // console.log("🚀 ~ FormSectionSuspense ~ video:", video);

  const form = useForm<z.infer<typeof videoUpdateSchema>>({
    defaultValues: video,
    resolver: zodResolver(videoUpdateSchema),
  });

  const onSubmit = async (data: z.infer<typeof videoUpdateSchema>) => {
    console.log("🚀 ~ onSubmid ~ data:", data);
    update.mutate(data);
  };

  const fullUrl = `https://youtube.filixer.site/videos/${video.id}`;

  const onCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between pb-6">
          <div>
            <h1 className="text-2xl font-bold">Video detail</h1>
            <p className="text-xs text-muted-foreground">
              Manage your video detail
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <Button type="submit" disabled={update.isPending}>
              Save
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => remove.mutate({ id })}>
                  <Trash className="size-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-8 lg:col-span-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title
                    {/* TODO: Add AI generate button */}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Add a title to your video"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* TODO: Add video thumbnail here */}
            <FormField
              control={form.control}
              name="thumbnailUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <div
                      className="p-0.5 rounded-md border border-dashed border-neutral-400
                    w-[153px] group relative h-[84px]"
                    >
                      <Image src={DEFAULT_THUMBNAIL} fill alt={video.title} />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            type="button"
                            size={"icon"}
                            className=" absolute top-1 right-1 duration-150 size-7 md:opacity-0 group-hover:opacity-100"
                          >
                            <MoreVertical className="size text-white-" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" side="right">
                          <DropdownMenuItem>
                            <ImagePlus className="mr-1 size-4" />
                            Change
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Sparkle className="mr-1 size-4" />
                            AI-generated
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RotateCcw className="mr-1 size-4" />
                            Restore
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*  */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description
                    {/* TODO: Add AI generate button */}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      rows={4}
                      placeholder="Add description to your video"
                      className="resize-x-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category
                    {/* TODO: Add AI generate button */}
                  </FormLabel>
                  <Select
                    defaultValue={field.value ?? undefined}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-8">
            {/*  */}
            <div className="flex flex-col gap-4 bg-[#f9f9f9] rounded-xl overflow-hidden h-fit">
              <div className="aspect-video overflow-hidden relative">
                <VideoPlayer
                  playbackId={video.muxPlaybackId}
                  thumbnailUrl={video.thumbnailUrl}
                />
              </div>
              <div className="p-4 flex flex-col gap-y-6">
                <div className="flex items-center justify-between gap-x-2">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Video link</p>
                    <div className="flex items-center gap-x-2">
                      <Link href={`/videos/${video.id}`}>
                        <p className="line-clamp-1 text-blue-500">{fullUrl}</p>
                      </Link>
                      <Button
                        type="button"
                        variant={"ghost"}
                        size={"icon"}
                        className="shrink-0"
                        onClick={onCopy}
                        disabled={isCopied}
                      >
                        {isCopied ? <CopyCheck /> : <Copy />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs">
                      Video status
                    </p>
                    <p className="text-sm">
                      {snakeCaseToTitle(video.muxStatus)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs">
                      Track status
                    </p>
                    <p className="text-sm">
                      {snakeCaseToTitle(video.muxTrackStatus || "no subtitles")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visibility</FormLabel>
                  <Select
                    defaultValue={field.value ?? undefined}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center gap-x-1">
                          <Globe className="size-4" />
                          Public
                        </div>
                      </SelectItem>
                      <SelectItem value="private">
                        <div className="flex items-center gap-x-1">
                          <Lock className="size-4" />
                          Private
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export const FormSection = ({ id }: Props) => {
  return (
    <Suspense fallback={<FormSectionSkeleton />}>
      <ErrorBoundary fallback={<p>error</p>}>
        <FormSectionSuspense id={id} />
      </ErrorBoundary>
    </Suspense>
  );
};
