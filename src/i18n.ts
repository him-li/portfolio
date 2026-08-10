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
    home: "Index",
    experience: "Experience",
    work: "Work",
    education: "Education",
    profile: "Profile",
    contact: "Contact",
  },
  hero: {
    titleBefore: "Interfaces with",
    titleAccent: "clarity",
    titleAfter: "and depth.",
    description:
      "I build thoughtful digital products where engineering rigor meets expressive interaction—fast, accessible, and made for people.",
    primary: "Explore selected work",
    secondary: "Download résumé",
    orbitLabel: "Abstract orbital identity graphic",
    current: "Currently exploring",
    currentValue: "Spatial interaction systems",
  },
  facts: [
    ["Role", "Frontend Engineering"],
    ["Focus", "Design Systems"],
    ["Mode", "Remote · Hybrid"],
    ["Status", "Available to connect"],
  ],
  sections: {
    workKicker: "Selected practice",
    workTitle: "Work with a point of view.",
    workBody:
      "Case studies will live here: the problem, the decisions, the system, and the measurable outcome.",
    profileKicker: "Profile",
    profileTitle: "Engineering that respects the medium.",
    profileBody:
      "A concise timeline of experience, education, capabilities, and the values behind the work.",
    contactKicker: "Contact",
    contactTitle: "Let’s make something useful.",
    contactBody:
      "Open to product engineering roles, thoughtful collaborations, and ambitious interface work.",
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
      profile: "简介",
      contact: "联系",
    },
    hero: {
      titleBefore: "打造兼具",
      titleAccent: "清晰",
      titleAfter: "与深度的界面。",
      description:
        "我打造经过深思熟虑的数字产品，让严谨的工程与富有表现力的交互相遇——快速、无障碍，并始终以人为本。",
      primary: "浏览精选作品",
      secondary: "下载简历",
      orbitLabel: "抽象轨道个人标识图形",
      current: "正在探索",
      currentValue: "空间交互系统",
    },
    facts: [
      ["职位", "前端工程"],
      ["专注", "设计系统"],
      ["模式", "远程 · 混合"],
      ["状态", "欢迎联系"],
    ],
    sections: {
      workKicker: "精选实践",
      workTitle: "有观点的作品。",
      workBody: "这里将展示完整案例：问题、决策、系统与可衡量的结果。",
      profileKicker: "个人简介",
      profileTitle: "尊重媒介的工程实践。",
      profileBody: "用简洁的时间线呈现经历、教育、能力以及作品背后的价值观。",
      contactKicker: "联系",
      contactTitle: "一起做些真正有用的东西。",
      contactBody: "期待产品工程岗位、富有思考的合作，以及有雄心的界面项目。",
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
      profile: "簡介",
      contact: "聯絡",
    },
    hero: {
      titleBefore: "打造兼具",
      titleAccent: "清晰",
      titleAfter: "與深度的介面。",
      description:
        "我打造經過深思熟慮的數位產品，讓嚴謹的工程與富有表現力的互動相遇——快速、無障礙，並始終以人爲本。",
      primary: "瀏覽精選作品",
      secondary: "下載履歷",
      orbitLabel: "抽象軌道個人識別圖形",
      current: "正在探索",
      currentValue: "空間互動系統",
    },
    facts: [
      ["職位", "前端工程"],
      ["專注", "設計系統"],
      ["模式", "遠端 · 混合"],
      ["狀態", "歡迎聯絡"],
    ],
    sections: {
      workKicker: "精選實踐",
      workTitle: "有觀點的作品。",
      workBody: "這裡將展示完整案例：問題、決策、系統與可衡量的成果。",
      profileKicker: "個人簡介",
      profileTitle: "尊重媒介的工程實踐。",
      profileBody: "以簡潔的時間線呈現經歷、教育、能力，以及作品背後的價值觀。",
      contactKicker: "聯絡",
      contactTitle: "一起做些真正有用的東西。",
      contactBody: "期待產品工程職位、富有思考的合作，以及有企圖心的介面專案。",
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
      profile: "פרופיל",
      contact: "יצירת קשר",
    },
    hero: {
      titleBefore: "ממשקים עם",
      titleAccent: "בהירות",
      titleAfter: "ועומק.",
      description:
        "אני בונה מוצרים דיגיטליים מוקפדים שבהם הנדסה מדויקת פוגשת אינטראקציה עשירה — מהירים, נגישים ונוצרו עבור אנשים.",
      primary: "לעבודות נבחרות",
      secondary: "הורדת קורות חיים",
      orbitLabel: "גרפיקת זהות מסלולית מופשטת",
      current: "כעת בחקירה",
      currentValue: "מערכות אינטראקציה מרחביות",
    },
    facts: [
      ["תפקיד", "הנדסת פרונטאנד"],
      ["מיקוד", "מערכות עיצוב"],
      ["אופן עבודה", "מרחוק · היברידי"],
      ["סטטוס", "פתוח להצעות"],
    ],
    sections: {
      workKicker: "עבודות נבחרות",
      workTitle: "עבודה עם נקודת מבט.",
      workBody: "כאן יוצגו מקרי בוחן: הבעיה, ההחלטות, המערכת והתוצאה המדידה.",
      profileKicker: "פרופיל",
      profileTitle: "הנדסה שמכבדת את המדיום.",
      profileBody:
        "ציר זמן תמציתי של ניסיון, השכלה, יכולות והערכים שמאחורי העבודה.",
      contactKicker: "יצירת קשר",
      contactTitle: "בואו ניצור משהו שימושי.",
      contactBody:
        "פתוח לתפקידי הנדסת מוצר, שיתופי פעולה איכותיים ועבודת ממשק שאפתנית.",
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
      profile: "الملف",
      contact: "تواصل",
    },
    hero: {
      titleBefore: "واجهات تجمع",
      titleAccent: "الوضوح",
      titleAfter: "والعمق.",
      description:
        "أبني منتجات رقمية مدروسة تلتقي فيها الدقة الهندسية بالتفاعل التعبيري — سريعة، متاحة للجميع، ومصممة للناس.",
      primary: "استكشف أعمالاً مختارة",
      secondary: "تنزيل السيرة الذاتية",
      orbitLabel: "رسم تجريدي للهوية المدارية",
      current: "أستكشف حالياً",
      currentValue: "أنظمة التفاعل المكاني",
    },
    facts: [
      ["الدور", "هندسة الواجهات"],
      ["التركيز", "أنظمة التصميم"],
      ["النمط", "عن بُعد · هجين"],
      ["الحالة", "متاح للتواصل"],
    ],
    sections: {
      workKicker: "ممارسات مختارة",
      workTitle: "عمل بوجهة نظر.",
      workBody:
        "ستُعرض هنا دراسات الحالة: المشكلة، والقرارات، والنظام، والنتيجة القابلة للقياس.",
      profileKicker: "الملف",
      profileTitle: "هندسة تحترم الوسيط.",
      profileBody:
        "مسار موجز للخبرة والتعليم والقدرات والقيم التي تقف خلف العمل.",
      contactKicker: "تواصل",
      contactTitle: "لنصنع شيئاً مفيداً.",
      contactBody:
        "منفتح على أدوار هندسة المنتجات والتعاون المدروس وأعمال الواجهات الطموحة.",
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
