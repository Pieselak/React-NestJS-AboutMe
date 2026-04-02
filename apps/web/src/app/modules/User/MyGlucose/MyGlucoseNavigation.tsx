import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LineChart, Target, BarChart3 } from "lucide-react";

export function MyGlucoseNavigation() {
  const { t } = useTranslation();
  const location = useLocation();
  const pathname = location.pathname;

  const navigationItems = [
    {
      label: "graph",
      url: "/glucose/graph",
      icon: LineChart,
    },
    {
      label: "timeInRange",
      url: "/glucose/time-in-range",
      icon: Target,
    },
    {
      label: "summary",
      url: "/glucose/summary",
      icon: BarChart3,
    },
  ];

  const isActive = (itemUrl: string) =>
    pathname.split("/")[2] === itemUrl.split("/")[2];

  return (
    <div className="flex justify-center gap-3 w-full max-w-md mx-auto">
      {navigationItems.map((navigationItem) => {
        const Icon = navigationItem.icon;
        const active = isActive(navigationItem.url);

        return (
          <Link
            key={navigationItem.url}
            to={navigationItem.url}
            className={`flex-1 flex flex-col items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-250 font-medium text-sm ${
              active
                ? "bg-accent/20 border-ring text-primary shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            <Icon size={20} />
            <span className="hidden sm:inline text-xs">
              {t(`user.myGlucosePage.navigation.${navigationItem.label}`)}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
