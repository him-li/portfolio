import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import type { Locale } from "../i18n";

type Mode = "explore" | "role-match";
type CitationId =
  | "profile"
  | "experience-realeye"
  | "experience-zota"
  | "experience-cnpiec"
  | "project-little-llama"
  | "project-codecrafthub"
  | "project-zelaze"
  | "project-little-lemon"
  | "ai-learning"
  | "education";

type Answer = {
  answer: string;
  citations: string[];
  provider?: string;
  demo?: boolean;
};

const citationMap: Record<CitationId, { label: string; href: string }> = {
  profile: { label: "Profile & skills", href: "/#profile" },
  "experience-realeye": { label: "RealEye Labs", href: "/#experience" },
  "experience-zota": { label: "Zota Technology", href: "/#experience" },
  "experience-cnpiec": { label: "CNPIEC", href: "/#experience" },
  "project-little-llama": { label: "Little Llama", href: "/#work" },
  "project-codecrafthub": { label: "CodeCraftHub", href: "/#work" },
  "project-zelaze": { label: "Zelaze", href: "/#work" },
  "project-little-lemon": { label: "Little Lemon", href: "/#work" },
  "ai-learning": { label: "AI learning journey", href: "/#work" },
  education: { label: "Education", href: "/#profile" },
};

const copy = {
  en: {
    eyebrow: "Interactive portfolio",
    title: "Ask Xin, not a search box.",
    body: "Explore my work, or paste a role to see an evidence-based match. Answers stay grounded in this portfolio.",
    explore: "Explore my work",
    role: "Match a role",
    placeholder: "Ask about my projects, experience, or approach…",
    rolePlaceholder: "Paste a job description or describe the role…",
    submit: "Ask Xin",
    live: "Live AI",
    demo: "Curated demo",
    privacy: "Please don’t include sensitive or personal information.",
    full: "Open the full experience",
    sources: "From this portfolio",
    back: "Back to portfolio",
    suggestions: [
      "Which project best demonstrates full-stack work?",
      "Summarize Xin’s frontend experience in 30 seconds.",
      "How does Xin combine product thinking and engineering?",
    ],
  },
  "zh-CN": {
    eyebrow: "交互式作品集",
    title: "直接问 Xin，而不只是搜索。",
    body: "了解我的经历与项目，或粘贴职位描述获得基于事实的匹配分析。回答只依据本作品集。",
    explore: "了解我的经历",
    role: "匹配职位",
    placeholder: "询问我的项目、经历或工作方式……",
    rolePlaceholder: "粘贴职位描述，或简单描述这个岗位……",
    submit: "问 Xin",
    live: "实时 AI",
    demo: "精选演示",
    privacy: "请勿输入敏感信息或个人资料。",
    full: "打开完整体验",
    sources: "内容来源",
    back: "返回作品集",
    suggestions: [
      "哪个项目最能体现全栈能力？",
      "用 30 秒概括 Xin 的前端经验。",
      "Xin 如何结合产品思维与工程能力？",
    ],
  },
  "zh-TW": {
    eyebrow: "互動式作品集",
    title: "直接問 Xin，而不只是搜尋。",
    body: "了解我的經歷與專案，或貼上職位描述取得以事實為基礎的匹配分析。",
    explore: "了解我的經歷",
    role: "匹配職位",
    placeholder: "詢問我的專案、經歷或工作方式……",
    rolePlaceholder: "貼上職位描述，或簡單描述這個職位……",
    submit: "問 Xin",
    live: "即時 AI",
    demo: "精選示範",
    privacy: "請勿輸入敏感資訊或個人資料。",
    full: "開啟完整體驗",
    sources: "內容來源",
    back: "返回作品集",
    suggestions: [
      "哪個專案最能展現全端能力？",
      "用 30 秒概括 Xin 的前端經驗。",
      "Xin 如何結合產品思維與工程能力？",
    ],
  },
  he: {
    eyebrow: "תיק עבודות אינטראקטיבי",
    title: "שאלו את Xin, לא רק תיבת חיפוש.",
    body: "גלו את הניסיון והפרויקטים שלי, או הדביקו תיאור משרה להתאמה מבוססת ראיות.",
    explore: "הכירו את העבודה שלי",
    role: "התאמת תפקיד",
    placeholder: "שאלו על פרויקטים, ניסיון או דרך העבודה שלי…",
    rolePlaceholder: "הדביקו תיאור משרה או תארו את התפקיד…",
    submit: "שאלו את Xin",
    live: "AI חי",
    demo: "הדגמה מוכנה",
    privacy: "אין להזין מידע אישי או רגיש.",
    full: "לחוויה המלאה",
    sources: "מתוך תיק העבודות",
    back: "חזרה לתיק העבודות",
    suggestions: [
      "איזה פרויקט מדגים יכולת full-stack?",
      "סכמו את ניסיון ה-frontend של Xin.",
      "איך Xin משלב חשיבה מוצרית והנדסה?",
    ],
  },
  ar: {
    eyebrow: "معرض أعمال تفاعلي",
    title: "اسأل Xin، لا تستخدم البحث فقط.",
    body: "استكشف خبرتي ومشاريعي أو ألصق وصف وظيفة للحصول على مقارنة مبنية على أدلة.",
    explore: "استكشف عملي",
    role: "مطابقة وظيفة",
    placeholder: "اسأل عن مشاريعي أو خبرتي أو أسلوب عملي…",
    rolePlaceholder: "ألصق وصف الوظيفة أو صف الدور…",
    submit: "اسأل Xin",
    live: "ذكاء اصطناعي مباشر",
    demo: "عرض مُعد مسبقاً",
    privacy: "يرجى عدم إدخال معلومات شخصية أو حساسة.",
    full: "افتح التجربة الكاملة",
    sources: "من معرض الأعمال",
    back: "العودة إلى معرض الأعمال",
    suggestions: [
      "أي مشروع يوضح خبرة full-stack؟",
      "لخّص خبرة Xin في الواجهات الأمامية.",
      "كيف يجمع Xin بين تفكير المنتج والهندسة؟",
    ],
  },
} satisfies Record<Locale, Record<string, string | string[]>>;

function demoAnswer(locale: Locale, mode: Mode): Answer {
  const answers: Record<Locale, string> = {
    en:
      mode === "role-match"
        ? "Xin is strongest for product-oriented frontend or full-stack roles requiring React, TypeScript, API integration, and close UI/UX collaboration. His RealEye work provides production evidence, while Little Llama demonstrates independent end-to-end ownership. A role requiring deep infrastructure or several years of dedicated ML engineering would be a less direct match."
        : "Little Llama is the clearest end-to-end example: Xin independently designed a multilingual, RTL-ready product with React and TypeScript, backed by FastAPI and PostgreSQL. His production experience at RealEye Labs adds schema-driven UI, REST integration, and cross-stack debugging evidence.",
    "zh-CN":
      mode === "role-match"
        ? "Xin 最适合强调产品体验的前端或全栈岗位，尤其是需要 React、TypeScript、API 集成和 UI/UX 协作的职位。RealEye 经历提供生产环境证据，Little Llama 则体现独立完成端到端产品的能力。若岗位重点是底层基础设施或多年专职机器学习研究，匹配度会相对较低。"
        : "Little Llama 最能体现端到端能力：Xin 独立设计了支持多语言和 RTL 的 React/TypeScript 产品，并使用 FastAPI 与 PostgreSQL 完成后端。RealEye 的生产经验进一步证明了 Schema 驱动 UI、REST 集成和跨栈调试能力。",
    "zh-TW":
      mode === "role-match"
        ? "Xin 最適合重視產品體驗的前端或全端職位，尤其需要 React、TypeScript、API 整合與 UI/UX 協作的團隊。RealEye 經歷提供正式環境證據，Little Llama 則展現獨立完成端到端產品的能力。"
        : "Little Llama 最能展現端到端能力：Xin 獨立設計支援多語言與 RTL 的 React/TypeScript 產品，並以 FastAPI 和 PostgreSQL 完成後端。",
    he:
      mode === "role-match"
        ? "Xin מתאים במיוחד לתפקידי frontend או full-stack עם אוריינטציית מוצר, React, TypeScript, אינטגרציות API ושיתוף פעולה עם UI/UX. הניסיון ב-RealEye מספק הוכחה מעבודה בפרודקשן."
        : "Little Llama הוא הדוגמה המלאה ביותר: מוצר רב-לשוני ותומך RTL שנבנה ב-React ו-TypeScript, עם FastAPI ו-PostgreSQL בצד השרת.",
    ar:
      mode === "role-match"
        ? "يناسب Xin بشكل خاص أدوار الواجهات الأمامية أو full-stack الموجهة نحو المنتج، والتي تتطلب React وTypeScript وتكامل API والتعاون في UI/UX."
        : "يُعد Little Llama أوضح مثال متكامل: منتج متعدد اللغات يدعم RTL باستخدام React وTypeScript مع FastAPI وPostgreSQL في الخلفية.",
  };
  return {
    answer: answers[locale],
    citations: ["experience-realeye", "project-little-llama"],
    demo: true,
  };
}

function AskXinWorkspace({ locale, expanded = false }: { locale: Locale; expanded?: boolean }) {
  const text = copy[locale];
  const [mode, setMode] = useState<Mode>("explore");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event?: FormEvent) {
    event?.preventDefault();
    const value = question.trim();
    if (value.length < 3 || loading) return;
    setLoading(true);
    try {
      const response = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: value, mode, locale, website: "" }),
      });
      const payload = (await response.json()) as Answer & { error?: string };
      if (!response.ok) throw new Error(payload.error || "Unavailable");
      setAnswer(payload);
    } catch {
      setAnswer(demoAnswer(locale, mode));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={expanded ? "ask-xin-workspace is-expanded" : "ask-xin-workspace"}>
      <div className="ask-xin-tabs" role="tablist" aria-label="Ask Xin mode">
        <button className={mode === "explore" ? "is-active" : ""} onClick={() => setMode("explore")} type="button">
          {text.explore}
        </button>
        <button className={mode === "role-match" ? "is-active" : ""} onClick={() => setMode("role-match")} type="button">
          {text.role}
        </button>
      </div>

      <div className="ask-xin-suggestions">
        {(text.suggestions as string[]).map((suggestion) => (
          <button key={suggestion} type="button" onClick={() => setQuestion(suggestion)}>
            {suggestion}
          </button>
        ))}
      </div>

      <form className="ask-xin-form" onSubmit={submit}>
        <label htmlFor={expanded ? "ask-xin-full" : "ask-xin-home"} className="sr-only">
          {mode === "role-match" ? text.rolePlaceholder : text.placeholder}
        </label>
        <textarea
          id={expanded ? "ask-xin-full" : "ask-xin-home"}
          maxLength={800}
          value={question}
          rows={expanded ? 6 : 3}
          placeholder={mode === "role-match" ? text.rolePlaceholder : text.placeholder}
          onChange={(event) => setQuestion(event.target.value)}
        />
        <div className="ask-xin-form-footer">
          <span>{question.length}/800</span>
          <button className="button button-primary" disabled={question.trim().length < 3 || loading} type="submit">
            {loading ? <span className="ask-xin-loader" aria-label="Loading" /> : <Send size={15} />}
            {text.submit}
          </button>
        </div>
      </form>

      <p className="ask-xin-privacy"><ShieldCheck size={14} />{text.privacy}</p>

      <div className="ask-xin-answer" aria-live="polite">
        {answer ? (
          <>
            <div className="ask-xin-answer-meta">
              <Sparkles size={16} />
              <span>{answer.demo ? text.demo : text.live}</span>
            </div>
            <p>{answer.answer}</p>
            <div className="ask-xin-citations">
              <small>{text.sources}</small>
              {answer.citations.flatMap((id) => {
                const citation = citationMap[id as CitationId];
                return citation ? [<a href={citation.href} key={id}>{citation.label}<ExternalLink size={12} /></a>] : [];
              })}
            </div>
          </>
        ) : (
          <div className="ask-xin-empty"><Sparkles size={22} /><span>{text.suggestions[0]}</span></div>
        )}
      </div>
    </div>
  );
}

export function AskXinSection({ locale, embedded = false }: { locale: Locale; embedded?: boolean }) {
  const text = copy[locale];
  return (
    <section className={embedded ? "ask-xin-section ask-xin-embedded" : "ask-xin-section section-shell"} id="ask-xin">
      <div className="ask-xin-intro">
        <p className="eyebrow">AI / {text.eyebrow}</p>
        <h2>{text.title}</h2>
        <p>{text.body}</p>
        <a className="ask-xin-full-link" href="/ask-xin">{text.full}<ArrowRight size={15} /></a>
      </div>
      <AskXinWorkspace locale={locale} />
    </section>
  );
}

export function AskXinPage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <main className="ask-xin-page section-shell">
      <a className="ask-xin-back" href="/"><ArrowLeft size={15} />{text.back}</a>
      <header>
        <p className="eyebrow">AI / {text.eyebrow}</p>
        <h1>{text.title}</h1>
        <p>{text.body}</p>
      </header>
      <AskXinWorkspace locale={locale} expanded />
    </main>
  );
}
