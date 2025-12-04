import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { PL, GB, DE } from "country-flag-icons/react/1x1";
import { BadgeQuestionMarkIcon } from "lucide-react";

const resources = {
  en: {
    translation: {
      user: {
        nav: {
          home: "Home",
          aboutme: "About me",
          projects: "Projects",
          sugar: "Blood sugar",
        },
        footer: {
          creator: {
            title: "Creator",
            madeBy: {
              title: "Made with ❤️ by",
              content: "Patryk Znamirowski",
            },
            copyright: {
              title: "Copyright",
              content: "© {{year}} All rights reserved.",
            },
          },
          contact: {
            title: "Contact",
            email: {
              title: "Email",
            },
          },
          links: {
            title: "Links",
          },
          technologies: {
            title: "Technologies",
          },
        },
        languagePage: {
          title: "Select language",
        },
        myProjectsPage: {
          title: "List of my projects",
          description:
            "Here you will find a list of my personal and professional projects.",
          noProjects: "No projects available at the moment.",
          projectNotFound: "The project you are looking for does not exist.",
          sourceCodeAvailable: "View source code",
          sourceCodeNotAvailable: "Source code not available",
          sourceCodeClosed: "Closed source code",
          returnToProjects: "Return to projects",
          started: "Started on",
          completed: "Completed on",
          status: {
            completed: "Completed",
            inProgress: "Work in Progress",
            planned: "Planned",
          },
        },
      },
      loadingPage: {
        message: "Loading...",
      },
      notFoundPage: {
        title: "404 Not Found",
        message: "The page you are looking for does not exist.",
      },
      forbiddenPage: {
        title: "403 Forbidden",
        message: "You do not have permission to access this page.",
      },
      maintenancePage: {
        title: "Maintenance Mode",
        message:
          "The website is currently under maintenance. Please try again later.",
      },
      constructionPage: {
        title: "Under Construction",
        message: "This page is under construction. Please check back later.",
      },
    },
  },

  pl: {
    translation: {
      user: {
        nav: {
          home: "Strona główna",
          aboutme: "O mnie",
          projects: "Projekty",
          sugar: "Cukier we krwi",
        },
        footer: {
          creator: {
            title: "Twórca",
            madeBy: {
              title: "Stworzone z ❤️ przez",
              content: "Patryk Znamirowski",
            },
            copyright: {
              title: "Prawa autorskie",
              content: "© {{year}} Wszelkie prawa zastrzeżone.",
            },
          },
          contact: {
            title: "Kontakt",
            email: {
              title: "E-mail",
            },
          },
          links: {
            title: "Linki",
          },
          technologies: {
            title: "Technologie",
          },
        },
        languagePage: {
          title: "Wybierz język",
        },
        myProjectsPage: {
          title: "Lista moich projektów",
          description:
            "Tutaj znajdziesz listę moich projektów osobistych i zawodowych.",
          noProjects: "Obecnie brak dostępnych projektów.",
          projectNotFound: "Projekt, którego szukasz, nie istnieje.",
          sourceCodeAvailable: "Zobacz kod źródłowy",
          sourceCodeNotAvailable: "Kod źródłowy niedostępny",
          sourceCodeClosed: "Zamknięty kod źródłowy",
          returnToProjects: "Powrót do projektów",
          started: "Rozpoczęto",
          completed: "Zakończono",
          status: {
            completed: "Zakończony",
            inProgress: "W trakcie realizacji",
            planned: "Zaplanowany",
          },
        },
      },
      loadingPage: {
        message: "Ładowanie...",
      },
      notFoundPage: {
        title: "404 Nie znaleziono",
        message: "Strona, której szukasz, nie istnieje.",
      },
      forbiddenPage: {
        title: "403 Zabronione",
        message: "Nie masz uprawnień do dostępu do tej strony.",
      },
      maintenancePage: {
        title: "Tryb konserwacji",
        message:
          "Strona jest obecnie w trybie konserwacji. Proszę spróbować ponownie później.",
      },
      constructionPage: {
        title: "W budowie",
        message: "Ta strona jest w budowie. Proszę sprawdzić ponownie później.",
      },
    },
  },

  de: {
    translation: {
      user: {
        nav: {
          home: "Startseite",
          aboutme: "Über mich",
          projects: "Projekte",
          sugar: "Blutzucker",
        },
        footer: {
          creator: {
            title: "Ersteller",
            madeBy: {
              title: "Erstellt mit ❤️ von",
              content: "Patryk Znamirowski",
            },
            copyright: {
              title: "Urheberrecht",
              content: "© {{year}} Alle Rechte vorbehalten.",
            },
          },
          contact: {
            title: "Kontakt",
            email: {
              title: "E-Mail",
            },
          },
          links: {
            title: "Links",
          },
          technologies: {
            title: "Technologien",
          },
        },
        languagePage: {
          title: "Sprache auswählen",
        },
        myProjectsPage: {
          title: "Liste meiner Projekte",
          description:
            "Hier finden Sie eine Liste meiner persönlichen und beruflichen Projekte.",
          noProjects: "Derzeit sind keine Projekte verfügbar.",
          projectNotFound: "Das gesuchte Projekt existiert nicht.",
          sourceCodeAvailable: "Quellcode anzeigen",
          sourceCodeNotAvailable: "Quellcode nicht verfügbar",
          sourceCodeClosed: "Geschlossener Quellcode",
          returnToProjects: "Zurück zu den Projekten",
          started: "Gestartet am",
          completed: "Abgeschlossen am",
          status: {
            completed: "Abgeschlossen",
            inProgress: "In Arbeit",
            planned: "Geplant",
          },
        },
      },
      loadingPage: {
        message: "Wird geladen...",
      },
      notFoundPage: {
        title: "404 Nicht gefunden",
        message: "Die von Ihnen gesuchte Seite existiert nicht.",
      },
      forbiddenPage: {
        title: "403 Verboten",
        message: "Sie haben keine Berechtigung, auf diese Seite zuzugreifen.",
      },
      maintenancePage: {
        title: "Wartungsmodus",
        message:
          "Die Website befindet sich derzeit im Wartungsmodus. Bitte versuchen Sie es später erneut.",
      },
      constructionPage: {
        title: "Im Aufbau",
        message:
          "Diese Seite befindet sich im Aufbau. Bitte später erneut prüfen.",
      },
    },
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18next.on("languageChanged", (lng: string) => {
  localStorage.setItem("language", lng);
});

export default i18next;
export const getSavedLanguage = () => {
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage && resources.hasOwnProperty(savedLanguage)) {
    return savedLanguage;
  }
  return null;
};

export const getAvailableLanguages = () => {
  const languageConfig: Record<string, { name: string; flag: any }> = {
    pl: { name: "Polski", flag: PL },
    en: { name: "English", flag: GB },
    de: { name: "Deutsch", flag: DE },
  };

  return Object.keys(resources).map((lang) => ({
    code: lang,
    ...(languageConfig[lang] ?? { name: lang, flag: BadgeQuestionMarkIcon }),
  }));
};
