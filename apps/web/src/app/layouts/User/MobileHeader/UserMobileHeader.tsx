import { useState } from "react";
import {
  LanguagesIcon,
  MenuIcon,
  MoonStarIcon,
  SunIcon,
  XIcon,
} from "lucide-react";
import type { navigationItem } from "@/app/layouts/User/User.layout.tsx";
import { Link, useLocation } from "react-router-dom";
import useThemeMode from "@/app/hooks/useThemeMode.ts";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

type UserMobileHeaderProps = {
  navigationItems: navigationItem[];
};

export function UserMobileHeader({ navigationItems }: UserMobileHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeMode, setThemeMode] = useThemeMode();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <header className="flex justify-start items-center w-full gap-2.5 my-3 z-50">
      <motion.div
        initial="hidden"
        animate={menuOpen ? "exit" : "visible"}
        variants={menuVariants}
        className="flex justify-between items-center gap-2.5 px-3"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setMenuOpen(true);
          }}
          className="flex items-center p-2.5 bg-card rounded-xl border-2 border-border hover:border-ring cursor-pointer transition-[border-color] duration-250"
        >
          <MenuIcon className="size-4.5" />
        </motion.button>
      </motion.div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed flex flex-col justify-center items-center top-0 w-full p-3 gap-2.5 bg-card/70 backdrop-blur-sm border-b-2 border-border"
          >
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="flex items-center p-2.5 bg-card rounded-xl border-2 border-border hover:border-ring cursor-pointer transition-[border-color] duration-250"
              >
                <XIcon className="size-4.5" />
              </motion.button>
              <div className="flex justify-between items-center gap-2.5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center p-2.5 bg-card rounded-xl border-2 border-border hover:border-ring cursor-pointer transition-[border-color] duration-250"
                >
                  <Link to="/language">
                    <LanguagesIcon className="size-4.5" />
                  </Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center p-2.5 bg-card rounded-xl border-2 border-border hover:border-ring cursor-pointer transition-[border-color] duration-250"
                  onClick={() =>
                    setThemeMode(themeMode === "light" ? "dark" : "light")
                  }
                >
                  {themeMode === "light" ? (
                    <MoonStarIcon className="size-4.5" />
                  ) : (
                    <SunIcon className="size-4.5" />
                  )}
                </motion.button>
              </div>
            </div>
            <nav className="flex w-full flex-col justify-center items-center gap-2">
              {navigationItems.map((navigationItem, index) => (
                <motion.div
                  key={navigationItem.url}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  style={{
                    transition: `border-color 0.25s ease, background-color 0.25s ease`,
                  }}
                  className={`w-full border border-border rounded-md hover:border-ring cursor-pointe ${
                    pathname.split("/")[1] === navigationItem.url.substring(1)
                      ? "bg-accent/30 border-ring text-accent-foreground"
                      : ""
                  }`}
                >
                  <Link
                    to={navigationItem.url}
                    className={"flex gap-3 items-center px-3 py-2"}
                  >
                    {navigationItem.icon && (
                      <navigationItem.icon className="size-4.5" />
                    )}
                    {t(`user.nav.${navigationItem.label}`)}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
