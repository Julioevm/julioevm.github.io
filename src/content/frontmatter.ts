type FrontmatterValue = string | string[];

export function parseMarkdown(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {} as Record<string, FrontmatterValue>, content: source };
  }

  return {
    data: parseFrontmatter(match[1]),
    content: match[2].trimStart()
  };
}

function parseFrontmatter(source: string) {
  const data: Record<string, FrontmatterValue> = {};
  const lines = source.split(/\r?\n/);
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const scalar = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!scalar) {
      index += 1;
      continue;
    }

    const key = scalar[1];
    const value = scalar[2];

    if (value) {
      data[key] = value;
      index += 1;
      continue;
    }

    const list: string[] = [];
    index += 1;
    while (index < lines.length) {
      const item = lines[index].match(/^\s*-\s+(.+)$/);
      if (!item) {
        break;
      }
      list.push(item[1]);
      index += 1;
    }
    data[key] = list;
  }

  return data;
}
