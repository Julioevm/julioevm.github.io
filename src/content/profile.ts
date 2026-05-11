export type TextDocument = {
  title: string;
  paragraphs: string[];
};

export type ContactLink = {
  label: string;
  href: string;
};

export type ContactDocument = TextDocument & {
  links: ContactLink[];
};

export const aboutContent: TextDocument = {
  title: "About",
  paragraphs: [
    "Hey! I'm Julio Valls, a technical lead based in Valencia, Spain, with over 10 years of experience in the tech industry. I focus on improving team delivery and software quality through mentoring, pragmatic engineering practices, and a culture of continuous improvement.",
    "My approach centers on creating great user experiences through simplicity: solutions that are easy to understand, iterate on, and measure. I prioritize delivery and learning over unnecessary complexity or perfection for its own sake.",
    "I work across technical leadership, full-stack engineering, product UI, and systems-heavy web applications, and I actively use AI tools to improve productivity, code quality, and the way teams build software."
  ]
};

export const contactContent: ContactDocument = {
  title: "Contact",
  paragraphs: [
    "Julio Valls, Technical Lead based in Valencia, Spain. Open to technical leadership, full-stack engineering, product UI, and systems-heavy web work."
  ],
  links: [
    {
      label: "julioevm@gmail.com",
      href: "mailto:julioevm@gmail.com"
    },
    {
      label: "GitHub",
      href: "https://github.com/Julioevm"
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/julioevm/"
    },
    {
      label: "Resume",
      href: "https://juliovalls.netlify.app/"
    }
  ]
};
