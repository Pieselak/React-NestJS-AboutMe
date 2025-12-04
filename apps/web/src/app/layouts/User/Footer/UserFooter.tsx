import { useTranslation } from "react-i18next";
import {
  CopyrightIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MonitorIcon,
  ServerCogIcon,
  UserIcon,
} from "lucide-react";
import { UserFooterItem } from "@/app/layouts/User/Footer/UserFooterItem.tsx";

export function UserFooter() {
  const { t } = useTranslation();

  return (
    <footer className="flex flex-wrap justify-between items-baseline w-full p-3 gap-3 bg-background border-t-2 border-border overflow-x-hidden">
      <div className="flex flex-col flex-1 justify-center items-center gap-2">
        <h1 className="text-primary font-bold">
          {t("user.footer.creator.title")}
        </h1>
        <UserFooterItem
          title={t("user.footer.creator.madeBy.title")}
          content={t("user.footer.creator.madeBy.content")}
          icon={UserIcon}
        />
        <UserFooterItem
          title={t("user.footer.creator.copyright.title")}
          content={t("user.footer.creator.copyright.content", {
            year: new Date().getFullYear(),
          })}
          icon={CopyrightIcon}
        />
      </div>

      <div className="flex flex-col flex-1 justify-center items-center gap-2">
        <h1 className="text-primary font-bold">
          {t("user.footer.contact.title")}
        </h1>
        <UserFooterItem
          title={t("user.footer.contact.email.title")}
          content="znamirowskipatryk@gmail.com"
          icon={MailIcon}
          url="mailto:znamirowskipatryk@gmail.com"
        />
      </div>

      <div className="flex flex-col flex-1 justify-center items-center gap-2">
        <h1 className="text-primary font-bold">
          {t("user.footer.links.title")}
        </h1>
        <UserFooterItem
          title="Github"
          content="/Pieselak"
          icon={GithubIcon}
          url="https://github.com/Pieselak"
        />
        <UserFooterItem
          title="Linkedin"
          content="/patryk-znamirowski"
          icon={LinkedinIcon}
          url="https://www.linkedin.com/in/patryk-znamirowski"
        />
      </div>

      <div className="flex flex-col flex-1 justify-center items-center gap-2">
        <h1 className="text-primary font-bold">
          {t("user.footer.technologies.title")}
        </h1>

        <UserFooterItem
          title="Frontend"
          content="Vite, React, TailwindCSS"
          icon={MonitorIcon}
        />

        <UserFooterItem title="Backend" content="NestJS" icon={ServerCogIcon} />
      </div>
    </footer>
  );
}
