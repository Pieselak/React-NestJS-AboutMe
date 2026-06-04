import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Braces,
  DatabaseZap,
  FolderKanban,
  GraduationCap,
  HeartPulse,
  Layers3,
  UserRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";
import { PageShell } from "@/app/components/ui/PageShell.tsx";
import { StatusBadge } from "@/app/components/ui/StatusBadge.tsx";
import { Reveal } from "@/app/components/motion/Reveal.tsx";

const BIRTH_YEAR = 2009;

function getAgeFromYear(year: number) {
  return new Date().getFullYear() - year;
}

export function HomePage() {
  const { t } = useTranslation();
  const age = getAgeFromYear(BIRTH_YEAR);

  const navigationTiles = [
    {
      title: t("pages.user.aboutme.title"),
      description: t("pages.user.home.sections.aboutme.description"),
      href: "/about",
      Icon: UserRound,
    },
    {
      title: t("pages.user.projects.title"),
      description: t("pages.user.home.sections.projects.description"),
      href: "/projects",
      Icon: FolderKanban,
    },
    {
      title: t("pages.user.glucose.title"),
      description: t("pages.user.home.sections.glucose.description"),
      href: "/glucose",
      Icon: HeartPulse,
    },
  ];

  const technologies = [
    { name: "React", Icon: Braces },
    { name: "NestJS", Icon: DatabaseZap },
    { name: "TailwindCSS", Icon: Layers3 },
  ];

  return (
    <PageShell className="max-w-6xl">
      <Reveal>
        <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <BentoTile
            eyebrow={t("pages.user.home.hero.eyebrow", {
              defaultValue: "Portfolio",
            })}
            title={t("pages.user.home.hero.title", {
              defaultValue: "Patryk - uczeń i student full-stack developmentu",
            })}
            description={t("pages.user.home.hero.description", {
              defaultValue:
                "To portfolio łączy naukę programowania, projekty webowe i osobisty kontekst zdrowotny. Jest miejscem, w którym React spotyka NestJS, a dane są przedstawione spokojnie i czytelnie.",
            })}
            className="min-h-[22rem]"
          >
            <div className="mt-6 flex flex-wrap gap-2">
              <StatusBadge tone="gray">
                {t("pages.user.home.badges.student", {
                  defaultValue: "Uczeń / student",
                })}
              </StatusBadge>
              <StatusBadge tone="green">
                {t("pages.user.home.badges.fullstack", {
                  defaultValue: "Full-stack learner",
                })}
              </StatusBadge>
              <StatusBadge tone="yellow">
                {t("pages.user.home.badges.mody2", {
                  defaultValue: "MODY2",
                })}
              </StatusBadge>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-tile border border-border bg-surface-raised p-4">
                <p className="text-3xl font-black text-foreground">Patryk</p>
                <p className="mt-1 text-sm font-bold text-muted-foreground">
                  {t("pages.user.home.facts.author", {
                    defaultValue: "Autor portfolio",
                  })}
                </p>
              </div>
              <div className="rounded-tile border border-border bg-surface-raised p-4">
                <p className="text-3xl font-black text-foreground">{age}</p>
                <p className="mt-1 text-sm font-bold text-muted-foreground">
                  {t("pages.user.home.facts.age", {
                    defaultValue: "lat, liczone od 2009",
                  })}
                </p>
              </div>
              <div className="rounded-tile border border-border bg-surface-raised p-4">
                <p className="text-3xl font-black text-foreground">MODY2</p>
                <p className="mt-1 text-sm font-bold text-muted-foreground">
                  {t("pages.user.home.facts.diabetes", {
                    defaultValue: "typ cukrzycy",
                  })}
                </p>
              </div>
            </div>
          </BentoTile>

          <BentoTile
            eyebrow={t("pages.user.home.profile.eyebrow", {
              defaultValue: "Autor",
            })}
            title={t("pages.user.home.profile.title", {
              defaultValue: "Technologia, szkoła i konsekwencja",
            })}
          >
            <div className="space-y-5">
              <div className="flex size-16 items-center justify-center rounded-tile border border-border bg-surface-raised text-primary">
                <GraduationCap className="size-8" />
              </div>
              <p className="text-sm leading-7 text-muted-foreground">
                {t("pages.user.home.profile.description", {
                  defaultValue:
                    "Patryk rozwija portfolio jako uczeń/student zainteresowany aplikacjami full-stack. Strona pokazuje projekty, kierunek nauki oraz dane glukozy w formie transparentnego, technicznego eksperymentu.",
                })}
              </p>
            </div>
          </BentoTile>
        </section>
      </Reveal>

      <Reveal>
        <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <BentoTile
            eyebrow={t("pages.user.home.stack.eyebrow", {
              defaultValue: "Stack",
            })}
            title={t("pages.user.home.stack.title", {
              defaultValue: "Technologie w centrum portfolio",
            })}
            description={t("pages.user.home.stack.description", {
              defaultValue:
                "Frontend, backend i styling są traktowane jako jeden produktowy system, a nie osobne wyspy kodu.",
            })}
          >
            <div className="grid gap-3">
              {technologies.map(({ name, Icon }) => (
                <div
                  key={name}
                  className="flex items-center gap-3 rounded-tile border border-border bg-surface-raised p-4"
                >
                  <span className="flex size-10 items-center justify-center rounded-control border border-border bg-surface text-primary">
                    <Icon className="size-5" />
                  </span>
                  <p className="text-lg font-black text-foreground">{name}</p>
                </div>
              ))}
            </div>
          </BentoTile>

          <BentoTile
            eyebrow={t("pages.user.home.theme.eyebrow", {
              defaultValue: "Tematyka",
            })}
            title={t("pages.user.home.theme.title", {
              defaultValue: "Portfolio jako mapa nauki",
            })}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-tile border border-border bg-surface-raised p-4">
                <Activity className="mb-4 size-6 text-primary" />
                <h3 className="font-black text-foreground">
                  {t("pages.user.home.theme.learning.title", {
                    defaultValue: "Nauka przez projekty",
                  })}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {t("pages.user.home.theme.learning.description", {
                    defaultValue:
                      "Strona prezentuje praktyczną naukę budowania interfejsów, API i modułów danych.",
                  })}
                </p>
              </div>
              <div className="rounded-tile border border-border bg-surface-raised p-4">
                <HeartPulse className="mb-4 size-6 text-primary" />
                <h3 className="font-black text-foreground">
                  {t("pages.user.home.theme.health.title", {
                    defaultValue: "Dane zdrowotne bez sensacji",
                  })}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {t("pages.user.home.theme.health.description", {
                    defaultValue:
                      "Cukrzyca MODY2 jest tu pokazana przez spokojną wizualizację danych, a nie jako ozdobnik.",
                  })}
                </p>
              </div>
            </div>
          </BentoTile>
        </section>
      </Reveal>

      <Reveal>
        <section className="grid gap-4 md:grid-cols-3">
          {navigationTiles.map(({ title, description, href, Icon }) => (
            <Link
              key={href}
              to={href}
              className="group rounded-tile border border-border bg-surface p-4 transition-[border-color,background-color] duration-200 hover:border-ring hover:bg-surface-raised md:p-5"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="flex size-11 items-center justify-center rounded-control border border-border bg-surface-raised text-primary">
                  <Icon className="size-5" />
                </span>
                <ArrowRight className="size-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <h2 className="text-lg font-black text-foreground">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </Link>
          ))}
        </section>
      </Reveal>
    </PageShell>
  );
}
