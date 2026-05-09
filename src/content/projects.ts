export type Project = {
  slug: string;
  title: string;
  summary: string;
  githubUrl: string;
  tags: string[];
  liveUrl?: string;
  image?: string;
  body: string;
};

export const projects: Project[] = [
  {
    slug: "os-portfolio",
    title: "OS Portfolio",
    summary: "A portfolio presented as a modern desktop environment with movable document windows.",
    githubUrl: "https://github.com/reave/portfolio",
    tags: ["React", "Vite", "SCSS", "Zustand"],
    body: "A spatial portfolio interface with Markdown documents, project windows, persisted layout state, and shareable deep links."
  },
  {
    slug: "markdown-workbench",
    title: "Markdown Workbench",
    summary: "A writing surface for technical notes, drafts, and portfolio essays.",
    githubUrl: "https://github.com/reave/markdown-workbench",
    tags: ["Markdown", "TypeScript", "UX"],
    body: "This project explores fast document workflows: metadata, previews, syntax highlighting hooks, and export-ready content."
  },
  {
    slug: "interface-lab",
    title: "Interface Lab",
    summary: "Small experiments in dense, tactile application UI.",
    githubUrl: "https://github.com/reave/interface-lab",
    tags: ["Design Systems", "Frontend", "Prototyping"],
    liveUrl: "https://example.com",
    body: "A collection of focused interface prototypes around windowing, inspectors, command surfaces, and responsive tool layouts."
  }
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
