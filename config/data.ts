type ReadmeBadge = {
  static_label?: string;
  label: string;
  logo: string;
  href?: string;
};

const featured_badges: ReadmeBadge[] = [
  {
    static_label: "Gmail",
    label: "adamjnav",
    logo: "gmail",
    href: "mailto:adamjnav@gmail.com",
  },
  {
    static_label: "X",
    label: "AdamJNavarro",
    logo: "x",
    href: "https://x.com/AdamJNavarro",
  },
  {
    static_label: "Instagram",
    label: "adamjnavarro",
    logo: "instagram",
    href: "https://instagram.com/adamjnavarro",
  },
];

const language_badges: ReadmeBadge[] = [
  {
    label: "JavaScript",
    logo: "javascript",
  },
  {
    label: "TypeScript",
    logo: "typescript",
  },
  {
    label: "HTML",
    logo: "html5",
  },
  {
    label: "CSS",
    logo: "css3",
  },
  // {
  //   static_label: "C#",
  //   label: "C#",
  //   logo: "",
  // },
];

const framework_badges: ReadmeBadge[] = [
  {
    label: "React",
    logo: "react",
  },
  {
    label: "Next.js",
    logo: "nextdotjs",
  },
  {
    label: "Core",
    logo: "dotnet",
  },
  {
    label: "Storybook",
    logo: "storybook",
  },
  {
    label: "TailwindCSS",
    logo: "tailwindcss",
  },
  {
    label: "Lit",
    logo: "lit",
  },
  {
    label: "PostgreSQL",
    logo: "postgresql",
  },
  {
    label: "Cypress",
    logo: "cypress",
  },
];

const service_badges: ReadmeBadge[] = [
  {
    label: "Github",
    logo: "github",
  },
  {
    label: "Docker",
    logo: "docker",
  },
  {
    label: "Chromatic",
    logo: "chromatic",
  },
  {
    label: "Cloudinary",
    logo: "cloudinary",
  },
  // {
  //   label: "Azure",
  //   logo: "",
  // },
];

const tool_badges: ReadmeBadge[] = [
  {
    label: "Git",
    logo: "git",
  },
  {
    label: "NPM",
    logo: "npm",
  },
  {
    label: "Yarn",
    logo: "yarn",
  },
  {
    label: "ESLint",
    logo: "eslint",
  },
  {
    label: "commitlint",
    logo: "commitlint",
  },
  {
    label: "Prettier",
    logo: "prettier",
  },
];

export {
  type ReadmeBadge,
  service_badges,
  tool_badges,
  framework_badges,
  featured_badges,
  language_badges,
};
