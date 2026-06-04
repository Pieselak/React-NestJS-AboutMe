import { useState } from "react";
import {
  Activity,
  Braces,
  DatabaseZap,
  GraduationCap,
  HeartPulse,
  Layers3,
  Route,
  UserRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/app/components/motion/Reveal.tsx";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";
import { MetricTile } from "@/app/components/ui/MetricTile.tsx";
import { PageShell } from "@/app/components/ui/PageShell.tsx";
import { SegmentedControl } from "@/app/components/ui/SegmentedControl.tsx";
import { StatusBadge } from "@/app/components/ui/StatusBadge.tsx";
import { UserHeader } from "@/app/layouts/User/Header/UserHeader.tsx";

const BIRTH_YEAR = 2009;

type AboutSection = "profile" | "stack" | "path";

function getAgeFromYear(year: number) {
  return new Date().getFullYear() - year;
}

export function AboutMePage() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<AboutSection>("profile");
  const age = getAgeFromYear(BIRTH_YEAR);

  return (
    <PageShell>
      <UserHeader
        title={t("pages.user.aboutme.title")}
        subtitle={t("pages.user.aboutme.subtitle")}
      />

      <Reveal>
        <section className="grid gap-4 lg:grid-cols-[minmax(280px,0.8fr)_1.2fr]">
          <BentoTile
            eyebrow={t("pages.user.aboutme.profile.eyebrow")}
            title="Patryk"
            description={t("pages.user.aboutme.profile.description")}
            action={<UserRound className="size-5 text-primary" />}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-tile border border-border bg-surface-raised p-4">
                <p className="text-sm font-bold text-muted-foreground">
                  {t("pages.user.aboutme.metrics.age")}
                </p>
                <p className="mt-2 text-3xl font-black text-foreground">
                  {age}
                </p>
              </div>
              <div className="rounded-tile border border-border bg-surface-raised p-4">
                <p className="text-sm font-bold text-muted-foreground">
                  {t("pages.user.aboutme.metrics.diabetes")}
                </p>
                <p className="mt-2 text-3xl font-black text-foreground">
                  MODY2
                </p>
              </div>
            </div>
          </BentoTile>

          <BentoTile
            eyebrow={t("pages.user.aboutme.status.eyebrow")}
            title={t("pages.user.aboutme.status.title")}
            description={t("pages.user.aboutme.status.description")}
            action={
              <StatusBadge tone="yellow">
                {t("pages.user.aboutme.status.inProgress")}
              </StatusBadge>
            }
          >
            <div className="grid gap-4 md:grid-cols-3">
              <MetricTile
                label={t("pages.user.aboutme.badges.student")}
                value="2009"
                unit={t("pages.user.aboutme.metrics.birthYear")}
                tone="gray"
                icon={GraduationCap}
              />
              <MetricTile
                label={t("pages.user.aboutme.metrics.frontend")}
                value="React"
                tone="green"
                icon={Braces}
              />
              <MetricTile
                label={t("pages.user.aboutme.metrics.backend")}
                value="NestJS"
                tone="green"
                icon={DatabaseZap}
              />
            </div>
          </BentoTile>
        </section>
      </Reveal>

      <div className="sticky top-3 z-20 flex w-full justify-start">
        <SegmentedControl<AboutSection>
          ariaLabel={t("pages.user.aboutme.navigationLabel")}
          value={activeSection}
          onChange={setActiveSection}
          mobileLayout="stack"
          className="w-full backdrop-blur-xl sm:w-auto"
          options={[
            {
              value: "profile",
              label: t("pages.user.aboutme.sections.profile"),
              icon: <UserRound className="size-4" />,
            },
            {
              value: "stack",
              label: t("pages.user.aboutme.sections.stack"),
              icon: <Layers3 className="size-4" />,
            },
            {
              value: "path",
              label: t("pages.user.aboutme.sections.path"),
              icon: <Route className="size-4" />,
            },
          ]}
        />
      </div>

      <Reveal key={activeSection}>
        {activeSection === "profile" && (
          <BentoTile
            eyebrow={t("pages.user.aboutme.profile.eyebrow")}
            title={t("pages.user.aboutme.profile.title")}
            description={t("pages.user.aboutme.profile.longDescription")}
          >
            <div className="grid gap-4 md:grid-cols-3">
              <StatusBadge tone="gray">
                {t("pages.user.aboutme.badges.student")}
              </StatusBadge>
              <StatusBadge tone="yellow">MODY2</StatusBadge>
              <StatusBadge tone="green">Portfolio</StatusBadge>
            </div>
          </BentoTile>
        )}

        {activeSection === "stack" && (
          <section className="grid gap-4 md:grid-cols-3">
            {[
              {
                name: "React",
                description: t("pages.user.aboutme.stackItems.react"),
                Icon: Braces,
              },
              {
                name: "NestJS",
                description: t("pages.user.aboutme.stackItems.nest"),
                Icon: DatabaseZap,
              },
              {
                name: "TailwindCSS",
                description: t("pages.user.aboutme.stackItems.tailwind"),
                Icon: Layers3,
              },
            ].map(({ name, description, Icon }) => (
              <BentoTile key={name}>
                <Icon className="mb-5 size-7 text-primary" />
                <h2 className="text-lg font-black text-foreground">{name}</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {description}
                </p>
              </BentoTile>
            ))}
          </section>
        )}

        {activeSection === "path" && (
          <BentoTile
            eyebrow={t("pages.user.aboutme.timeline.eyebrow")}
            title={t("pages.user.aboutme.timeline.title")}
          >
            <div className="grid gap-3">
              {[
                {
                  label: t("pages.user.aboutme.pathItems.now.label"),
                  title: t("pages.user.aboutme.pathItems.now.title"),
                  description: t("pages.user.aboutme.pathItems.now.description"),
                  Icon: GraduationCap,
                },
                {
                  label: t("pages.user.aboutme.pathItems.data.label"),
                  title: t("pages.user.aboutme.pathItems.data.title"),
                  description: t("pages.user.aboutme.pathItems.data.description"),
                  Icon: HeartPulse,
                },
                {
                  label: t("pages.user.aboutme.pathItems.next.label"),
                  title: t("pages.user.aboutme.pathItems.next.title"),
                  description: t("pages.user.aboutme.pathItems.next.description"),
                  Icon: Activity,
                },
              ].map(({ label, title, description, Icon }) => (
                <article
                  key={label}
                  className="grid gap-3 rounded-tile border border-border bg-surface-raised p-4 sm:grid-cols-[7rem_1fr]"
                >
                  <div className="flex items-center gap-2 text-sm font-black text-primary">
                    <Icon className="size-4" />
                    {label}
                  </div>
                  <div>
                    <h3 className="font-black text-foreground">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </BentoTile>
        )}
      </Reveal>
    </PageShell>
  );
}
