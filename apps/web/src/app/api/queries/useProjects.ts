import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/app/api/client.ts";
import type { GetProjectResponse } from "@/app/api/generated-api.ts";

export const useProjectList = () => {
  useQuery({
    queryKey: ["projects"],
    queryFn: () => ApiClient.projects.projectsControllerGetProjects(),
    select: (response): GetProjectResponse => response.data,
  });
};

export const useProject = (projectUuid: string) => {
  useQuery({
    queryKey: ["projects", projectUuid],
    queryFn: () =>
      ApiClient.projects.projectsControllerGetProjectById(projectUuid),
    select: (response): GetProjectResponse => response.data,
  });
};
