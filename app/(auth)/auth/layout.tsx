import AuthNavigationMenu from "@/components/nav/AuthNavigationMenu";
import React from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <AuthNavigationMenu />
      {children}
    </main>
  );
};

export default AppLayout;
