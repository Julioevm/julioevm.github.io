import type { BearData } from "~/types";

const bear: BearData[] = [
  {
    id: "profile",
    title: "Profile",
    icon: "i-fa-solid:paw",
    md: [
      {
        id: "about-me",
        title: "About Me",
        file: "markdown/about-me.md",
        icon: "i-la:dragon",
        excerpt: "Hey there! I'm a dragon lost in human world..."
      },
      {
        id: "github-stats",
        title: "Github Stats",
        file: "markdown/github-stats.md",
        icon: "i-icon-park-outline:github",
        excerpt: "Here are some status about my github account..."
      },
      {
        id: "about-site",
        title: "About This Site",
        file: "markdown/about-site.md",
        icon: "i-octicon:browser",
        excerpt: "Something about this personal portfolio site..."
      }
    ]
  },
  {
    id: "project",
    title: "Projects",
    icon: "i-octicon:repo",
    md: [
      {
        id: "tiny-scraper",
        title: "Tiny Scraper",
        file: "https://raw.githubusercontent.com/Julioevm/tiny-scraper/refs/heads/master/readme.md",
        icon: "i-ri:gamepad-line",
        excerpt: "A simple game cover scraper for Anbernic RGXX devices.",
        link: "https://github.com/Julioevm/tiny-scraper"
      },
      {
        id: "portfolio-macos",
        title: "Portfolio macOS",
        file: "https://raw.githubusercontent.com/Julioevm/julioevm.github.io/main/README.md",
        icon: "i-ri:gamepad-line",
        excerpt: "My portfolio website simulating macOS's GUI...",
        link: "https://github.com/Julioevm/julioevm.github.io"
      },
      {
        id: "scrum-poker",
        title: "Scrum Poker",
        file: "https://raw.githubusercontent.com/Julioevm/scrum-poker/refs/heads/master/README.md",
        icon: "i-ri:newspaper-fill",
        excerpt: "A scrum poker app.",
        link: "http://scrum-poker-nine.vercel.app/"
      },
      {
        id: "coten",
        title: "COTEN",
        file: "https://raw.githubusercontent.com/Julioevm/coten/refs/heads/master/readme.md",
        icon: "i-ri:gamepad-line",
        excerpt: "A Roguelike made with Python.",
        link: "https://github.com/Julioevm/coten"
      }
    ]
  }
];

export default bear;
