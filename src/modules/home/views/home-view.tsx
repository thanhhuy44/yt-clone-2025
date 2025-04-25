import { FC } from "react";
import { CategoriesSection } from "../ui/sections/categories-section";

interface HomeViewProps {
  category?: string;
}

const HomeView: FC<HomeViewProps> = ({ category }) => {
  return (
    <div className="max-w-full overflow-hidden">
      <CategoriesSection category={category} />
    </div>
  );
};

export default HomeView;
