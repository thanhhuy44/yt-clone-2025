"use client";

import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { FC, Suspense } from "react";
import { FilterCarosel } from "@/components/filter-carousel";
import { useRouter } from "next/navigation";

interface SectionProps {
  category?: string;
}

const CategorySkeletion = () => {
  return <FilterCarosel isLoading onSelectAction={() => {}} />;
};

const CategoriesSectionSuspense: FC<SectionProps> = ({ category }) => {
  const [categories] = trpc.categories.getMany.useSuspenseQuery();
  const router = useRouter();

  const onSelect = (value?: string) => {
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set("category", value);
    } else {
      url.searchParams.delete("category");
    }
    router.push(url.toString());
  };

  return (
    <section>
      <FilterCarosel
        value={category}
        data={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
        onSelectAction={onSelect}
      />
    </section>
  );
};

export const CategoriesSection: FC<SectionProps> = ({ category }) => {
  return (
    <section>
      <Suspense fallback={<CategorySkeletion />}>
        <ErrorBoundary fallback={<p>Error</p>}>
          <CategoriesSectionSuspense category={category} />
        </ErrorBoundary>
      </Suspense>
    </section>
  );
};
