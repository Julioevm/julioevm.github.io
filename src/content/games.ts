export type Game = {
  slug: string;
  title: string;
  summary: string;
  url: string;
  tags: string[];
};

export const games: Game[] = [
  {
    slug: "nethack-3d",
    title: "NetHack 3D",
    summary: "A browser-playable 3D take on NetHack, presented in a local desktop game window.",
    url: "https://jamesiv4.github.io/nethack-3d/",
    tags: ["Game", "Browser", "3D"]
  },
  {
    slug: "zip",
    title: "Zip",
    summary: "A browser-playable puzzle game embedded directly into the desktop.",
    url: "https://playzip.netlify.app/",
    tags: ["Game", "Browser", "Puzzle"]
  }
];

export const getGame = (slug: string) => games.find((game) => game.slug === slug);
