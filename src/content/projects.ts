export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  body: string;
};

export const projects: Project[] = [
  {
    slug: "weeklio",
    title: "Weeklio",
    summary: "A full-featured meal planning product for households, weekly menus, saved meals, and AI recipe generation.",
    tags: ["React Native", "Firebase", "AI", "Mobile"],
    featured: true,
    liveUrl: "https://getweeklio.com/",
    body: "Weeklio is a cross-platform meal planning app for Android and iOS. It helps households plan meal schedules, save favorite meals, coordinate up to three people, and use AI to generate menus and recipes when they need inspiration."
  },
  {
    slug: "resume-flows",
    title: "Resume Flows",
    summary: "An AI SaaS product that tailors resumes and cover letters to job descriptions in seconds.",
    tags: ["SaaS", "AI", "Resume Tools", "Product"],
    featured: true,
    liveUrl: "https://www.resumeflows.com/",
    body: "Resume Flows helps job seekers turn an existing resume into a role-specific application package. The product imports resume content, analyzes job descriptions, and generates tailored resumes and cover letters designed to improve alignment with the target role."
  },
  {
    slug: "os-portfolio",
    title: "OS Portfolio",
    summary: "A portfolio presented as a modern desktop environment with movable document windows.",
    tags: ["React", "Vite", "SCSS", "Zustand"],
    githubUrl: "https://github.com/Julioevm/julioevm.github.io",
    liveUrl: "https://julioevm.github.io/",
    body: "A spatial portfolio interface with Markdown documents, project windows, persisted layout state, and shareable deep links. The app is built with React and Vite, uses Zustand for desktop/window state, and keeps routes synchronized so each document can be opened directly while still feeling like part of the same desktop."
  },
  {
    slug: "rts",
    title: "RTS Engine",
    summary: "A C++ real-time strategy game engine.",
    tags: ["C++", "Game Engine", "RTS"],
    githubUrl: "https://github.com/Julioevm/RTS",
    body: "RTS is an engine project focused on the foundations of real-time strategy gameplay: simulation structure, game-loop architecture, and the technical pieces needed to build an RTS experience in C++."
  },
  {
    slug: "xenos",
    title: "Xenos",
    summary: "A turn-based strategy game built in C++.",
    tags: ["C++", "Strategy", "Game"],
    githubUrl: "https://github.com/Julioevm/xenos",
    body: "Xenos explores turn-based tactical game systems in C++, with an emphasis on strategy mechanics, game state, and a structure that can grow into a larger tactics experience."
  },
  {
    slug: "tiny-scraper",
    title: "Tiny Scraper",
    summary: "A retro game scraper for Anbernic RGXX-style handheld systems.",
    tags: ["Python", "CLI", "Retro Gaming"],
    githubUrl: "https://github.com/Julioevm/tiny-scraper",
    body: "Tiny Scraper is a small Python utility for scraping retro game metadata and assets, designed around lightweight workflows for Anbernic RGXX-based handheld systems."
  },
  {
    slug: "coten",
    title: "Castle of the Eternal Night",
    summary: "A Python roguelike built with libtcod.",
    tags: ["Python", "Roguelike", "libtcod"],
    githubUrl: "https://github.com/Julioevm/coten",
    body: "Castle of the Eternal Night is a roguelike experiment built with Python and libtcod, focused on dungeon exploration, procedural game structure, and classic terminal-style RPG systems."
  },
  {
    slug: "zip",
    title: "Zip",
    summary: "A deployed puzzle game built with TypeScript.",
    tags: ["TypeScript", "Puzzle", "Game"],
    githubUrl: "https://github.com/Julioevm/zip",
    liveUrl: "https://playzip.netlify.app/",
    body: "Zip is a small puzzle game with a polished browser deployment. It focuses on approachable play, quick iteration, and packaging a compact game idea into a complete web experience."
  },
  {
    slug: "enroth-archive",
    title: "Enroth Archive",
    summary: "An open source reference site for Might & Magic VI.",
    tags: ["TypeScript", "Content", "Open Source"],
    githubUrl: "https://github.com/Julioevm/enroth-archive",
    liveUrl: "https://enrotharchives.com/",
    body: "Enroth Archive is a public knowledge base for Might & Magic VI. It organizes game information into an accessible web experience for players who want a dedicated open source reference."
  },
  {
    slug: "scrum-poker",
    title: "Scrum Poker",
    summary: "An online planning poker app with real-time sessions.",
    tags: ["Preact", "Express", "Socket.IO"],
    githubUrl: "https://github.com/Julioevm/scrum-poker",
    liveUrl: "https://scrum-poker-nine.vercel.app/",
    body: "Scrum Poker is a full-stack planning poker app built with Preact, Express, and Socket.IO. It supports real-time estimation sessions for teams that need a lightweight shared planning tool."
  },
  {
    slug: "gemini-review",
    title: "Gemini Review",
    summary: "A TypeScript project for AI-assisted review workflows.",
    tags: ["TypeScript", "AI", "Developer Tools"],
    githubUrl: "https://github.com/Julioevm/gemini-review",
    body: "Gemini Review experiments with AI-assisted code review workflows, packaging review automation ideas into a TypeScript developer-tooling project."
  },
  {
    slug: "crawler",
    title: "Crawler",
    summary: "A Python web crawling project.",
    tags: ["Python", "Automation", "Crawler"],
    githubUrl: "https://github.com/Julioevm/crawler",
    body: "Crawler is a Python automation project for gathering and processing web content, useful as a base for scraping, indexing, and data collection experiments."
  },
  {
    slug: "drug-lord",
    title: "Drug Lord",
    summary: "A TypeScript game project.",
    tags: ["TypeScript", "Game", "Frontend"],
    githubUrl: "https://github.com/Julioevm/drug-lord",
    body: "Drug Lord is a browser game project built in TypeScript, focused on translating a compact game loop into a front-end application."
  },
  {
    slug: "poke-team",
    title: "Poke Team",
    summary: "A TypeScript Pokemon team-building project.",
    tags: ["TypeScript", "Pokemon", "Frontend"],
    githubUrl: "https://github.com/Julioevm/poke-team",
    body: "Poke Team is a front-end project for experimenting with Pokemon team-building flows, data-driven UI, and playful interaction design around roster composition."
  },
  {
    slug: "poke-guess",
    title: "Poke Guess",
    summary: "A TypeScript guessing game built around Pokemon data.",
    tags: ["TypeScript", "Game", "Pokemon"],
    githubUrl: "https://github.com/Julioevm/poke-guess",
    body: "Poke Guess is a browser guessing game that uses Pokemon data as the core content set, combining lightweight game mechanics with a TypeScript front end."
  },
  {
    slug: "poke-battle",
    title: "Poke Battle",
    summary: "A small React-based battle game.",
    tags: ["TypeScript", "React", "Game"],
    githubUrl: "https://github.com/Julioevm/poke-battle",
    body: "Poke Battle is a compact React game project that explores battle mechanics, state transitions, and game UI in a browser-based TypeScript application."
  },
  {
    slug: "react-royale",
    title: "React Royale",
    summary: "A configurable battle royale simulator built with React.",
    tags: ["React", "TypeScript", "Game"],
    githubUrl: "https://github.com/Julioevm/react-royale",
    liveUrl: "https://react-royale.vercel.app/",
    body: "React Royale simulates a battle royale-style game in the browser. The app supports configurable player rosters, events, and items, turning structured data into a lightweight interactive simulation."
  },
  {
    slug: "solid-crypto",
    title: "Solid Crypto",
    summary: "A crypto tracker built with SolidJS.",
    tags: ["SolidJS", "TypeScript", "Crypto"],
    githubUrl: "https://github.com/Julioevm/solid-crypto",
    liveUrl: "https://solid-crypto.web.app/",
    body: "Solid Crypto is a deployed cryptocurrency tracker built with SolidJS, exploring reactive UI patterns and fast client-side data presentation."
  },
  {
    slug: "openai-text-to-speech",
    title: "OpenAI Text to Speech",
    summary: "A Python script for generating audio files with OpenAI text-to-speech models.",
    tags: ["Python", "OpenAI", "Audio"],
    githubUrl: "https://github.com/Julioevm/openai-text-to-speech",
    body: "OpenAI Text to Speech is a small Python utility for generating audio files from text using OpenAI speech models, focused on a straightforward automation workflow."
  },
  {
    slug: "react-native-hotels",
    title: "React Native Hotels",
    summary: "A React Native application project.",
    tags: ["React Native", "TypeScript", "Mobile"],
    githubUrl: "https://github.com/Julioevm/react-native-hotels",
    body: "React Native Hotels is a mobile application project used to explore React Native application structure, navigation, and UI patterns for a hotel-oriented experience."
  }
];

export const featuredProjects = projects.filter((project) => project.featured);

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
