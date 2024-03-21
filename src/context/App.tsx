"use client";

import { createContext, useState, useContext } from "react";

type IContext = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};

const AppContext = createContext<IContext>({
  sidebarOpen: true,
  toggleSidebar: () => {},
});

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const value = {
    sidebarOpen,
    toggleSidebar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
