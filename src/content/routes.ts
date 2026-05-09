import { blogPosts, getBlogPost } from "./posts";
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
    kind: "projectIndex",
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

const getProjectWindow = (slug: string): WindowSeed | null => {
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

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    return getBlogWindow(blogMatch[1]);
  }

  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    return getProjectWindow(projectMatch[1]);
  }

  return null;
};

export const featuredDesktopItems = [
  defaultWindows.blogIndex,
  defaultWindows.projectIndex,
  defaultWindows.about,
  defaultWindows.contact,
  ...blogPosts.slice(0, 2).flatMap((post) => {
    const window = getBlogWindow(post.slug);
    return window ? [window] : [];
  }),
  ...projects.slice(0, 2).flatMap((project) => {
    const window = getProjectWindow(project.slug);
    return window ? [window] : [];
  })
] as WindowSeed[];
