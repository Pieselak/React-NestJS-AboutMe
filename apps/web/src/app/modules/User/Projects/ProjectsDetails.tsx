import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Lock,
} from "lucide-react";
import { Reveal } from "@/app/components/motion/Reveal.tsx";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";
import { Button } from "@/app/components/ui/Button.tsx";
import { PageShell } from "@/app/components/ui/PageShell.tsx";
import { StatusBadge } from "@/app/components/ui/StatusBadge.tsx";
import type { Tone } from "@/app/components/ui/tone.ts";
import { NotFoundPage } from "@/app/modules/Common/NotFound/NotFound.page.tsx";
import {
  type Project,
  projects,
} from "@/app/modules/User/Projects/Projects.enums.ts";

const statusTone = {
  completed: "green",
  inProgress: "yellow",
  planned: "gray",
} satisfies Record<Project["status"], Tone>;

export function MyProjectsDetailsPage() {
  const params = useParams();
  const { t } = useTranslation();

  const projectId = params.projectId ? parseInt(params.projectId) : null;
  const project = projects.find((item: Project) => item.id === projectId);

  if (!project) {
    return <NotFoundPage message={t("pages.user.projects.projectNotFound")} />;
  }

  return (
    <PageShell>
      <Reveal>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-control border border-border bg-surface px-3 py-2 text-sm font-bold text-muted-foreground transition-[border-color,color,background-color] duration-200 hover:border-ring hover:bg-surface-raised hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {t("pages.user.projects.returnToProjects")}
        </Link>
      </Reveal>

      <Reveal>
        <BentoTile
          eyebrow={t("pages.user.projects.details.project")}
          title={project.title}
          action={
            <StatusBadge tone={statusTone[project.status]}>
              {t(`pages.user.projects.statuses.${project.status}`)}
            </StatusBadge>
          }
        >
          <div className="mt-4 flex flex-wrap gap-2">
            {(project.tags ?? []).map((tag) => (
              <span
                key={tag}
                className="rounded-control border border-border bg-surface-inset px-2.5 py-1 text-xs font-bold text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </BentoTile>
      </Reveal>

      <Reveal>
        <section className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <BentoTile
            eyebrow={t("pages.user.projects.details.description")}
            title={t("pages.user.projects.details.whatItDoes")}
          >
            <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
              {project.description}
            </p>
          </BentoTile>

          <div className="grid gap-4">
            <div className="overflow-hidden rounded-tile border border-border bg-surface-inset">
              <img
                src={project.image}
                className="h-64 w-full object-cover grayscale md:h-80"
                alt={project.title}
              />
            </div>

            <BentoTile
              eyebrow={t("pages.user.projects.details.meta")}
              title={t("pages.user.projects.details.timeline")}
            >
              <div className="space-y-3">
                {project.startDate && (
                  <div className="rounded-tile border border-border bg-surface-raised p-4">
                    <p className="flex items-center gap-2 text-sm font-black text-muted-foreground">
                      <Calendar className="size-4" />
                      {t("pages.user.projects.startedAt")}
                    </p>
                    <p className="mt-2 font-black text-foreground">
                      {project.startDate}
                    </p>
                  </div>
                )}

                {project.completeDate && (
                  <div className="rounded-tile border border-border bg-surface-raised p-4">
                    <p className="flex items-center gap-2 text-sm font-black text-muted-foreground">
                      <Calendar className="size-4" />
                      {t("pages.user.projects.completedAt")}
                    </p>
                    <p className="mt-2 font-black text-foreground">
                      {project.completeDate}
                    </p>
                  </div>
                )}

                {project.sourceCodeOpen && project.sourceCodeUrl ? (
                  <a
                    href={project.sourceCodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full" variant="primary">
                      <ExternalLink className="size-4" />
                      {t("pages.user.projects.sourceCode.openAction")}
                    </Button>
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 rounded-control border border-border bg-surface-inset px-4 py-3 text-sm font-black text-muted-foreground">
                    <Lock className="size-4" />
                    {project.sourceCodeOpen
                      ? t("pages.user.projects.sourceCode.notAvailable")
                      : t("pages.user.projects.sourceCode.stateClosed")}
                  </div>
                )}
              </div>
            </BentoTile>

            <BentoTile
              eyebrow={t("pages.user.projects.details.team")}
              title={t("pages.user.projects.details.contributors")}
            >
              {project.developers && project.developers.length > 0 ? (
                <div className="grid gap-3">
                  {project.developers.map((developer) => (
                    <div
                      key={developer.name}
                      className="rounded-tile border border-border bg-surface-raised p-4"
                    >
                      <p className="font-black text-foreground">
                        {developer.name}
                      </p>
                      <p className="mt-1 text-sm font-bold text-muted-foreground">
                        {developer.role}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm font-bold text-muted-foreground">
                  {t("pages.user.projects.details.noContributors")}
                </p>
              )}
            </BentoTile>
          </div>
        </section>
      </Reveal>
    </PageShell>
  );
}
