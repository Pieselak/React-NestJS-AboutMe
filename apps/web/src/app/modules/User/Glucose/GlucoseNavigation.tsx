import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { navigationItems } from "@/app/modules/User/Glucose/GlucoseNavigation.items.tsx";

export function GlucoseNavigation() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeSection = searchParams.get("section") ?? navigationItems[0].param;

  return (
    <nav className="mx-auto flex w-full max-w-sm rounded-xl border border-border bg-card p-1.5 shadow-sm sm:w-fit sm:max-w-none">
      <div className="flex w-full flex-col gap-1 sm:w-auto sm:flex-row">
        {navigationItems.map((item) => {
          const isActive = activeSection === item.param;
          const Icon = item.icon;

          return (
            <button
              key={item.param}
              type="button"
              onClick={() => {
                const nextParams = new URLSearchParams(searchParams);
                nextParams.set("section", item.param);
                setSearchParams(nextParams);
              }}
              className={`flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium cursor-pointer transition-[border-color,background-color,color] duration-250 sm:w-auto ${
                isActive
                  ? "border-ring bg-muted text-accent-foreground"
                  : "border-transparent text-muted-foreground hover:border-ring hover:text-primary"
              }`}
            >
              <Icon className="size-4.5 shrink-0" />
              <span>
                {t(`pages.user.glucose.subpages.${item.label}.navigation`)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
