import StudioLayout from "@/modules/studio/ui/layouts/studio-layout";
import { LayoutProps } from "@/types";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <StudioLayout>{children}</StudioLayout>;
};

export default Layout;
