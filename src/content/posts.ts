import desktopAsInterface from "./blog/desktop-as-interface.md?raw";
import localFirstContent from "./blog/local-first-content.md?raw";
import { parseMarkdown } from "./frontmatter";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  body: string;
};

const sources = [
  ["desktop-as-interface", desktopAsInterface],
  ["local-first-content", localFirstContent]
] as const;

export const blogPosts: BlogPost[] = [...sources]
  .map(([slug, source]) => {
    const parsed = parseMarkdown(source);
    return {
      slug,
      title: String(parsed.data.title),
      date: String(parsed.data.date),
      summary: String(parsed.data.summary),
      tags: Array.isArray(parsed.data.tags) ? parsed.data.tags.map(String) : [],
      body: parsed.content
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);
