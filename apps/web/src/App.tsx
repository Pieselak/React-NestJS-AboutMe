import "@/i18n";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { HomePage } from "@/app/modules/User/Home/Home.page.tsx";
// import { AboutMePage } from "@/app/modules/User/AboutMe/AboutMe.page.tsx";
import { MyProjectsPage } from "@/app/modules/User/MyProjects/MyProjects.page.tsx";
import { MyGlucosePage } from "@/app/modules/User/MyGlucose/MyGlucose.page.tsx";
import { SelectLanguagePage } from "@/app/modules/User/SelectLanguage/SelectLanguage.page.tsx";

import { LoadingPage } from "@/app/modules/Loading/Loading.page.tsx";
import { NotFoundPage } from "@/app/modules/NotFound/NotFound.page.tsx";
import { ForbiddenPage } from "@/app/modules/Forbidden/Forbidden.page.tsx";
import { MaintenancePage } from "@/app/modules/Maintenance/Maintenance.page.tsx";
import { UnderConstructionPage } from "@/app/modules/UnderConstruction/UnderConstruction.page.tsx";

import { UserLayout } from "@/app/layouts/User/User.layout.tsx";
import { Suspense, useEffect } from "react";

import i18n, { getSavedLanguage } from "@/i18n.ts";

function App() {
  const navigate = useNavigate();
  const savedLanguage = getSavedLanguage();

  useEffect(() => {
    !savedLanguage &&
      navigate("/language?first-time=true", { state: { firstTime: true } });
    i18n.changeLanguage(savedLanguage || "en");
  }, []);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="m" element={<MaintenancePage />} />
          <Route path="f" element={<ForbiddenPage />} />
          <Route path="l" element={<LoadingPage />} />
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<HomePage />} />
          <Route
            path="aboutme"
            element={<UnderConstructionPage /> /*<AboutMePage />*/}
          />
          <Route path="projects/:projectId?" element={<MyProjectsPage />} />
          <Route path="sugar" element={<MyGlucosePage />} />
          <Route path="language" element={<SelectLanguagePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
