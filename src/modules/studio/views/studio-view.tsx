import { VideosSection } from "../sections/videos-section";

export const StudioView = () => {
  return (
    <div className="pt-2.5 space-y-6">
      <div className="px-4">
        <h1 className="text-2xl">Channel Content</h1>
        <p className="text-xs text-muted-foreground">
          Manage your channel content and videos
        </p>
      </div>
      <VideosSection />
    </div>
  );
};
