import HomeLayout from "@/modules/home/ui/layouts/home-layout";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default Layout;
