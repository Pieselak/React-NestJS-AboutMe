import { BarChart3, LineChart, Clock, type LucideIcon } from "lucide-react";
import type { ReactElement } from "react";
import { GlucoseGraph } from "@/app/modules/User/Glucose/GlucoseGraph.tsx";
import { GlucoseTimeInRange } from "@/app/modules/User/Glucose/GlucoseTimeInRange.tsx";
import { GlucoseSummary } from "@/app/modules/User/Glucose/GlucoseSummary.tsx";

export const navigationItems: Array<{
  label: string;
  param: string;
  icon: LucideIcon;
  element: ReactElement;
}> = [
  {
    label: "graph",
    param: "graph",
    icon: LineChart,
    element: <GlucoseGraph />,
  },
  {
    label: "timeInRange",
    param: "timeinrange",
    icon: Clock,
    element: <GlucoseTimeInRange />,
  },
  {
    label: "summary",
    param: "summary",
    icon: BarChart3,
    element: <GlucoseSummary />,
  },
];
