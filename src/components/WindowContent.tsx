import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { getGame } from "../content/games";
import { blogPosts, getBlogPost } from "../content/posts";
import { aboutContent, contactContent } from "../content/profile";
import { featuredProjects, getProject } from "../content/projects";
import { documentFileItems, getRouteWindow, projectFileItems } from "../content/routes";
import { welcomeContent } from "../content/welcome";
import { useDesktopStore, type DesktopWindow, type WindowSeed } from "../store/desktopStore";
import { Icon, getWindowIcon } from "./Icon";

type WindowContentProps = {
  window: DesktopWindow;
};

export function WindowContent({ window }: WindowContentProps) {
  const navigate = useNavigate();
  const openWindow = useDesktopStore((state) => state.openWindow);
  const shouldShowWelcome = useDesktopStore((state) => state.shouldShowWelcome);
  const setShouldShowWelcome = useDesktopStore((state) => state.setShouldShowWelcome);

  const openFile = (item: WindowSeed) => {
    openWindow(item);
    navigate(item.route);
  };

  const openRoute = (route: string) => {
    const routeWindow = getRouteWindow(route);
    if (routeWindow) {
      openWindow(routeWindow);
    }
    navigate(route);
  };

  if (window.kind === "welcome") {
    return (
      <WelcomeView
        onOpenRoute={openRoute}
        shouldShowWelcome={shouldShowWelcome}
        onShouldShowWelcomeChange={setShouldShowWelcome}
      />
    );
  }

  if (window.kind === "blogIndex") {
    return (
      <div className="content-list">
        <div className="content-list__intro">
          <h1>Blog</h1>
          <p>Notes on interfaces, frontend systems, and local-first portfolio architecture.</p>
        </div>
        {blogPosts.map((post) => (
          <Link className="content-card" to={`/blog/${post.slug}`} key={post.slug}>
            <span className="content-card__meta">{post.date}</span>
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
            <span className="tag-row">{post.tags.join(" / ")}</span>
          </Link>
        ))}
      </div>
    );
  }

  if (window.kind === "folder" || window.kind === "projectIndex") {
    if (window.route === "/documents") {
      return (
        <FolderView
          ariaLabel="Documents files"
          items={documentFileItems}
          onOpen={openFile}
        />
      );
    }

    return (
      <ProjectFolderView items={projectFileItems} onOpen={openFile} />
    );
  }

  if (window.kind === "blog") {
    const slug = window.route.split("/").at(-1) ?? "";
    const post = getBlogPost(slug);
    if (!post) {
      return <MissingContent />;
    }

    return (
      <article className="markdown-document">
        <div className="document-meta">
          <span>{post.date}</span>
          <span>{post.tags.join(" / ")}</span>
        </div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
      </article>
    );
  }

  if (window.kind === "project") {
    const slug = window.route.split("/").at(-1) ?? "";
    const project = getProject(slug);
    if (!project) {
      return <MissingContent />;
    }

    return (
      <article className="project-document">
        <div className="document-meta">
          <span>{project.tags.join(" / ")}</span>
        </div>
        <h1>{project.title}</h1>
        <p className="project-document__summary">{project.summary}</p>
        <p>{project.body}</p>
        <div className="project-document__links">
          {project.githubUrl ? (
            <a href={project.githubUrl}>
              GitHub
            </a>
          ) : null}
          {project.liveUrl ? (
            <a href={project.liveUrl}>
              Live
            </a>
          ) : null}
        </div>
      </article>
    );
  }

  if (window.kind === "game") {
    const slug = window.route.split("/").at(-1) ?? "";
    const game = getGame(slug);
    if (!game) {
      return <MissingContent />;
    }

    return (
      <div className="game-window" aria-label={game.title}>
        <iframe
          className="game-window__frame"
          title={game.title}
          src={game.url}
          referrerPolicy="no-referrer"
          allow="fullscreen; gamepad"
        />
      </div>
    );
  }

  if (window.kind === "resume") {
    return (
      <div className="resume-window" aria-label="Julio Valls resume site">
        <iframe
          className="resume-window__frame"
          title="Julio Valls resume site"
          src="https://juliovalls.netlify.app/"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  if (window.kind === "about") {
    return (
      <TextDocumentView document={aboutContent} />
    );
  }

  if (window.kind === "contact") {
    return (
      <article className="plain-document">
        <h1>{contactContent.title}</h1>
        {contactContent.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className="contact-grid">
          {contactContent.links.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </article>
    );
  }

  return <MissingContent />;
}

type FolderViewProps = {
  ariaLabel: string;
  title?: string;
  summary?: string;
  items: WindowSeed[];
  onOpen: (item: WindowSeed) => void;
};

function TextDocumentView({ document }: { document: { title: string; paragraphs: string[] } }) {
  return (
    <article className="plain-document">
      <h1>{document.title}</h1>
      {document.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </article>
  );
}

function ProjectFolderView({ items, onOpen }: Pick<FolderViewProps, "items" | "onOpen">) {
  const featuredItems = featuredProjects.flatMap((project) => {
    const item = items.find((projectItem) => projectItem.route === `/projects/${project.slug}`);
    return item ? [{ item, project }] : [];
  });
  const repoItems = items.filter((item) => {
    const project = getProject(item.route.split("/").at(-1) ?? "");
    return !project?.featured;
  });

  return (
    <div className="folder-view project-folder">
      <div className="folder-view__header">
        <h1>Projects</h1>
        <p>Full products, shipped apps, experiments, and public repositories from GitHub.</p>
      </div>
      {featuredItems.length > 0 ? (
        <section className="project-folder__section" aria-labelledby="featured-projects-title">
          <div className="project-folder__section-header">
            <h2 id="featured-projects-title">Featured products</h2>
            <p>Two full-featured products with real users, product surfaces, and deployed sites.</p>
          </div>
          <div className="featured-projects">
            {featuredItems.map(({ item, project }) => (
              <button
                className="featured-project-card"
                type="button"
                key={project.slug}
                onClick={() => onOpen(item)}
                onDoubleClick={() => onOpen(item)}
              >
                <span className="featured-project-card__eyebrow">Product highlight</span>
                <span className="featured-project-card__title">{project.title}</span>
                <span className="featured-project-card__summary">{project.summary}</span>
                <span className="tag-row">{project.tags.join(" / ")}</span>
                <span className="featured-project-card__links">
                  {project.liveUrl ? <span>Live site</span> : null}
                  {project.githubUrl ? <span>Public repo</span> : null}
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}
      <section className="project-folder__section" aria-labelledby="repository-projects-title">
        <div className="project-folder__section-header">
          <h2 id="repository-projects-title">Public repositories</h2>
          <p>Open source and public project files with repository links and deployments where available.</p>
        </div>
        <FolderGrid ariaLabel="Public repository files" items={repoItems} onOpen={onOpen} />
      </section>
    </div>
  );
}

function WelcomeView({
  onOpenRoute,
  shouldShowWelcome,
  onShouldShowWelcomeChange
}: {
  onOpenRoute: (route: string) => void;
  shouldShowWelcome: boolean;
  onShouldShowWelcomeChange: (shouldShowWelcome: boolean) => void;
}) {
  return (
    <article className="welcome-document">
      <h1>{welcomeContent.title}</h1>
      {welcomeContent.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="welcome-grid" aria-label="Things to explore">
        {welcomeContent.highlights.map((highlight) => (
          <button
            className="welcome-card"
            type="button"
            key={highlight.route}
            onClick={() => onOpenRoute(highlight.route)}
          >
            <span>{highlight.title}</span>
            <small>{highlight.description}</small>
          </button>
        ))}
      </div>
      <label className="welcome-option">
        <input
          type="checkbox"
          checked={!shouldShowWelcome}
          onChange={(event) => onShouldShowWelcomeChange(!event.currentTarget.checked)}
        />
        <span>Don't show this again</span>
      </label>
    </article>
  );
}

function FolderView({ ariaLabel, title, summary, items, onOpen }: FolderViewProps) {
  return (
    <div className="folder-view">
      {title || summary ? (
        <div className="folder-view__header">
          {title ? <h1>{title}</h1> : null}
          {summary ? <p>{summary}</p> : null}
        </div>
      ) : null}
      <FolderGrid ariaLabel={ariaLabel} items={items} onOpen={onOpen} />
    </div>
  );
}

function FolderGrid({ ariaLabel, items, onOpen }: FolderViewProps) {
  return (
    <div className="folder-view__grid" role="list" aria-label={ariaLabel}>
      {items.map((item) => {
        const project = getProject(item.route.split("/").at(-1) ?? "");
        return (
          <div key={item.id} role="listitem">
            <button
              className="folder-file"
              type="button"
              onClick={() => onOpen(item)}
              onDoubleClick={() => onOpen(item)}
            >
              <span className="folder-file__icon" aria-hidden="true">
                <Icon name={getWindowIcon(item.kind)} />
              </span>
              <span className="folder-file__name">{item.title}</span>
              {project ? (
                <span className="folder-file__meta">{project.tags.join(" / ")}</span>
              ) : null}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function MissingContent() {
  return (
    <div className="plain-document">
      <h1>Not Found</h1>
      <p>This document is not available.</p>
    </div>
  );
}
