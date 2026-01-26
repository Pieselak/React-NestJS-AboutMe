import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  type Project,
  projects,
} from "@/app/modules/User/MyProjects/MyProjects.enums.ts";

export function MyProjectsListPage() {
  const { t } = useTranslation();

  const projectsVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };
  const statusElements = {
    completed: "bg-green-bg border-green-border text-green-text",
    inProgress: "bg-yellow-bg border-yellow-border text-yellow-text",
    planned: "bg-blue-bg border-blue-border text-blue-text",
  };

  return (
    <div className="flex flex-col gap-2.5 justify-start items-center p-3 bg-card border-2 border-border rounded-xl md:flex-nowrap">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-primary text-center">
          {t("user.myProjectsPage.title")}
        </h1>
        <h2 className="text-card-foreground text-center">
          {t("user.myProjectsPage.description")}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-7xl">
        {projects.length > 0 ? (
          projects.map((project: Project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              variants={projectsVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                transition: `border-color 0.25s ease, box-shadow 0.25s ease`,
              }}
              className="flex bg-muted/50 border-2 border-border hover:border-ring rounded-md overflow-hidden cursor-pointer"
            >
              <Link
                to={`/projects/${project.id}`}
                className="flex flex-col flex-1 justify-start"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    className="w-full h-48 object-cover"
                    alt={project.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-muted via-transparent to-transparent opacity-50"></div>
                </div>
                <div className="flex flex-1 flex-col gap-1.5 p-2.5">
                  <h3 className="text-lg/5 font-bold text-primary ">
                    {project.title.length > 50
                      ? `${project.title.substring(0, 50)}...`
                      : project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm flex-1">
                    {project.description.length > 140
                      ? `${project.description.substring(0, 140)}...`
                      : project.description}
                  </p>
                  <div className="flex flex-wrap justify-start items-start gap-1.5">
                    <span
                      className={`px-2 py-1 rounded-xl text-sm font-medium border ${statusElements[project.status]}`}
                    >
                      {t(`user.myProjectsPage.status.${project.status}`)}
                    </span>
                    {project.tags &&
                      project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-accent text-accent-foreground px-2 py-1 rounded-xl text-sm font-medium border border-ring"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="bg-gray-bg border-2 border-gray-border text-gray-text px-2 py-1 rounded-md">
            {t("user.myProjectsPage.noProjects")}
          </p>
        )}
      </div>
    </div>
  );
}
