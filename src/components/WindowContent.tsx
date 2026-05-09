import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { getGame } from "../content/games";
import { blogPosts, getBlogPost } from "../content/posts";
import { getProject, projects } from "../content/projects";
import type { DesktopWindow } from "../store/desktopStore";

type WindowContentProps = {
  window: DesktopWindow;
};

export function WindowContent({ window }: WindowContentProps) {
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

  if (window.kind === "projectIndex") {
    return (
      <div className="content-list">
        <div className="content-list__intro">
          <h1>Projects</h1>
          <p>Selected work, experiments, and repositories presented as local project documents.</p>
        </div>
        {projects.map((project) => (
          <Link className="content-card" to={`/projects/${project.slug}`} key={project.slug}>
            <span className="content-card__meta">{project.tags.join(" / ")}</span>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
          </Link>
        ))}
      </div>
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
      <article className="plain-document">
        <h1>About</h1>
        <p>
          This portfolio is built as a small desktop: documents open in windows, projects behave like
          files, and the layout remembers where you left it.
        </p>
        <p>
          The interface is intentionally familiar, but styled with a modern light and dark theme
          rather than a literal retro skin.
        </p>
      </article>
    );
  }

  if (window.kind === "contact") {
    return (
      <article className="plain-document">
        <h1>Contact</h1>
        <p>
          Julio Valls Martinez, Technical Lead based in Valencia, Spain. Open to technical
          leadership, frontend engineering, product UI, and systems-heavy web work.
        </p>
        <div className="contact-grid">
          <a href="mailto:julioevm@gmail.com">julioevm@gmail.com</a>
          <a href="https://github.com/Julioevm">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/julioevm/">
            LinkedIn
          </a>
          <a href="https://juliovalls.netlify.app/">
            Resume
          </a>
        </div>
      </article>
    );
  }

  return <MissingContent />;
}

function MissingContent() {
  return (
    <div className="plain-document">
      <h1>Not Found</h1>
      <p>This document is not available.</p>
    </div>
  );
}
