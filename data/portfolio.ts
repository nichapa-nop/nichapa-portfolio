export const profile = {
  name: "Nichapa Nopparat",
  role: "Fullstack Developer",
  roles: ["Fullstack", "Frontend", "Backend", "AI Engineer"],
  tagline:
    "Fullstack Developer with 1 year of hands-on experience building and maintaining production systems.",
  about:
    "Fullstack Developer with 1 year of hands-on experience building and maintaining production systems, currently working on a large-scale POS microservices platform. Comfortable across the stack — from React Native/Expo mobile apps to NestJS APIs and Next.js web apps — with strong experience in refactoring legacy code, internationalization, and cross-team collaboration with design and product. A fast learner who adapts quickly to new codebases and thrives on solving problems independently.",
  location: "Bangkok, Thailand",
  email: "nichapa.nop@gmail.com",
  phone: "064-998-7461",
  linkedin: "https://www.linkedin.com/in/nichapa-nopparat-603737249",
  linkedinLabel: "linkedin.com/in/nichapa-nopparat",
  github: "https://github.com/",
  availability: "Open to Fullstack · Frontend · Backend · AI Engineer roles",
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  summary?: string;
  points: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    role: "Fullstack Developer",
    company: "FULL TEAM CO., LTD.",
    period: "Aug 2025 — Present",
    current: true,
    summary:
      "Building web apps for a microservices-based POS platform, primarily the CMS/admin system for stores, inventory, products and staff.",
    points: [
      "Developed CMS features for inventory, product and staff management, plus manager-facing dashboard pages.",
      "Built a real-time delivery/order system integrated with Pusher for live updates across store operations.",
      "Contributed to the store/merchant management module.",
      "Recently expanded into the mobile POS app (React Native/Expo) as scope grew.",
    ],
    stack: ["Next.js", "NestJS", "React Native", "Expo", "Pusher", "TypeScript"],
  },
  {
    role: "AI Programmer",
    company: "SBEY Credit Foncier Co., Ltd.",
    period: "2025",
    summary:
      "Independently executed AI research and prototyping tasks assigned by the team lead, then reported outcomes.",
    points: [
      "Integrated Gemini 2.5 Pro Preview TTS to generate natural speech from arbitrary text, evaluating quality and limitations.",
      "Built a scraper that pulls legal content from court websites, converts HTML into structured JSON, and imports it into a database for analysis.",
      "Researched and benchmarked OCR / TTS / STT models for document digitization and speech, analyzing confidence and production-readiness.",
    ],
    stack: ["Python", "Gemini API", "OCR", "TTS / STT", "Web Scraping"],
  },
  {
    role: "Intern Software Developer",
    company: "Base Learnx Co., Ltd.",
    period: "Apr 2024 — Oct 2024",
    summary:
      "Built a full-stack Customer Service Ticketing System for managing customer issue tickets.",
    points: [
      "Developed the app end-to-end with Next.js, NestJS and PostgreSQL.",
      "Implemented ticket tracking, staff assignment and optional email notifications.",
      "Designed a responsive UI with Tailwind CSS and maintained the codebase on GitHub.",
      "Gained hands-on experience designing database schemas and consuming REST APIs.",
    ],
    stack: ["Next.js", "NestJS", "PostgreSQL", "Tailwind CSS", "REST API"],
  },
];

export const education = [
  {
    school: "Thai-Nichi Institute of Technology",
    detail: "B.Eng. — Computer Engineering",
    year: "2021 — 2025",
  },
  {
    school: "Bodindecha (Sing Singhaseni) School",
    detail: "Science & Mathematics Program",
    year: "2017 — 2020",
  },
];

export const skills: Record<string, string[]> = {
  Languages: [
    "TypeScript",
    "JavaScript",
    "Python",
    "Go",
    "C",
    "C++",
    "SQL",
    "PHP",
  ],
  "Frameworks & Libraries": [
    "Next.js",
    "NestJS",
    "Node.js",
    "React",
    "React Native",
    "Tailwind CSS",
    "OpenCV",
  ],
  Databases: ["PostgreSQL", "MySQL", "Oracle"],
  "AI / LLM": [
    "Claude API",
    "Gemini API",
    "Prompt Engineering",
    "LLM API Integration",
  ],
  "AI-Assisted Dev": [
    "Claude Code",
    "Google Antigravity",
    "ChatGPT",
    "Gemini",
  ],
  Tools: [
    "Git & GitHub",
    "VS Code",
    "Postman",
    "DBeaver",
    "Google Colab",
    "RESTful APIs",
  ],
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];
