import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/app/api/client.ts";

export const useServiceStatus = () => {
  return useQuery({
    queryKey: ["serviceStatus"],
    queryFn: () => ApiClient.status.statusControllerGetStatus(),
    select: (response) => ({
      status: response.data.status,
      uptime: response.data.uptime,
      timestamp: response.data.timestamp,
    }),
  });
};
