import type { Project } from "@/app/modules/User/MyProjects/MyProjects.page.tsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowBigLeftDashIcon,
  Link2Icon,
  Link2OffIcon,
  Unlink2Icon,
} from "lucide-react";
import { motion } from "framer-motion";

type MyProjectsDetailsProps = {
  project: Project;
};

export function MyProjectsDetails({ project }: MyProjectsDetailsProps) {
  const { t } = useTranslation();

  const statusElements = {
    completed: "bg-green-bg border-green-border text-green-text",
    inProgress: "bg-yellow-bg border-yellow-border text-yellow-text",
    planned: "bg-blue-bg border-blue-border text-blue-text",
  };
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-3">
      <div className="flex w-full md:max-w-1/3 flex-col gap-2">
        <img
          src={project.image}
          className="w-full max-h-64 object-cover rounded-md aspect-square"
          alt={project.title}
        />
        <div className="flex flex-wrap max-sm:flex-col gap-2">
          <motion.button
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/projects"
              className="flex flex-1 justify-center items-center gap-2 px-3 py-1.5 rounded-md bg-accent text-center text-accent-foreground text-wrap sm:text-nowrap font-medium hover:bg-accent/25 border-2 border-border hover:border-ring transition-[background-color, border-color] duration-250"
            >
              <ArrowBigLeftDashIcon className="size-5" />
              {t("user.myProjectsPage.returnToProjects")}
            </Link>
          </motion.button>
          {project.sourceCodeOpen ? (
            project.sourceCodeUrl ? (
              <motion.button
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={project.sourceCodeUrl}
                  className="flex justify-center items-center gap-2 px-3 py-1.5 rounded-md bg-accent text-center text-accent-foreground text-wrap sm:text-nowrap font-medium hover:bg-accent/25 border-2 border-border hover:border-ring transition-[background-color, border-color] duration-250"
                  target="_blank"
                >
                  <Link2Icon className="size-5" />
                  {t("user.myProjectsPage.sourceCodeAvailable")}
                </Link>
              </motion.button>
            ) : (
              <span className="flex justify-center items-center gap-2 w-full px-3 py-1.5 rounded-md bg-gray-bg border-2 border-gray-border text-gray-text">
                <Unlink2Icon className="size-5" />
                {t("user.myProjectsPage.sourceCodeNotAvailable")}
              </span>
            )
          ) : (
            <span className="flex justify-center items-center gap-2 w-full px-3 py-1.5 rounded-md bg-gray-bg border-2 border-gray-border text-gray-text">
              <Link2OffIcon className="size-5" />
              {t("user.myProjectsPage.sourceCodeClosed")}
            </span>
          )}
        </div>
        <div className="w-full border border-border rounded-full" />
        <div className="flex flex-wrap justify-start items-start gap-2">
          <span
            className={`px-2 py-1 rounded-xl text-sm font-medium border ${statusElements[project.status]}`}
          >
            {t(`user.myProjectsPage.status.${project.status}`)}
          </span>
          {project.startDate && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-xl text-sm font-medium border border-ring">
              {`${t("user.myProjectsPage.started")} ${project.startDate}`}
            </span>
          )}
          {project.completeDate && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-xl text-sm font-medium border border-ring">
              {`${t("user.myProjectsPage.completed")} ${project.completeDate}`}
            </span>
          )}
        </div>
        {project.developers && project.developers.length > 0 && (
          <>
            <div className="w-full border border-border rounded-full" />
            <div className="flex flex-wrap justify-start items-start gap-2">
              {project.developers.map((dev) => (
                <span
                  key={dev.name}
                  className="bg-accent text-accent-foreground px-2 py-1 rounded-xl text-sm font-medium border border-ring"
                >
                  {dev.name} - {dev.role}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col w-full md:max-w-2/3 gap-3">
        <div className="w-full border border-border rounded-full md:hidden" />
        {project.tags && (
          <div className="flex flex-wrap justify-start items-start gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-accent text-accent-foreground px-2 py-1 rounded-xl text-sm font-medium border border-ring"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-3xl/8 font-bold text-primary">{project.title}</h1>
        <p className="text-foreground">{project.description}</p>
      </div>
    </div>
  );
}
