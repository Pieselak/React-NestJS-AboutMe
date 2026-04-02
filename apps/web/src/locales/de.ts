import { DE } from "country-flag-icons/react/1x1";

const de = {
  data: {
    name: "Deutsch",
    flag: DE,
  },
  translation: {
    user: {
      nav: {
        open: "Navigationsmenü öffnen",
        close: "Navigationsmenü schließen",
        language: "Sprache auswählen",
        theme: "Thema wechseln",
        pages: {
          home: "Startseite",
          aboutme: "Über mich",
          projects: "Projekte",
          glucose: "Blutzucker",
        },
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
        subtitle: "Wählen Sie die bevorzugte Sprache für diese Seite aus.",
        noLanguages: "Derzeit sind keine Sprachen verfügbar.",
      },
      aboutMePage: {
        title: "AboutMe",
      },
      myProjectsPage: {
        title: "Liste meiner Projekte",
        subtitle:
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
      myGlucosePage: {
        title: "Mein Blutglukosespiegel",
        subtitle:
          "Sehen Sie sich Blutglukosedaten von meinem CGM in Echtzeit an",
        navigation: {
          summary: "Zusammenfassung",
          timeInRange: "Zeit im Bereich",
          graph: "Diagramm",
        },
        nextSyncIn: "Nächste Synchronisierung in {{timer}} ({{time}})",
        glucoseHigh: "HI",
        glucoseLow: "LO",
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
} as const;

export default de;
