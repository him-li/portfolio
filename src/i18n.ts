export const locales = ["en", "zh-CN", "zh-TW", "he", "ar"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  he: "עברית",
  ar: "العربية",
};

export const rtlLocales = new Set<Locale>(["he", "ar"]);

const en = {
  nav: {
    name: "Xin Li",
    home: "Home",
    experience: "Experience",
    work: "Work",
    education: "Education",
    profile: "Skills",
    contact: "Contact",
  },
  hero: {
    titleBefore: "Useful products,",
    titleAccent: "thoughtfully",
    titleAfter: "built.",
    description:
      "I turn ideas into clear, dependable digital products—bringing together solid engineering, considerate design, and a genuine focus on the people using them.",
    primary: "See what I’ve built",
    secondary: "Download résumé",
    orbitLabel: "Abstract orbital identity graphic",
    current: "Currently exploring",
    currentValue: "Practical AI for better products",
  },
  facts: [
    ["Role", "Frontend Engineering"],
    ["Focus", "Product UI & full-stack systems"],
    ["Mode", "Remote · Hybrid"],
    ["Status", "Open to good conversations"],
  ],
  sections: {
    workKicker: "Selected work",
    workTitle: "A few things I’m proud to share.",
    workBody:
      "Case studies will live here: the problem, the decisions, the system, and the measurable outcome.",
    profileKicker: "Profile",
    profileTitle: "What I work with—and how I got here.",
    profileBody:
      "A concise timeline of experience, education, capabilities, and the values behind the work.",
    contactKicker: "Contact",
    contactTitle: "Let’s build something good.",
    contactBody:
      "I’m always happy to talk about product engineering, thoughtful collaboration, or an interesting idea worth building.",
  },
  common: {
    menu: "Open menu",
    close: "Close menu",
    theme: "Change color theme",
    language: "Change language",
    scroll: "Scroll to explore",
  },
};

export type Messages = typeof en;

export const messages: Record<Locale, Messages> = {
  en,
  "zh-CN": {
    nav: {
      name: "李鑫",
      home: "首页",
      experience: "经历",
      work: "作品",
      education: "教育",
      profile: "技能",
      contact: "联系",
    },
    hero: {
      titleBefore: "把好用的产品，",
      titleAccent: "认真",
      titleAfter: "做好。",
      description:
        "我把想法变成清晰、可靠的数字产品，在扎实工程、友好设计和真实用户需求之间找到平衡。",
      primary: "看看我的作品",
      secondary: "下载简历",
      orbitLabel: "抽象轨道个人标识图形",
      current: "正在探索",
      currentValue: "让 AI 真正帮产品解决问题",
    },
    facts: [
      ["职位", "前端工程"],
      ["专注", "产品界面与全栈系统"],
      ["模式", "远程 · 混合"],
      ["状态", "欢迎聊聊"],
    ],
    sections: {
      workKicker: "精选作品",
      workTitle: "一些我很乐意分享的作品。",
      workBody: "这里将展示完整案例：问题、决策、系统与可衡量的结果。",
      profileKicker: "个人简介",
      profileTitle: "我使用的工具，以及一路走来的积累。",
      profileBody: "用简洁的时间线呈现经历、教育、能力以及作品背后的价值观。",
      contactKicker: "联系",
      contactTitle: "一起做点好东西。",
      contactBody: "无论是产品工程、认真靠谱的合作，还是一个值得实现的想法，都欢迎来聊聊。",
    },
    common: {
      menu: "打开菜单",
      close: "关闭菜单",
      theme: "切换颜色主题",
      language: "切换语言",
      scroll: "向下探索",
    },
  },
  "zh-TW": {
    nav: {
      name: "李鑫",
      home: "首頁",
      experience: "經歷",
      work: "作品",
      education: "教育",
      profile: "技能",
      contact: "聯絡",
    },
    hero: {
      titleBefore: "把好用的產品，",
      titleAccent: "認真",
      titleAfter: "做好。",
      description:
        "我把想法變成清楚、可靠的數位產品，在扎實工程、友善設計與真實使用需求之間找到平衡。",
      primary: "看看我的作品",
      secondary: "下載履歷",
      orbitLabel: "抽象軌道個人識別圖形",
      current: "正在探索",
      currentValue: "讓 AI 真正幫產品解決問題",
    },
    facts: [
      ["職位", "前端工程"],
      ["專注", "產品介面與全端系統"],
      ["模式", "遠端 · 混合"],
      ["狀態", "歡迎聊聊"],
    ],
    sections: {
      workKicker: "精選作品",
      workTitle: "一些我很樂意分享的作品。",
      workBody: "這裡將展示完整案例：問題、決策、系統與可衡量的成果。",
      profileKicker: "個人簡介",
      profileTitle: "我使用的工具，以及一路走來的累積。",
      profileBody: "以簡潔的時間線呈現經歷、教育、能力，以及作品背後的價值觀。",
      contactKicker: "聯絡",
      contactTitle: "一起做點好東西。",
      contactBody: "無論是產品工程、認真可靠的合作，或是一個值得實現的想法，都歡迎來聊聊。",
    },
    common: {
      menu: "開啟選單",
      close: "關閉選單",
      theme: "切換顏色主題",
      language: "切換語言",
      scroll: "向下探索",
    },
  },
  he: {
    nav: {
      name: "שין לי",
      home: "ראשי",
      experience: "ניסיון",
      work: "עבודות",
      education: "השכלה",
      profile: "כלים",
      contact: "יצירת קשר",
    },
    hero: {
      titleBefore: "מוצרים שימושיים,",
      titleAccent: "עם מחשבה",
      titleAfter: "בכל פרט.",
      description:
        "אני הופך רעיונות למוצרים דיגיטליים ברורים ואמינים, עם הנדסה חזקה, עיצוב קשוב ומחשבה אמיתית על האנשים שמשתמשים בהם.",
      primary: "לפרויקטים שבניתי",
      secondary: "הורדת קורות חיים",
      orbitLabel: "גרפיקת זהות מסלולית מופשטת",
      current: "כעת בחקירה",
      currentValue: "AI שימושי למוצרים טובים יותר",
    },
    facts: [
      ["תפקיד", "הנדסת פרונטאנד"],
      ["מיקוד", "ממשקי מוצר ומערכות full-stack"],
      ["אופן עבודה", "מרחוק · היברידי"],
      ["סטטוס", "תמיד שמח להכיר ולדבר"],
    ],
    sections: {
      workKicker: "פרויקטים נבחרים",
      workTitle: "כמה דברים שאני שמח לשתף.",
      workBody: "כאן יוצגו מקרי בוחן: הבעיה, ההחלטות, המערכת והתוצאה המדידה.",
      profileKicker: "פרופיל",
      profileTitle: "הכלים שלי והדרך שהובילה אותי לכאן.",
      profileBody:
        "ציר זמן תמציתי של ניסיון, השכלה, יכולות והערכים שמאחורי העבודה.",
      contactKicker: "יצירת קשר",
      contactTitle: "בואו נבנה משהו טוב.",
      contactBody:
        "אשמח לדבר על הנדסת מוצר, שיתוף פעולה טוב או רעיון מעניין ששווה להפוך למציאות.",
    },
    common: {
      menu: "פתיחת תפריט",
      close: "סגירת תפריט",
      theme: "החלפת ערכת צבעים",
      language: "החלפת שפה",
      scroll: "גלילה להמשך",
    },
  },
  ar: {
    nav: {
      name: "إدريس شين لي",
      home: "الرئيسية",
      experience: "الخبرة",
      work: "الأعمال",
      education: "التعليم",
      profile: "المهارات",
      contact: "تواصل",
    },
    hero: {
      titleBefore: "منتجات مفيدة،",
      titleAccent: "مصممة بعناية",
      titleAfter: "للناس.",
      description:
        "أحوّل الأفكار إلى منتجات رقمية واضحة وموثوقة، تجمع بين هندسة متينة وتصميم مريح واهتمام حقيقي بمن يستخدمها.",
      primary: "شاهد ما بنيته",
      secondary: "تنزيل السيرة الذاتية",
      orbitLabel: "رسم تجريدي للهوية المدارية",
      current: "أستكشف حالياً",
      currentValue: "ذكاء اصطناعي عملي لمنتجات أفضل",
    },
    facts: [
      ["الدور", "هندسة الواجهات"],
      ["التركيز", "واجهات المنتجات والأنظمة المتكاملة"],
      ["النمط", "عن بُعد · هجين"],
      ["الحالة", "يسعدني دائماً أن نتحدث"],
    ],
    sections: {
      workKicker: "أعمال مختارة",
      workTitle: "بعض المشاريع التي يسعدني مشاركتها.",
      workBody:
        "ستُعرض هنا دراسات الحالة: المشكلة، والقرارات، والنظام، والنتيجة القابلة للقياس.",
      profileKicker: "الملف",
      profileTitle: "أدواتي والطريق الذي أوصلني إلى هنا.",
      profileBody:
        "مسار موجز للخبرة والتعليم والقدرات والقيم التي تقف خلف العمل.",
      contactKicker: "تواصل",
      contactTitle: "لنبنِ شيئاً جيداً.",
      contactBody:
        "يسعدني الحديث عن هندسة المنتجات أو تعاون جيد أو فكرة تستحق أن تتحول إلى واقع.",
    },
    common: {
      menu: "فتح القائمة",
      close: "إغلاق القائمة",
      theme: "تغيير سمة الألوان",
      language: "تغيير اللغة",
      scroll: "مرر للاستكشاف",
    },
  },
};
