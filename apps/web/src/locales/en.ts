import { GB } from "country-flag-icons/react/1x1";

const en = {
  data: {
    name: "English",
    flag: GB,
  },
  translation: {
    user: {
      nav: {
        open: "Open navigation menu",
        close: "Close navigation menu",
        language: "Select language",
        theme: "Change theme",
        pages: {
          home: "Home",
          aboutme: "About me",
          projects: "Projects",
          glucose: "Blood sugar",
        },
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
        subtitle: "Select the preferred language for this website.",
        noLanguages: "No languages available at the moment.",
      },
      myProjectsPage: {
        title: "List of my projects",
        subtitle:
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
      myGlucosePage: {
        title: "My blood glucose",
        subtitle: "View blood glucose data from my CGM in real-time",
        navigation: {
          summary: "Summary",
          timeInRange: "Time in range",
          graph: "Graph",
        },
        nextSyncIn: "Next sync in {{timer}} ({{time}})",
        glucoseHigh: "HI",
        glucoseLow: "LO",
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
} as const;

export default en;
