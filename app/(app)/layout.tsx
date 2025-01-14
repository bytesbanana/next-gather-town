import NavigationMenu from "@/components/nav/navigation-menu";
import React from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <NavigationMenu />
      {children}
    </main>
  );
};

export default AppLayout;
