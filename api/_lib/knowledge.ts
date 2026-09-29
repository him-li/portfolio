export const portfolioContext = `
PROFILE [profile]
Xin Li is a multilingual software engineer based in Israel. He focuses on frontend engineering, thoughtful product UI, and full-stack systems. Languages include Mandarin Chinese, English, Hebrew, and Arabic.

EXPERIENCE [experience-realeye]
Software Engineer at RealEye Labs, Tel Aviv (2024–2026). Built and maintained production interfaces with React, Next.js, TypeScript, Tailwind CSS, and HeroUI. Built reusable schema-driven UI for dynamic forms, nested objects, arrays, and configurable workflows. Integrated REST APIs with Python/FastAPI services and debugged validation, state synchronization, error handling, and MongoDB-backed data across the stack.

EXPERIENCE [experience-zota]
Financial Operations Specialist at Zota Technology (2021–2023). Managed payment-processor and partner relationships across China, Southeast Asia, Latin America, and Africa. Coordinated technical and operational integration requirements, negotiated pricing, supported partners in Mandarin and English, and analyzed financial and transaction data.

EXPERIENCE [experience-cnpiec]
Overseas Sales at CNPIEC (2019). Coordinated copyright clients and contracts and provided Arabic, English, and Mandarin translation for Middle Eastern exhibitors.

PROJECT [project-little-llama]
Little Llama is an independently designed, production-deployed multilingual pet-adoption platform. React, TypeScript, Next.js, MUI, Python, FastAPI, PostgreSQL. Includes responsive RTL-ready UI, advanced search, JWT authentication, saved/adopt/foster workflows, profiles, admin CRUD, image uploads, and tested backend services.

PROJECT [project-codecrafthub]
CodeCraftHub is an IBM Generative AI capstone: a TypeScript full-stack learning dashboard for courses, target dates, statuses, roadmaps, and progress summaries. React, Vite, Tailwind CSS, Express. Its focus was AI-assisted software design and prompt engineering.

PROJECT [project-zelaze]
Zelaze is an ITC group capstone for matching people who need help with nearby community members. React, TypeScript, Vite, MUI, Node.js.

PROJECT [project-little-lemon]
Little Lemon is a responsive restaurant booking experience from Meta frontend/backend capstones. Python, Django, Tailwind CSS, DaisyUI, HTMX, and PostgreSQL, with semantic components, validation, and interaction tests.

AI LEARNING [ai-learning]
Xin created course prototypes covering career coaching, document question-answering/RAG, speech transcription and meeting summarization, voice translation/chat, image captioning, sentiment analysis, and emotion detection. Ask Xin consolidates lessons from these prototypes into a production-oriented, guarded portfolio interface.

EDUCATION [education]
M.A. in Middle Eastern Studies from the Hebrew University of Jerusalem. Additional professional study includes Israel Tech Challenge full-stack development, Meta frontend/backend programs, IBM generative AI coursework, and Google IT support.
`.trim();

export const validCitations = new Set([
  "profile",
  "experience-realeye",
  "experience-zota",
  "experience-cnpiec",
  "project-little-llama",
  "project-codecrafthub",
  "project-zelaze",
  "project-little-lemon",
  "ai-learning",
  "education",
]);
