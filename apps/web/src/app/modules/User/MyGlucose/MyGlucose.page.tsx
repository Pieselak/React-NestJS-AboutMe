import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { MyGlucoseCurrent } from "@/app/modules/User/MyGlucose/MyGlucoseCurrent.tsx";
import { MyGlucoseSummary } from "@/app/modules/User/MyGlucose/MyGlucoseSummary.tsx";
import { MyGlucoseTimeInRange } from "@/app/modules/User/MyGlucose/MyGlucoseTimeInRange.tsx";
import { MyGlucoseGraph } from "@/app/modules/User/MyGlucose/MyGlucoseGraph.tsx";
import { MyGlucoseNavigation } from "@/app/modules/User/MyGlucose/MyGlucoseNavigation.tsx";

export function MyGlucosePage() {
  const { t } = useTranslation();
  const section = useParams().section;
  const renderSection = () => {
    switch (section) {
      case "summary":
        return <MyGlucoseSummary />;
      case "time-in-range":
        return <MyGlucoseTimeInRange />;
      case "graph":
        return <MyGlucoseGraph />;
    }
  };

  return (
    <div className="flex flex-col justify-start items-center">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {t("user.myGlucosePage.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("user.myGlucosePage.subtitle")}
          </p>
        </div>

        <MyGlucoseCurrent />

        <MyGlucoseNavigation />

        {/* Content Section */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
