import { useLocation, useNavigate } from "react-router-dom";
import i18n, { getAvailableLanguages } from "@/i18n.ts";
import { useTranslation } from "react-i18next";

export function SelectLanguagePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const isFirstTime = location.state?.firstTime ?? false;
  const languages = getAvailableLanguages();
  const currentLanguage = i18n.language;

  return (
    <div className="flex flex-col justify-center items-center p-3 gap-3 bg-card border-2 rounded-xl border-border">
      <h1 className="text-xl">{t("user.languagePage.title")}</h1>
      <div className="flex flex-wrap justify-center items-center gap-2.5">
        {languages.map((lang) => (
          <div
            key={lang.code}
            className={`flex justify-center items-center gap-2 p-2 border-2 border-border rounded-xl hover:border-ring cursor-pointer max-sm:flex-1 transition-[border-color, background-color] duration-250 ${currentLanguage === lang.code ? "bg-accent/30 border-ring text-accent-foreground" : ""}`}
            onClick={() => {
              i18n.changeLanguage(lang.code);
              if (isFirstTime) {
                navigate("/");
              }
            }}
          >
            <div className="size-8">
              <lang.flag className="size-8 rounded-full bg-secondary p-0.5" />
            </div>
            <span>{lang.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
