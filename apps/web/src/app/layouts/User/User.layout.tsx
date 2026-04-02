import { motion, MotionConfig } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import {
  CandyIcon,
  FoldersIcon,
  HomeIcon,
  type LucideIcon,
  UserIcon,
} from "lucide-react";

import useIsMobile from "@/app/hooks/useIsMobile.ts";
import { UserFooter } from "@/app/layouts/User/Footer/UserFooter.tsx";
import { UserHeader } from "@/app/layouts/User/Header/UserHeader.tsx";
import { UserMobileHeader } from "@/app/layouts/User/MobileHeader/UserMobileHeader.tsx";

export type navigationItem = {
  label: string;
  icon?: LucideIcon;
  url: string;
};

const navigationItems: navigationItem[] = [
  { label: "home", icon: HomeIcon, url: "/home" },
  { label: "aboutme", icon: UserIcon, url: "/about" },
  { label: "projects", icon: FoldersIcon, url: "/projects" },
  { label: "glucose", icon: CandyIcon, url: "/glucose" },
];

export function UserLayout() {
  const isMobile = useIsMobile();
  const location = useLocation();

  return (
    <MotionConfig transition={{ duration: 0.25, ease: "easeInOut" }}>
      <div className="flex flex-col justify-start items-center min-h-dvh">
        {isMobile ? (
          <UserMobileHeader navigationItems={navigationItems} />
        ) : (
          <UserHeader navigationItems={navigationItems} />
        )}

        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, transform: "scale(1)" }}
          animate={{ opacity: 1, transform: "scale(1)" }}
          transition={{
            opacity: { duration: 0.2 },
            transform: { duration: 0.25 },
          }}
          className="flex flex-1 justify-center items-start overflow-hidden p-3 pmax-w-6xl"
        >
          <Outlet />
        </motion.main>
        <UserFooter />
      </div>
    </MotionConfig>
  );
}
