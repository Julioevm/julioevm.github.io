export type WelcomeHighlight = {
  title: string;
  description: string;
  route: string;
};

export type WelcomeContent = {
  title: string;
  paragraphs: string[];
  highlights: WelcomeHighlight[];
};

export const welcomeContent: WelcomeContent = {
  title: "Welcome",
  paragraphs: [
    "This portfolio is built as a small desktop: documents open in windows, projects behave like files inside folders, and the layout remembers where you left it.",
    "It is a personal space for technical leadership notes, product UI work, experiments, and a few interactive pieces that are more fun to explore than read about."
  ],
  highlights: [
    {
      title: "Projects folder",
      description: "Selected work and interface experiments, presented as files you can open and move around.",
      route: "/projects"
    },
    {
      title: "Technical notes",
      description: "Short writing on frontend systems, interface decisions, and local-first portfolio architecture.",
      route: "/blog"
    },
    {
      title: "Playable windows",
      description: "Browser games embedded directly into the desktop, including a 3D NetHack experiment and Zip.",
      route: "/games/nethack-3d"
    },
    {
      title: "About Julio",
      description: "A quick profile covering technical leadership, delivery, software quality, and product UI focus.",
      route: "/about"
    }
  ]
};
