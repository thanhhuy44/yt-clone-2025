"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/trpc/client";
import { MoreVertical, Trash } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  id: string;
};

const FormSectionSkeleton = () => {
  return <div>Loading</div>;
};

const FormSectionSuspense = ({ id }: Props) => {
  const [video] = trpc.studio.getOne.useSuspenseQuery({ id });
  return (
    <div className="flex items-center justify-between pb-6">
      <div>
        <h1 className="text-2xl font-bold">Video detail</h1>
        <p className="text-xs text-muted-foreground">
          Manage your video detail
        </p>
      </div>
      <div className="flex items-center gap-x-2">
        <Button type="submit" disabled={false}>
          Save
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Trash className="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
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
