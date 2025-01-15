import NavigationMenu from "@/components/nav/NavigationMenu";
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
