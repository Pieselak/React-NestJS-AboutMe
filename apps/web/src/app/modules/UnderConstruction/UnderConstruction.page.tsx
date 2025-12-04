import { HardHatIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export function UnderConstructionPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center self-center gap-2.5 md:flex-row">
      <HardHatIcon className="text-primary size-16 max-md:size-25" />
      <div className="border border-border max-md:w-full md:h-16"></div>
      <div>
        <h1 className="text-2xl font-bold text-primary max-md:text-center">
          {t("constructionPage.title")}
        </h1>
        <h2 className="text-foreground max-md:text-center">
          {t("constructionPage.message")}
        </h2>
      </div>
    </div>
  );
}
