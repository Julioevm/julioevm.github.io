import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { getGame } from "../content/games";
import { blogPosts, getBlogPost } from "../content/posts";
import { aboutContent, contactContent } from "../content/profile";
import { getProject } from "../content/projects";
import { documentFileItems, projectFileItems } from "../content/routes";
import { useDesktopStore, type DesktopWindow, type WindowSeed } from "../store/desktopStore";
import { Icon, getWindowIcon } from "./Icon";

type WindowContentProps = {
  window: DesktopWindow;
};

export function WindowContent({ window }: WindowContentProps) {
  const navigate = useNavigate();
  const openWindow = useDesktopStore((state) => state.openWindow);

  const openFile = (item: WindowSeed) => {
    openWindow(item);
    navigate(item.route);
  };

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
      <FolderView
        ariaLabel="Projects files"
        title="Projects"
        summary="Selected work, experiments, and repositories stored as project files."
        items={projectFileItems}
        onOpen={openFile}
      />
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
          <a href={project.githubUrl}>
            GitHub
          </a>
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

function FolderView({ ariaLabel, title, summary, items, onOpen }: FolderViewProps) {
  return (
    <div className="folder-view">
      {title || summary ? (
        <div className="folder-view__header">
          {title ? <h1>{title}</h1> : null}
          {summary ? <p>{summary}</p> : null}
        </div>
      ) : null}
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
