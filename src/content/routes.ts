import { blogPosts, getBlogPost } from "./posts";
import { games, getGame } from "./games";
import { getProject, projects } from "./projects";
import type { WindowSeed } from "../store/desktopStore";

export const defaultWindows = {
  blogIndex: {
    id: "blog",
    kind: "blogIndex",
    title: "Blog",
    route: "/blog",
    width: 720,
    height: 520
  },
  projectIndex: {
    id: "projects",
    kind: "folder",
    title: "Projects",
    route: "/projects",
    width: 780,
    height: 560
  },
  about: {
    id: "about",
    kind: "about",
    title: "About",
    route: "/about",
    width: 640,
    height: 480
  },
  contact: {
    id: "contact",
    kind: "contact",
    title: "Contact",
    route: "/contact",
    width: 560,
    height: 420
  },
  resume: {
    id: "resume",
    kind: "resume",
    title: "Resume",
    route: "/resume",
    width: 900,
    height: 680,
    x: 132,
    y: 64
  }
} satisfies Record<string, WindowSeed>;

const getBlogWindow = (slug: string): WindowSeed | null => {
  const post = getBlogPost(slug);
  return post
    ? {
        id: `blog:${post.slug}`,
        kind: "blog",
        title: post.title,
        route: `/blog/${post.slug}`,
        width: 760,
        height: 560
      }
    : null;
};

export const getProjectWindow = (slug: string): WindowSeed | null => {
  const project = getProject(slug);
  return project
    ? {
        id: `project:${project.slug}`,
        kind: "project",
        title: project.title,
        route: `/projects/${project.slug}`,
        width: 760,
        height: 540
      }
    : null;
};

export const projectFileItems = projects.flatMap((project) => {
  const window = getProjectWindow(project.slug);
  return window ? [window] : [];
});

const getGameWindow = (slug: string): WindowSeed | null => {
  const game = getGame(slug);
  return game
    ? {
        id: `game:${game.slug}`,
        kind: "game",
        title: game.title,
        route: `/games/${game.slug}`,
        width: 980,
        height: 680,
        x: 118,
        y: 58
      }
    : null;
};

export const getRouteWindow = (pathname: string): WindowSeed | null => {
  if (pathname === "/" || pathname === "") {
    return null;
  }

  if (pathname === "/blog") {
    return defaultWindows.blogIndex;
  }

  if (pathname === "/projects") {
    return defaultWindows.projectIndex;
  }

  if (pathname === "/about") {
    return defaultWindows.about;
  }

  if (pathname === "/contact") {
    return defaultWindows.contact;
  }

  if (pathname === "/resume") {
    return defaultWindows.resume;
  }

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    return getBlogWindow(blogMatch[1]);
  }

  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    return getProjectWindow(projectMatch[1]);
  }

  const gameMatch = pathname.match(/^\/games\/([^/]+)$/);
  if (gameMatch) {
    return getGameWindow(gameMatch[1]);
  }

  return null;
};

export const featuredDesktopItems = [
  defaultWindows.blogIndex,
  defaultWindows.projectIndex,
  defaultWindows.about,
  defaultWindows.contact,
  defaultWindows.resume,
  ...blogPosts.slice(0, 2).flatMap((post) => {
    const window = getBlogWindow(post.slug);
    return window ? [window] : [];
  }),
  ...games.flatMap((game) => {
    const window = getGameWindow(game.slug);
    return window ? [window] : [];
  })
] as WindowSeed[];
