import { PL } from "country-flag-icons/react/1x1";

const pl = {
  data: {
    name: "Polski",
    flag: PL,
  },
  translation: {
    user: {
      nav: {
        open: "Otwórz menu nawigacyjne",
        close: "Zamknij menu nawigacyjne",
        language: "Wybierz język",
        theme: "Zmień motyw",
        pages: {
          home: "Strona główna",
          aboutme: "O mnie",
          projects: "Projekty",
          glucose: "Cukier we krwi",
        },
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
        subtitle: "Wybierz preferowany język dla tej strony.",
        noLanguages: "Obecnie brak dostępnych języków.",
      },
      myProjectsPage: {
        title: "Lista moich projektów",
        subtitle:
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
          completed: "Ukończony",
          inProgress: "W trakcie realizacji",
          planned: "Zaplanowany",
        },
      },
      myGlucosePage: {
        title: "Moja glukoza we krwi",
        subtitle:
          "Przeglądaj dane dotyczące glukozy we krwi z mojego CGM w czasie rzeczywistym",
        navigation: {
          summary: "Podsumowanie",
          timeInRange: "Czas w zakresie",
          graph: "Wykres",
        },
        nextSyncIn: "Następna synchronizacja za {{timer}} ({{time}})",
        glucoseHigh: "HI",
        glucoseLow: "LO",
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
} as const;

export default pl;
