// src/globs.ts
let GLOB_JS = "**/*.?([cm])js";
var GLOB_JSX = "**/*.?([cm])jsx";
var GLOB_TS = "**/*.?([cm])ts";
var GLOB_TSX = "**/*.?([cm])tsx";
var GLOB_VUE = "**/*.vue";
var GLOB_ASTRO = "**/*.astro";
var GLOB_NODE_MODULES = "**/node_modules";
var GLOB_DIST = "**/dist";
var GLOB_LOCKFILE = [
  "**/package-lock.json",
  "**/yarn.lock",
  "**/pnpm-lock.yaml",
  "**/bun.lockb"
];
var GLOB_EXCLUDE = [
  GLOB_NODE_MODULES,
  GLOB_DIST,
  ...GLOB_LOCKFILE,
  "**/output",
  "**/coverage",
  "**/temp",
  "**/.temp",
  "**/tmp",
  "**/.tmp",
  "**/fixtures",
  "**/.vitepress/cache",
  "**/.nuxt",
  "**/.next",
  "**/.vercel",
  "**/.changeset",
  "**/.idea",
  "**/.cache",
  "**/.output",
  "**/.vite-inspect",
  "**/.nitro",
  "**/.yarn",
  "**/CHANGELOG*.md",
  "**/*.min.*",
  "**/LICENSE*",
  "**/__snapshots__",
  "**/auto-import?(s).d.ts",
  "**/components.d.ts"
];

// src/configs/ignores.ts
var ignores = [{ ignores: GLOB_EXCLUDE }];

// src/plugins.ts
import tseslint from "typescript-eslint";

// src/utils.ts
var parserPlain = {
  meta: {
    name: "parser-plain"
  },
  parseForESLint: (code) => ({
    ast: {
      body: [],
      comments: [],
      loc: { end: code.length, start: 0 },
      range: [0, code.length],
      tokens: [],
      type: "Program"
    },
    scopeManager: null,
    services: { isPlain: true },
    visitorKeys: {
      Program: []
    }
  })
};
// @__NO_SIDE_EFFECTS__
function interopDefault(m) {
  return m.default || m;
}

// src/plugins.ts
import * as _pluginReact from "eslint-plugin-react/configs/recommended.js";

import * as _pluginFormat from "eslint-plugin-format";
var pluginReact = interopDefault(_pluginReact);
var pluginFormat = interopDefault(_pluginFormat);

// src/configs/typescript.ts
var typescriptCore = tseslint.config({
  files: [GLOB_TS, GLOB_TSX],
  extends: [...tseslint.configs.recommended],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/triple-slash-reference": "off"
  }
});
var typescript = [
  ...typescriptCore,
  {
    files: [GLOB_JS, "**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off"
    }
  }
];

// src/configs/react.ts
var react = [
  {
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  {
    name: "renovamen/react",
    files: [GLOB_TSX],
    plugins: pluginReact.plugins,
    rules: {
      ...pluginReact.rules,
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",
      "react/no-unknown-property": "off"
    }
  }
];

// src/env.ts
import process from "node:process";
var isInEditor = !!(
  (process.env.VSCODE_PID ||
    process.env.VSCODE_CWD ||
    process.env.JETBRAINS_IDE ||
    process.env.VIM) &&
  !process.env.CI
);
var hasTypeScript = true;
var hasReact = true;
// src/presets.ts
const presetBasic = [...typescript];
function eslintConfig(config = [], { react: enableReact = hasReact } = {}) {
  const configs = [...presetBasic];

  if (enableReact) configs.push(...react);
  if (Object.keys(config).length > 0) {
    configs.push(...(Array.isArray(config) ? config : [config]));
  }
  return configs;
}
export {
  GLOB_DIST,
  GLOB_EXCLUDE,
  GLOB_JS,
  GLOB_JSX,
  GLOB_LOCKFILE,
  GLOB_NODE_MODULES,
  GLOB_TS,
  GLOB_TSX,
  GLOB_VUE,
  hasReact,
  hasTypeScript,
  ignores,
  isInEditor,
  pluginFormat,
  pluginReact,
  presetBasic,
  react,
  eslintConfig,
  tseslint,
  typescript,
  typescriptCore
};
