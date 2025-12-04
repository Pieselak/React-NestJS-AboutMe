import useThemeMode from "@/app/hooks/useThemeMode.ts";
import { LanguagesIcon, MoonStarIcon, SunIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { navigationItem } from "@/app/layouts/User/User.layout.tsx";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

type userHeaderProps = {
  navigationItems: navigationItem[];
};

export function UserHeader({ navigationItems }: userHeaderProps) {
  const [themeMode, setThemeMode] = useThemeMode();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="flex justify-center items-center gap-2.5 m-3 overflow-x-hidden z-50 w-full"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center bg-card rounded-xl border-2 border-border hover:border-ring cursor-pointer transition-[border-color] duration-250"
      >
        <Link to="/language" className="p-2.5">
          <LanguagesIcon className="size-4.5" />
        </Link>
      </motion.button>
      <nav className="flex bg-card/95 backdrop-blur-sm border-2 border-border rounded-xl p-1.5 gap-1">
        {navigationItems.map((navigationItem) => (
          <Link
            key={navigationItem.url}
            to={navigationItem.url}
            className={`flex gap-1 items-center border px-2 py-1 rounded-md hover:border-ring cursor-pointer transition-[border-color, background-color] duration-250 ${
              pathname.split("/")[1] === navigationItem.url.substring(1)
                ? "bg-accent/30 border-ring text-accent-foreground"
                : "border-transparent"
            }`}
          >
            {navigationItem.icon && (
              <navigationItem.icon className="size-4.5" />
            )}
            {t(`user.nav.${navigationItem.label}`)}
          </Link>
        ))}
      </nav>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center p-2.5 bg-card rounded-xl border-2 border-border hover:border-ring cursor-pointer transition-[border-color] duration-250"
        onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
      >
        {themeMode === "light" ? (
          <MoonStarIcon className="size-4.5" />
        ) : (
          <SunIcon className="size-4.5" />
        )}
      </motion.button>
    </motion.header>
  );
}
