/**
 * All website copy lives here, one object per language.
 * Base English copy = copywriting v2 (docs/copy/copywriting-v2-en.md),
 * expanded with supporting sections (scenarios, deliverables, FAQ, ...).
 * Edit text here; components only read from it.
 */

export const languages = {
  en: 'English',
  id: 'Bahasa Indonesia',
} as const;

export type Lang = keyof typeof languages;

export const CONTACT_EMAIL = 'contact@securecore.id';

/** Every page of the site, in menu order. */
export const PAGES = ['home', 'about', 'services', 'approach', 'principles', 'contact'] as const;
export type PageKey = (typeof PAGES)[number];

/** URL for a page in a language, e.g. ('id', 'services') → '/id/services/'. */
export function pagePath(lang: Lang, page: PageKey): string {
  const slug = page === 'home' ? '' : `${page}/`;
  return lang === 'en' ? `/${slug}` : `/${lang}/${slug}`;
}

export function mailto(subject: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

type Meta = { title: string; description: string };
export type Feature = { icon: string; title: string; text: string };

const en = {
  meta: {
    ogLocale: 'en_US',
    pages: {
      home: {
        title: 'SecureCore — Independent Security Research & Digital Protection',
        description:
          'Independent cybersecurity researchers helping organizations identify vulnerabilities, understand real-world risks, and strengthen their digital security.',
      },
      about: {
        title: 'About SecureCore — Independent Cybersecurity Research Team',
        description:
          'SecureCore is an independent cybersecurity research team focused on identifying vulnerabilities, evaluating digital security, and conducting hands-on technical research.',
      },
      services: {
        title: 'Services — Vulnerability Assessment, Penetration Testing & More | SecureCore',
        description:
          'Vulnerability assessment, penetration testing, web & API security review, infrastructure & cloud review, security research & advisory, and remediation support.',
      },
      approach: {
        title: 'Our Approach — How a SecureCore Engagement Works',
        description:
          'A clear, structured process: scope & authorization, discovery & testing, validation & analysis, reporting, and remediation & retesting.',
      },
      principles: {
        title: 'Our Principles — Authorized, Confidential, Responsible | SecureCore',
        description:
          'Authorized only, confidential by default, responsible disclosure, and evidence over fear: the principles behind every SecureCore engagement.',
      },
      contact: {
        title: 'Contact SecureCore — Start a Security Conversation',
        description:
          'Talk to SecureCore about security assessments, penetration testing, or technical research collaboration. Email contact@securecore.id.',
      },
    } satisfies Record<PageKey, Meta>,
  },
  a11y: {
    skip: 'Skip to content',
    home: 'SecureCore home',
    menu: 'Menu',
    primaryNav: 'Primary',
    footerNav: 'Footer',
    langSwitch: 'Baca dalam Bahasa Indonesia',
  },
  nav: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    approach: 'Approach',
    principles: 'Principles',
    contact: 'Contact',
  } satisfies Record<PageKey, string>,
  navCta: 'Get in Touch',
  langShort: 'ID',
  learnMore: 'Learn more',

  /* ------------------------------------------------------------ HOME */

  hero: {
    eyebrow: 'Independent Security Research & Cybersecurity Consultancy',
    title: 'We help you find the weaknesses before someone else does.',
    lead: [
      'Independent cybersecurity researchers helping organizations identify vulnerabilities, understand real-world risks, and strengthen their digital security.',
      'We go beyond automated scans to deliver meaningful security insights, validated findings, and practical recommendations.',
    ],
    primaryCta: 'Request an Assessment',
    secondaryCta: 'Explore Our Services',
    mailSubject: 'Security assessment request',
    tags: ['Authorized Testing Only', 'Confidential by Default', 'Independent & Vendor-Neutral'],
  },

  report: {
    heading: 'Security Assessment Report',
    label: 'Illustrative Report Excerpt',
    file: 'assessment-report.txt',
    overviewTitle: 'Assessment Overview',
    rows: [
      { k: 'Scope', v: 'Web Application · API · Cloud Configuration' },
      { k: 'Methodology', v: 'Manual Testing & Technical Validation' },
      { k: 'Status', v: 'Remediation In Progress' },
    ],
    severityTitle: 'Findings by Severity',
    severities: [
      { key: 'critical', label: 'Critical', count: 1 },
      { key: 'high', label: 'High', count: 3 },
      { key: 'medium', label: 'Medium', count: 6 },
      { key: 'low', label: 'Low', count: 9 },
    ],
    disclaimer: 'Illustrative data for demonstration purposes only.',
    logTitle: 'Live assessment log',
    log: [
      '$ assess --scope web,api,cloud',
      '› mapping attack surface … 42 endpoints',
      '› validating findings … 19 confirmed',
      '› generating report … done ✓',
    ],
  },

  intro: {
    kicker: 'Who We Are',
    title: 'An independent security research team, working on your side.',
    body: 'SecureCore helps organizations see their systems the way an attacker would, then explains what really matters and how to fix it. We combine hands-on technical research with clear, practical reporting, so your security decisions are based on evidence, not guesswork.',
    link: 'More about SecureCore',
    pillarsIntro: 'At SecureCore, we emphasize three things:',
    pillars: [
      {
        icon: 'scale',
        title: 'Independent Perspective',
        text: 'An independent approach to security assessment, free from vendor-driven recommendations and unnecessary product dependencies.',
      },
      {
        icon: 'scan',
        title: 'Technical Depth',
        text: 'Hands-on investigation and technical validation to distinguish meaningful security risks from noise.',
      },
      {
        icon: 'check',
        title: 'Actionable Outcomes',
        text: 'Clear findings, practical recommendations, and prioritized remediation guidance that help your team take the next step with confidence.',
      },
    ] as Feature[],
  },

  scenarios: {
    kicker: 'When to Bring Us In',
    title: 'Common reasons organizations reach out.',
    lead: 'Security reviews are most valuable at specific moments. These are some of the situations where an independent assessment helps most.',
    items: [
      {
        icon: 'rocket',
        title: 'Launching a new application or major feature',
        text: 'Find and fix weaknesses before real users, and real attackers, interact with it.',
      },
      {
        icon: 'clipboard',
        title: 'Facing a client, partner, or audit requirement',
        text: 'Get an independent assessment and a clear report you can use to demonstrate security due diligence.',
      },
      {
        icon: 'cloud',
        title: 'Moving infrastructure to the cloud',
        text: 'Check that new configurations, access controls, and exposed services are set up securely.',
      },
      {
        icon: 'eye',
        title: 'Needing an independent second opinion',
        text: 'Validate existing security assumptions with a fresh, vendor-neutral perspective.',
      },
      {
        icon: 'branch',
        title: 'After significant system changes',
        text: 'Re-assess areas affected by new integrations, architecture changes, or third-party components.',
      },
      {
        icon: 'refresh',
        title: 'Confirming that fixes actually work',
        text: 'Retest previously reported issues to verify they have been properly resolved.',
      },
    ] as Feature[],
  },

  process: {
    kicker: 'How We Work',
    title: 'From first conversation to verified fix.',
    lead: 'A structured, transparent process, so you always know what we are testing and what happens next.',
    steps: [
      { title: 'Scope & Authorization', text: 'Agree on targets, boundaries, and timing in writing.' },
      { title: 'Discovery & Testing', text: 'Map the attack surface and test within scope.' },
      { title: 'Validation & Analysis', text: 'Verify every finding and rate its real impact.' },
      { title: 'Reporting', text: 'Deliver evidence, impact, and prioritized fixes.' },
      { title: 'Remediation & Retesting', text: 'Support your fixes and confirm they work.' },
    ],
    reportNote:
      'Every engagement ends with a structured report: an executive summary, validated findings with evidence, risk ratings, and prioritized remediation guidance.',
    cta: 'See Our Full Approach',
  },

  deliverables: {
    kicker: 'What You Receive',
    title: 'A report your whole team can act on.',
    lead: 'Our reports are written for two audiences: decision-makers who need the big picture, and engineers who need the details to fix things.',
    docTitle: 'Report contents',
    items: [
      { title: 'Executive Summary', text: 'A clear overview of overall risk, key findings, and priorities for leadership.' },
      { title: 'Technical Findings', text: 'Each issue documented with evidence, affected assets, and steps to reproduce.' },
      { title: 'Risk Rating', text: 'Severity based on real-world impact and likelihood in your environment.' },
      { title: 'Remediation Guidance', text: 'Practical, prioritized recommendations your team can act on.' },
      { title: 'Retest Verification', text: 'Confirmation of which issues have been resolved, where retesting is included.' },
    ],
  },

  /* ----------------------------------------------------------- ABOUT */

  about: {
    kicker: 'About SecureCore',
    title: 'Independent by design. Research-driven by nature.',
    body: [
      'SecureCore is an independent cybersecurity research team focused on identifying vulnerabilities, evaluating digital security, and conducting hands-on technical research.',
      'We help organizations understand where their systems are exposed, what those weaknesses mean in practice, and how to address them effectively.',
      'Our approach combines technical investigation, independent analysis, and practical security recommendations to help organizations make better-informed security decisions.',
    ],
    mission: {
      title: 'Our Mission',
      text: 'To help organizations find and understand their security weaknesses before they can be exploited, through independent research and honest, practical guidance.',
    },
    belief: {
      title: 'What We Believe',
      text: 'Good security starts with an accurate picture. Not every vulnerability is a crisis, and not every risk is visible to a scanner. Our role is to separate what matters from what doesn’t, and explain it clearly.',
    },
    apartKicker: 'Our Difference',
    apartTitle: 'What Sets Us Apart',
    points: [
      {
        icon: 'user',
        title: 'Researcher-Led',
        text: 'The researchers who assess your systems are directly involved in analyzing findings and preparing reports. This keeps technical context intact from discovery to delivery.',
      },
      {
        icon: 'scale',
        title: 'Vendor-Neutral',
        text: 'We do not resell security products. Our recommendations are based on your actual environment, security requirements, and identified risks.',
      },
      {
        icon: 'target',
        title: 'Real Risk, Not Noise',
        text: 'We prioritize technically validated findings based on their potential impact, rather than overwhelming organizations with unverified scanner output.',
      },
    ] as Feature[],
    focus: {
      kicker: 'Our Focus',
      title: 'Where we spend our research time.',
      items: [
        {
          icon: 'code',
          title: 'Web Applications & APIs',
          text: 'How modern applications handle identity, access, and data, and where that logic breaks.',
        },
        {
          icon: 'server',
          title: 'Infrastructure & Networks',
          text: 'Exposed services, network segmentation, and the configurations that hold them together.',
        },
        {
          icon: 'cloud',
          title: 'Cloud Environments',
          text: 'Identity, storage, and permission settings that are easy to get wrong at scale.',
        },
        {
          icon: 'flask',
          title: 'Emerging Threats',
          text: 'New attack techniques and vulnerability classes, and what they mean for real systems.',
        },
      ] as Feature[],
    },
    audience: {
      kicker: 'Who We Work With',
      title: 'Built for organizations that take security seriously.',
      lead: 'Every engagement is scoped individually, so we can work with teams of different sizes and levels of security maturity.',
      items: [
        { icon: 'rocket', title: 'Technology companies & startups', text: 'Teams building and shipping software that needs to be secure from day one.' },
        { icon: 'building', title: 'Businesses with customer-facing systems', text: 'Organizations whose applications handle customer accounts, payments, or personal data.' },
        { icon: 'clipboard', title: 'Organizations facing reviews or audits', text: 'Teams that need independent evidence of their security posture.' },
        { icon: 'eye', title: 'Security & IT teams', text: 'In-house teams that want an external, independent second opinion.' },
      ] as Feature[],
    },
  },

  /* -------------------------------------------------------- SERVICES */

  services: {
    kicker: 'What We Do',
    title: 'Security expertise focused on what matters.',
    lead: [
      'Every engagement is tailored to your systems, security objectives, and operational requirements.',
      'We focus on identifying weaknesses, understanding their impact, and providing clear guidance to strengthen your security posture.',
    ],
    jumpLabel: 'Jump to a service',
    scopeLabel: 'Typical scope',
    bestForLabel: 'Best for',
    items: [
      {
        id: 'vulnerability-assessment',
        icon: 'scan',
        title: 'Vulnerability Assessment',
        summary: 'Find and prioritize weaknesses across applications, networks, and exposed services.',
        text: [
          'Identify and evaluate security weaknesses across your applications, networks, and exposed services.',
          'We help organizations understand their vulnerability landscape, prioritize security risks, and establish clear remediation priorities.',
        ],
        scope: [
          'External and internal attack surface',
          'Web applications and exposed services',
          'Known vulnerabilities and outdated components',
          'Risk-based prioritization of findings',
        ],
        bestFor: 'Organizations that want a broad, prioritized view of their security weaknesses.',
      },
      {
        id: 'penetration-testing',
        icon: 'target',
        title: 'Penetration Testing',
        summary: 'Authorized attack simulations that show what an attacker could actually achieve.',
        text: [
          'Evaluate your security defenses through authorized, controlled simulations of real-world attack techniques.',
          'Our assessments help demonstrate how identified weaknesses could be exploited and what their potential impact may be.',
        ],
        scope: [
          'Agreed rules of engagement and scope',
          'Manual exploitation of identified weaknesses',
          'Attack chains and potential impact',
          'Evidence of what an attacker could reach',
        ],
        bestFor: 'Teams that need to know how far a real attacker could get.',
      },
      {
        id: 'web-api-security',
        icon: 'code',
        title: 'Web & API Security Review',
        summary: 'Deep testing of authentication, access control, business logic, and data handling.',
        text: [
          'Assess the security of web applications and APIs, focusing on critical areas such as authentication, access control, business logic, and data handling.',
          'We investigate weaknesses that may expose sensitive information, compromise user accounts, or affect application integrity.',
        ],
        scope: [
          'Authentication and session management',
          'Authorization and access control',
          'Business logic and workflow abuse',
          'Input handling and data exposure',
        ],
        bestFor: 'Products and platforms that handle user accounts or sensitive data.',
      },
      {
        id: 'infrastructure-cloud',
        icon: 'server',
        title: 'Infrastructure & Cloud Review',
        summary: 'Find misconfigurations and exposure in servers, networks, and cloud environments.',
        text: [
          'Evaluate server, network, and cloud configurations to identify security gaps and potential exposure.',
          'We help organizations understand configuration risks, strengthen security controls, and improve the resilience of their digital infrastructure.',
        ],
        scope: [
          'Server and service hardening',
          'Network exposure and segmentation',
          'Cloud identity, storage, and permissions',
          'Logging and security controls',
        ],
        bestFor: 'Organizations running their own servers or moving workloads to the cloud.',
      },
      {
        id: 'security-research',
        icon: 'flask',
        title: 'Security Research & Advisory',
        summary: 'Independent technical research and guidance on complex security questions.',
        text: [
          'Conduct technical security research and provide independent security perspectives to help organizations better understand emerging threats and complex security challenges.',
          'We translate technical findings into practical insights that support informed security decisions.',
        ],
        scope: [
          'Technical deep dives on specific systems or technologies',
          'Threat and attack technique analysis',
          'Independent review of security decisions',
          'Findings translated into practical guidance',
        ],
        bestFor: 'Teams facing complex or unusual security questions.',
      },
      {
        id: 'remediation-retesting',
        icon: 'refresh',
        title: 'Remediation Support & Retesting',
        summary: 'Support during fixes, then retesting to confirm each issue is resolved.',
        text: [
          'Move beyond identifying vulnerabilities.',
          'We support remediation efforts and conduct follow-up testing to verify whether reported security issues have been properly addressed.',
        ],
        scope: [
          'Clarification of findings for your developers',
          'Guidance on remediation approaches',
          'Retesting of reported issues',
          'Updated status of each finding',
        ],
        bestFor: 'Teams that want confirmation their fixes actually work.',
      },
    ],
    includes: {
      title: 'Every engagement includes',
      items: [
        { icon: 'shieldCheck', title: 'Written authorization', text: 'A clearly defined scope, agreed and signed before testing.' },
        { icon: 'lock', title: 'Confidentiality', text: 'Findings handled confidentially, with an NDA available.' },
        { icon: 'search', title: 'Validated findings', text: 'Every reported issue manually verified, with evidence.' },
        { icon: 'file', title: 'Structured report', text: 'Written for both technical teams and management.' },
      ] as Feature[],
    },
    notSure: {
      title: 'Not sure which service you need?',
      text: 'Tell us about your systems and what you want to achieve. We will help you choose the right type of assessment and define a sensible scope.',
    },
    cta: 'Discuss Your Security Requirements',
    teaserCta: 'Explore Our Services',
  },

  /* -------------------------------------------------------- APPROACH */

  approach: {
    kicker: 'How We Work',
    title: 'A clear process. Meaningful results.',
    lead: [
      'Every engagement follows a structured process designed to maintain transparency, technical accuracy, and responsible security practices.',
      'You always know what we are testing, why it matters, and what happens next.',
    ],
    stepsKicker: 'The Process',
    stepsTitle: 'Five steps, from scope to verified fix.',
    steps: [
      {
        title: 'Scope & Authorization',
        text: 'We establish assessment objectives, target assets, testing boundaries, and timelines. All testing begins only after explicit written authorization.',
      },
      {
        title: 'Discovery & Testing',
        text: 'We identify the relevant attack surface and conduct security testing within the agreed scope using appropriate technical methods.',
      },
      {
        title: 'Validation & Analysis',
        text: 'Every reported finding is technically validated and assessed based on its severity, potential impact, and relevance to your environment.',
      },
      {
        title: 'Reporting',
        text: 'We deliver structured reports for both technical teams and decision-makers, including evidence, impact analysis, risk classification, and prioritized remediation recommendations.',
      },
      {
        title: 'Remediation & Retesting',
        text: 'We support your remediation efforts and conduct retesting, where included in the engagement, to verify that identified issues have been addressed.',
      },
    ],
    needs: {
      kicker: 'Before We Start',
      title: 'What we need from you.',
      lead: 'A good engagement starts with clear preparation. Here is what we will ask for before testing begins.',
      items: [
        { icon: 'layers', title: 'A defined scope', text: 'The systems, applications, or environments to assess, and anything that is out of scope.' },
        { icon: 'shieldCheck', title: 'Written authorization', text: 'Formal permission from the system owner before any testing begins.' },
        { icon: 'user', title: 'A point of contact', text: 'Someone on your side we can reach quickly during the engagement.' },
        { icon: 'key', title: 'Testing window & access', text: 'Agreed timing, plus test accounts or access where needed, shared through a secure channel.' },
      ] as Feature[],
    },
    during: {
      kicker: 'During the Engagement',
      title: 'What you can expect from us.',
      items: [
        {
          icon: 'alert',
          title: 'Critical issues reported promptly',
          text: 'If we identify a critical issue during testing, we notify your designated contact right away instead of waiting for the final report.',
        },
        {
          icon: 'shieldCheck',
          title: 'Controlled, careful testing',
          text: 'We test within the agreed scope and take care to avoid disrupting your operations.',
        },
        {
          icon: 'chat',
          title: 'Open communication',
          text: 'You can ask about our progress and methods at any time during the engagement.',
        },
      ] as Feature[],
    },
  },

  /* ------------------------------------------------------ PRINCIPLES */

  principles: {
    kicker: 'Our Commitment',
    title: 'Trust is built into everything we do.',
    lead: [
      'Security research requires technical capability, professional responsibility, and respect for the systems and organizations involved.',
      'These principles guide every SecureCore engagement.',
    ],
    practiceLabel: 'In practice',
    items: [
      {
        icon: 'shieldCheck',
        title: 'Authorized Only',
        text: 'We never conduct security testing without explicit written permission and a clearly agreed scope.',
        practice: [
          'Signed authorization before testing begins',
          'Clearly documented scope and boundaries',
          'Testing stops at the edge of the agreed scope',
        ],
      },
      {
        icon: 'lock',
        title: 'Confidential by Default',
        text: 'Your systems, assessment findings, and sensitive information are treated confidentially. We are prepared to work under a Non-Disclosure Agreement (NDA) where required.',
        practice: [
          'Findings shared only with authorized contacts',
          'Sensitive data handled through secure channels',
          'NDA available on request',
        ],
      },
      {
        icon: 'mail',
        title: 'Responsible Disclosure',
        text: 'When independent research identifies vulnerabilities in third-party systems, we follow responsible reporting and coordinated disclosure practices.',
        practice: [
          'Private notification to the affected party',
          'Reasonable time to fix before any publication',
          'Coordination with vendors where relevant',
        ],
      },
      {
        icon: 'eye',
        title: 'Evidence Over Fear',
        text: 'We do not rely on scare tactics or exaggerated claims. We present validated evidence, explain the actual risks, and provide practical recommendations.',
        practice: [
          'Severity based on real impact, not headlines',
          'Clear explanation of what each finding means',
          'Practical recommendations, not fear',
        ],
      },
    ],
    report: {
      kicker: 'We Practice What We Preach',
      title: 'Found a security issue affecting SecureCore?',
      text: 'If you believe you have found a vulnerability in our own systems, please report it privately to us. Give us reasonable time to investigate and address it before sharing any details publicly. We appreciate responsible reports.',
      cta: 'Report an Issue',
      mailSubject: 'Security issue report',
    },
  },

  /* --------------------------------------------------------- CONTACT */

  contact: {
    kicker: 'Start a Conversation',
    title: 'Let’s talk about your security.',
    lead: [
      'Whether you are evaluating your security posture, planning a penetration test, or exploring a technical research collaboration, we would be glad to hear from you.',
      'Tell us about your organization and the systems you would like to assess. Our team will get in touch to discuss your requirements and potential engagement scope.',
    ],
    cta: 'Get in Touch',
    emailLabel: 'Email',
    mailSubject: 'Security inquiry',
    notice:
      'For your security, please do not include passwords, access credentials, or sensitive vulnerability details in your initial email. We can arrange an appropriate secure communication channel when necessary.',
    form: {
      title: 'Send us a message',
      lead: 'Tell us a little about your needs. We will review your message and follow up by email.',
      name: 'Full name',
      namePh: 'e.g. Jane Doe',
      email: 'Work email',
      emailPh: 'name@company.com',
      organization: 'Organization / company',
      organizationPh: 'Company name',
      services: 'Services of interest',
      servicesHint: 'Choose one or more.',
      notSure: 'Not sure yet, I need advice',
      message: 'Tell us about your needs',
      messagePh: 'What systems are involved, and what would you like to achieve?',
      messageHint: 'Please do not include passwords, credentials, or vulnerability details.',
      submit: 'Send Message',
      sending: 'Sending…',
      privacy: 'Your information is used only to respond to this request.',
      required: 'Required',
      servicesError: 'Please choose at least one service.',
      success: {
        title: 'Message received',
        body: 'Thank you, {name}. Your message has been delivered securely to the SecureCore team. We will review it and get back to you at {email}.',
      },
      error: {
        title: 'Message not sent',
        body: 'Something went wrong while sending your message. Please try again in a moment, or email us directly at contact@securecore.id.',
      },
      rateLimited: 'You have sent several messages recently. Please try again later, or email us directly at contact@securecore.id.',
      sentPlain: 'Message received. Thank you, your message has been delivered securely to the SecureCore team. We will get back to you by email.',
      close: 'Close',
      orEmail: 'Prefer email?',
      orEmailText: 'You can also write to us directly.',
    },
    include: {
      title: 'What to include in your message',
      items: [
        'Your organization and your role',
        'The systems or applications you want assessed',
        'What prompted the request (a launch, an audit, a concern)',
        'Your preferred timeline',
      ],
    },
    next: {
      kicker: 'What Happens Next',
      title: 'From your first email to a clear plan.',
      steps: [
        { title: 'We review your message', text: 'We read your request and may ask a few clarifying questions.' },
        { title: 'Scoping discussion', text: 'We discuss your goals, systems, and constraints to define a sensible scope.' },
        { title: 'Proposal & authorization', text: 'You receive a proposed scope and approach. Testing starts only after written authorization.' },
      ],
    },
    faq: {
      kicker: 'FAQ',
      title: 'Frequently asked questions.',
      items: [
        {
          q: 'Do you test systems without permission?',
          a: 'No. We only test systems with explicit written authorization from the system owner and a clearly agreed scope.',
        },
        {
          q: 'Can you sign a Non-Disclosure Agreement (NDA)?',
          a: 'Yes. We treat every engagement as confidential by default and are prepared to work under an NDA where required.',
        },
        {
          q: 'How long does an assessment take?',
          a: 'It depends on the scope and complexity of the systems involved. We will give you an estimated timeline once the scope is agreed.',
        },
        {
          q: 'Do you offer retesting after fixes?',
          a: 'Yes. Retesting can be included in the engagement to verify that reported issues have been properly addressed.',
        },
        {
          q: 'Do you work with smaller organizations?',
          a: 'Yes. Every engagement is scoped individually, so we can work with teams of different sizes and levels of security maturity.',
        },
        {
          q: 'Which languages do you work in?',
          a: 'We communicate and deliver reports in English and Bahasa Indonesia.',
        },
      ],
    },
  },

  /* ---------------------------------------------------------- FOOTER */

  footer: {
    lines: ['Independent Security Research & Digital Protection.', 'Independent Research. Professional Security.'],
    navTitle: 'Navigation',
    servicesTitle: 'Services',
    companyTitle: 'Company',
    contactTitle: 'Contact',
    contactText: 'Have a security question or a system you want assessed? We would be glad to hear from you.',
    languageLabel: 'Language',
    backToTop: 'Back to top',
    securityTitle: 'Security',
    securityText: 'Responsible security research. Authorized testing. Confidential engagements.',
    rights: 'All rights reserved.',
  },

  notFound: {
    title: 'Page not found',
    text: 'The page you are looking for does not exist or has been moved.',
    back: 'Back to home',
  },
};

export type Content = typeof en;

const id: Content = {
  meta: {
    ogLocale: 'id_ID',
    pages: {
      home: {
        title: 'SecureCore — Riset Keamanan Independen & Perlindungan Digital',
        description:
          'Peneliti keamanan siber independen yang membantu organisasi mengidentifikasi kerentanan, memahami risiko nyata, dan memperkuat keamanan digital mereka.',
      },
      about: {
        title: 'Tentang SecureCore — Tim Riset Keamanan Siber Independen',
        description:
          'SecureCore adalah tim riset keamanan siber independen yang berfokus pada identifikasi kerentanan, evaluasi keamanan digital, dan penelitian teknis secara langsung.',
      },
      services: {
        title: 'Layanan — Vulnerability Assessment, Penetration Testing & Lainnya | SecureCore',
        description:
          'Vulnerability assessment, penetration testing, review keamanan web & API, review infrastruktur & cloud, riset & konsultasi keamanan, serta pendampingan perbaikan.',
      },
      approach: {
        title: 'Pendekatan Kami — Cara Kerja SecureCore',
        description:
          'Proses yang jelas dan terstruktur: cakupan & otorisasi, penemuan & pengujian, validasi & analisis, pelaporan, serta perbaikan & pengujian ulang.',
      },
      principles: {
        title: 'Prinsip Kami — Berizin, Rahasia, Bertanggung Jawab | SecureCore',
        description:
          'Hanya dengan otorisasi, rahasia sejak awal, responsible disclosure, serta bukti di atas rasa takut: prinsip di balik setiap pekerjaan SecureCore.',
      },
      contact: {
        title: 'Hubungi SecureCore — Mulai Percakapan Keamanan',
        description:
          'Diskusikan asesmen keamanan, penetration testing, atau kolaborasi riset teknis dengan SecureCore. Email contact@securecore.id.',
      },
    },
  },
  a11y: {
    skip: 'Langsung ke konten',
    home: 'Beranda SecureCore',
    menu: 'Menu',
    primaryNav: 'Navigasi utama',
    footerNav: 'Navigasi footer',
    langSwitch: 'Read in English',
  },
  nav: {
    home: 'Beranda',
    about: 'Tentang',
    services: 'Layanan',
    approach: 'Pendekatan',
    principles: 'Prinsip',
    contact: 'Kontak',
  },
  navCta: 'Hubungi Kami',
  langShort: 'EN',
  learnMore: 'Selengkapnya',

  /* ------------------------------------------------------------ HOME */

  hero: {
    eyebrow: 'Riset Keamanan Independen & Konsultansi Keamanan Siber',
    title: 'Kami membantu Anda menemukan celah sebelum orang lain menemukannya.',
    lead: [
      'Peneliti keamanan siber independen yang membantu organisasi mengidentifikasi kerentanan, memahami risiko nyata, dan memperkuat keamanan digital mereka.',
      'Kami melampaui pemindaian otomatis untuk menghadirkan wawasan keamanan yang bermakna, temuan yang tervalidasi, dan rekomendasi yang praktis.',
    ],
    primaryCta: 'Ajukan Asesmen',
    secondaryCta: 'Jelajahi Layanan Kami',
    mailSubject: 'Permintaan asesmen keamanan',
    tags: ['Hanya Pengujian Berizin', 'Rahasia Sejak Awal', 'Independen & Netral Vendor'],
  },

  report: {
    heading: 'Laporan Asesmen Keamanan',
    label: 'Contoh Cuplikan Laporan',
    file: 'laporan-asesmen.txt',
    overviewTitle: 'Ringkasan Asesmen',
    rows: [
      { k: 'Cakupan', v: 'Aplikasi Web · API · Konfigurasi Cloud' },
      { k: 'Metodologi', v: 'Pengujian Manual & Validasi Teknis' },
      { k: 'Status', v: 'Perbaikan Sedang Berjalan' },
    ],
    severityTitle: 'Temuan Berdasarkan Tingkat Risiko',
    severities: [
      { key: 'critical', label: 'Kritis', count: 1 },
      { key: 'high', label: 'Tinggi', count: 3 },
      { key: 'medium', label: 'Sedang', count: 6 },
      { key: 'low', label: 'Rendah', count: 9 },
    ],
    disclaimer: 'Data ilustrasi, hanya untuk keperluan demonstrasi.',
    logTitle: 'Log asesmen',
    log: [
      '$ asesmen --cakupan web,api,cloud',
      '› memetakan permukaan serangan … 42 endpoint',
      '› memvalidasi temuan … 19 terkonfirmasi',
      '› menyusun laporan … selesai ✓',
    ],
  },

  intro: {
    kicker: 'Siapa Kami',
    title: 'Tim riset keamanan independen yang berada di pihak Anda.',
    body: 'SecureCore membantu organisasi melihat sistem mereka dari sudut pandang penyerang, lalu menjelaskan apa yang benar-benar penting dan bagaimana memperbaikinya. Kami memadukan riset teknis langsung dengan pelaporan yang jelas dan praktis, sehingga keputusan keamanan Anda didasarkan pada bukti, bukan dugaan.',
    link: 'Selengkapnya tentang SecureCore',
    pillarsIntro: 'Di SecureCore, kami menekankan tiga hal:',
    pillars: [
      {
        icon: 'scale',
        title: 'Perspektif Independen',
        text: 'Pendekatan asesmen keamanan yang independen, bebas dari rekomendasi yang digerakkan vendor dan ketergantungan produk yang tidak perlu.',
      },
      {
        icon: 'scan',
        title: 'Kedalaman Teknis',
        text: 'Investigasi langsung dan validasi teknis untuk membedakan risiko keamanan yang berarti dari sekadar kebisingan.',
      },
      {
        icon: 'check',
        title: 'Hasil yang Dapat Ditindaklanjuti',
        text: 'Temuan yang jelas, rekomendasi praktis, dan panduan perbaikan yang terprioritaskan agar tim Anda dapat melangkah dengan yakin.',
      },
    ],
  },

  scenarios: {
    kicker: 'Kapan Melibatkan Kami',
    title: 'Alasan umum organisasi menghubungi kami.',
    lead: 'Review keamanan paling bernilai pada momen-momen tertentu. Berikut beberapa situasi ketika asesmen independen paling membantu.',
    items: [
      {
        icon: 'rocket',
        title: 'Meluncurkan aplikasi atau fitur besar baru',
        text: 'Temukan dan perbaiki kelemahan sebelum pengguna, dan penyerang, berinteraksi dengannya.',
      },
      {
        icon: 'clipboard',
        title: 'Menghadapi persyaratan klien, mitra, atau audit',
        text: 'Dapatkan asesmen independen dan laporan yang jelas untuk menunjukkan uji tuntas keamanan Anda.',
      },
      {
        icon: 'cloud',
        title: 'Memindahkan infrastruktur ke cloud',
        text: 'Pastikan konfigurasi baru, kontrol akses, dan layanan yang terekspos sudah diatur dengan aman.',
      },
      {
        icon: 'eye',
        title: 'Membutuhkan opini kedua yang independen',
        text: 'Uji kembali asumsi keamanan yang ada dengan perspektif baru yang netral vendor.',
      },
      {
        icon: 'branch',
        title: 'Setelah perubahan sistem yang signifikan',
        text: 'Nilai ulang area yang terdampak integrasi baru, perubahan arsitektur, atau komponen pihak ketiga.',
      },
      {
        icon: 'refresh',
        title: 'Memastikan perbaikan benar-benar berhasil',
        text: 'Uji ulang masalah yang pernah dilaporkan untuk memverifikasi bahwa semuanya sudah tertangani.',
      },
    ],
  },

  process: {
    kicker: 'Cara Kami Bekerja',
    title: 'Dari percakapan pertama hingga perbaikan yang terverifikasi.',
    lead: 'Proses yang terstruktur dan transparan, sehingga Anda selalu tahu apa yang kami uji dan apa langkah berikutnya.',
    steps: [
      { title: 'Cakupan & Otorisasi', text: 'Sepakati target, batasan, dan jadwal secara tertulis.' },
      { title: 'Penemuan & Pengujian', text: 'Petakan permukaan serangan dan uji sesuai cakupan.' },
      { title: 'Validasi & Analisis', text: 'Verifikasi setiap temuan dan nilai dampak nyatanya.' },
      { title: 'Pelaporan', text: 'Serahkan bukti, dampak, dan prioritas perbaikan.' },
      { title: 'Perbaikan & Pengujian Ulang', text: 'Dampingi perbaikan dan pastikan hasilnya berhasil.' },
    ],
    reportNote:
      'Setiap pekerjaan diakhiri dengan laporan terstruktur: ringkasan eksekutif, temuan tervalidasi beserta bukti, penilaian risiko, dan panduan perbaikan yang terprioritaskan.',
    cta: 'Lihat Pendekatan Lengkap',
  },

  deliverables: {
    kicker: 'Yang Anda Terima',
    title: 'Laporan yang bisa ditindaklanjuti seluruh tim Anda.',
    lead: 'Laporan kami ditulis untuk dua pembaca: pengambil keputusan yang membutuhkan gambaran besar, dan tim teknis yang membutuhkan detail untuk memperbaiki.',
    docTitle: 'Isi laporan',
    items: [
      { title: 'Ringkasan Eksekutif', text: 'Gambaran jelas tentang risiko keseluruhan, temuan utama, dan prioritas untuk manajemen.' },
      { title: 'Temuan Teknis', text: 'Setiap masalah didokumentasikan dengan bukti, aset yang terdampak, dan langkah reproduksi.' },
      { title: 'Penilaian Risiko', text: 'Tingkat keparahan berdasarkan dampak dan kemungkinan nyata di lingkungan Anda.' },
      { title: 'Panduan Perbaikan', text: 'Rekomendasi praktis dan terprioritaskan yang dapat langsung dijalankan tim Anda.' },
      { title: 'Verifikasi Retest', text: 'Konfirmasi masalah mana yang sudah tertangani, bila pengujian ulang termasuk dalam pekerjaan.' },
    ],
  },

  /* ----------------------------------------------------------- ABOUT */

  about: {
    kicker: 'Tentang SecureCore',
    title: 'Independen sejak awal. Digerakkan oleh riset.',
    body: [
      'SecureCore adalah tim riset keamanan siber independen yang berfokus pada identifikasi kerentanan, evaluasi keamanan digital, dan penelitian teknis secara langsung.',
      'Kami membantu organisasi memahami di mana sistem mereka terekspos, apa arti kelemahan tersebut dalam praktik, dan bagaimana menanganinya secara efektif.',
      'Pendekatan kami memadukan investigasi teknis, analisis independen, dan rekomendasi keamanan yang praktis untuk membantu organisasi mengambil keputusan keamanan yang lebih tepat.',
    ],
    mission: {
      title: 'Misi Kami',
      text: 'Membantu organisasi menemukan dan memahami kelemahan keamanan mereka sebelum dapat dieksploitasi, melalui riset independen serta panduan yang jujur dan praktis.',
    },
    belief: {
      title: 'Yang Kami Yakini',
      text: 'Keamanan yang baik dimulai dari gambaran yang akurat. Tidak setiap kerentanan adalah krisis, dan tidak setiap risiko terlihat oleh scanner. Peran kami adalah memisahkan yang penting dari yang tidak, lalu menjelaskannya dengan jelas.',
    },
    apartKicker: 'Pembeda Kami',
    apartTitle: 'Apa yang Membedakan Kami',
    points: [
      {
        icon: 'user',
        title: 'Dipimpin Peneliti',
        text: 'Peneliti yang menguji sistem Anda terlibat langsung dalam menganalisis temuan dan menyusun laporan. Konteks teknis tetap utuh dari tahap penemuan hingga penyerahan laporan.',
      },
      {
        icon: 'scale',
        title: 'Netral Vendor',
        text: 'Kami tidak menjual kembali produk keamanan. Rekomendasi kami didasarkan pada kondisi lingkungan Anda yang sebenarnya, kebutuhan keamanan, dan risiko yang teridentifikasi.',
      },
      {
        icon: 'target',
        title: 'Risiko Nyata, Bukan Kebisingan',
        text: 'Kami memprioritaskan temuan yang telah tervalidasi secara teknis berdasarkan potensi dampaknya, bukan membanjiri organisasi dengan hasil scanner yang belum diverifikasi.',
      },
    ],
    focus: {
      kicker: 'Fokus Kami',
      title: 'Area yang menjadi fokus riset kami.',
      items: [
        {
          icon: 'code',
          title: 'Aplikasi Web & API',
          text: 'Bagaimana aplikasi modern menangani identitas, akses, dan data, serta di mana logikanya bisa gagal.',
        },
        {
          icon: 'server',
          title: 'Infrastruktur & Jaringan',
          text: 'Layanan yang terekspos, segmentasi jaringan, dan konfigurasi yang menopangnya.',
        },
        {
          icon: 'cloud',
          title: 'Lingkungan Cloud',
          text: 'Pengaturan identitas, penyimpanan, dan izin yang mudah keliru dalam skala besar.',
        },
        {
          icon: 'flask',
          title: 'Ancaman Baru',
          text: 'Teknik serangan dan jenis kerentanan baru, serta artinya bagi sistem nyata.',
        },
      ],
    },
    audience: {
      kicker: 'Dengan Siapa Kami Bekerja',
      title: 'Untuk organisasi yang serius soal keamanan.',
      lead: 'Setiap pekerjaan dirancang secara individual, sehingga kami dapat bekerja dengan tim dari berbagai ukuran dan tingkat kematangan keamanan.',
      items: [
        { icon: 'rocket', title: 'Perusahaan teknologi & startup', text: 'Tim yang membangun dan merilis perangkat lunak yang harus aman sejak hari pertama.' },
        { icon: 'building', title: 'Bisnis dengan sistem yang digunakan pelanggan', text: 'Organisasi yang aplikasinya mengelola akun pelanggan, pembayaran, atau data pribadi.' },
        { icon: 'clipboard', title: 'Organisasi yang menghadapi review atau audit', text: 'Tim yang membutuhkan bukti independen atas postur keamanannya.' },
        { icon: 'eye', title: 'Tim keamanan & IT', text: 'Tim internal yang menginginkan opini kedua yang independen dari pihak luar.' },
      ],
    },
  },

  /* -------------------------------------------------------- SERVICES */

  services: {
    kicker: 'Layanan Kami',
    title: 'Keahlian keamanan yang berfokus pada hal yang penting.',
    lead: [
      'Setiap pekerjaan disesuaikan dengan sistem, sasaran keamanan, dan kebutuhan operasional Anda.',
      'Kami berfokus mengidentifikasi kelemahan, memahami dampaknya, dan memberikan panduan yang jelas untuk memperkuat postur keamanan Anda.',
    ],
    jumpLabel: 'Langsung ke layanan',
    scopeLabel: 'Cakupan umum',
    bestForLabel: 'Paling cocok untuk',
    items: [
      {
        id: 'vulnerability-assessment',
        icon: 'scan',
        title: 'Vulnerability Assessment',
        summary: 'Temukan dan prioritaskan kelemahan pada aplikasi, jaringan, dan layanan yang terekspos.',
        text: [
          'Identifikasi dan evaluasi kelemahan keamanan pada aplikasi, jaringan, dan layanan Anda yang terekspos.',
          'Kami membantu organisasi memahami lanskap kerentanan mereka, memprioritaskan risiko keamanan, dan menetapkan prioritas perbaikan yang jelas.',
        ],
        scope: [
          'Permukaan serangan eksternal dan internal',
          'Aplikasi web dan layanan yang terekspos',
          'Kerentanan yang diketahui dan komponen usang',
          'Prioritas temuan berbasis risiko',
        ],
        bestFor: 'Organisasi yang menginginkan gambaran luas dan terprioritaskan atas kelemahan keamanannya.',
      },
      {
        id: 'penetration-testing',
        icon: 'target',
        title: 'Penetration Testing',
        summary: 'Simulasi serangan berizin yang menunjukkan apa yang benar-benar bisa dicapai penyerang.',
        text: [
          'Evaluasi pertahanan keamanan Anda melalui simulasi teknik serangan dunia nyata yang berizin dan terkendali.',
          'Asesmen kami menunjukkan bagaimana kelemahan yang teridentifikasi dapat dieksploitasi dan seberapa besar potensi dampaknya.',
        ],
        scope: [
          'Rules of engagement dan cakupan yang disepakati',
          'Eksploitasi manual atas kelemahan yang ditemukan',
          'Rangkaian serangan dan potensi dampaknya',
          'Bukti apa saja yang dapat dijangkau penyerang',
        ],
        bestFor: 'Tim yang perlu tahu seberapa jauh penyerang sungguhan dapat masuk.',
      },
      {
        id: 'web-api-security',
        icon: 'code',
        title: 'Review Keamanan Web & API',
        summary: 'Pengujian mendalam atas autentikasi, kontrol akses, logika bisnis, dan pengelolaan data.',
        text: [
          'Menilai keamanan aplikasi web dan API, dengan fokus pada area kritis seperti autentikasi, kontrol akses, logika bisnis, dan pengelolaan data.',
          'Kami menyelidiki kelemahan yang dapat membocorkan informasi sensitif, membahayakan akun pengguna, atau memengaruhi integritas aplikasi.',
        ],
        scope: [
          'Autentikasi dan manajemen sesi',
          'Otorisasi dan kontrol akses',
          'Logika bisnis dan penyalahgunaan alur kerja',
          'Penanganan input dan kebocoran data',
        ],
        bestFor: 'Produk dan platform yang mengelola akun pengguna atau data sensitif.',
      },
      {
        id: 'infrastructure-cloud',
        icon: 'server',
        title: 'Review Infrastruktur & Cloud',
        summary: 'Temukan kesalahan konfigurasi dan eksposur pada server, jaringan, dan lingkungan cloud.',
        text: [
          'Mengevaluasi konfigurasi server, jaringan, dan cloud untuk menemukan celah keamanan dan potensi eksposur.',
          'Kami membantu organisasi memahami risiko konfigurasi, memperkuat kontrol keamanan, dan meningkatkan ketahanan infrastruktur digital mereka.',
        ],
        scope: [
          'Hardening server dan layanan',
          'Eksposur dan segmentasi jaringan',
          'Identitas, penyimpanan, dan izin di cloud',
          'Logging dan kontrol keamanan',
        ],
        bestFor: 'Organisasi yang mengelola server sendiri atau memindahkan beban kerja ke cloud.',
      },
      {
        id: 'security-research',
        icon: 'flask',
        title: 'Riset & Konsultasi Keamanan',
        summary: 'Riset teknis independen dan panduan untuk persoalan keamanan yang kompleks.',
        text: [
          'Melakukan riset keamanan teknis dan memberikan perspektif keamanan yang independen untuk membantu organisasi memahami ancaman baru dan tantangan keamanan yang kompleks.',
          'Kami menerjemahkan temuan teknis menjadi wawasan praktis yang mendukung pengambilan keputusan keamanan yang tepat.',
        ],
        scope: [
          'Kajian teknis mendalam atas sistem atau teknologi tertentu',
          'Analisis ancaman dan teknik serangan',
          'Tinjauan independen atas keputusan keamanan',
          'Temuan yang diterjemahkan menjadi panduan praktis',
        ],
        bestFor: 'Tim yang menghadapi persoalan keamanan yang kompleks atau tidak biasa.',
      },
      {
        id: 'remediation-retesting',
        icon: 'refresh',
        title: 'Pendampingan Perbaikan & Pengujian Ulang',
        summary: 'Pendampingan selama perbaikan, lalu pengujian ulang untuk memastikan setiap masalah tuntas.',
        text: [
          'Tidak berhenti pada menemukan kerentanan.',
          'Kami mendampingi upaya perbaikan dan melakukan pengujian lanjutan untuk memastikan masalah keamanan yang dilaporkan telah ditangani dengan benar.',
        ],
        scope: [
          'Penjelasan temuan untuk tim developer Anda',
          'Panduan pendekatan perbaikan',
          'Pengujian ulang atas masalah yang dilaporkan',
          'Status terbaru setiap temuan',
        ],
        bestFor: 'Tim yang ingin memastikan perbaikannya benar-benar berhasil.',
      },
    ],
    includes: {
      title: 'Setiap pekerjaan mencakup',
      items: [
        { icon: 'shieldCheck', title: 'Otorisasi tertulis', text: 'Cakupan yang jelas, disepakati dan ditandatangani sebelum pengujian.' },
        { icon: 'lock', title: 'Kerahasiaan', text: 'Temuan ditangani secara rahasia, dengan NDA bila diperlukan.' },
        { icon: 'search', title: 'Temuan tervalidasi', text: 'Setiap masalah yang dilaporkan diverifikasi manual, lengkap dengan bukti.' },
        { icon: 'file', title: 'Laporan terstruktur', text: 'Ditulis untuk tim teknis maupun manajemen.' },
      ],
    },
    notSure: {
      title: 'Belum yakin layanan mana yang Anda butuhkan?',
      text: 'Ceritakan tentang sistem Anda dan apa yang ingin dicapai. Kami akan membantu memilih jenis asesmen yang tepat dan menentukan cakupan yang masuk akal.',
    },
    cta: 'Diskusikan Kebutuhan Keamanan Anda',
    teaserCta: 'Jelajahi Layanan Kami',
  },

  /* -------------------------------------------------------- APPROACH */

  approach: {
    kicker: 'Cara Kami Bekerja',
    title: 'Proses yang jelas. Hasil yang bermakna.',
    lead: [
      'Setiap pekerjaan mengikuti proses terstruktur yang dirancang untuk menjaga transparansi, akurasi teknis, dan praktik keamanan yang bertanggung jawab.',
      'Anda selalu tahu apa yang kami uji, mengapa hal itu penting, dan apa langkah selanjutnya.',
    ],
    stepsKicker: 'Prosesnya',
    stepsTitle: 'Lima langkah, dari cakupan hingga perbaikan terverifikasi.',
    steps: [
      {
        title: 'Cakupan & Otorisasi',
        text: 'Kami menetapkan tujuan asesmen, aset yang menjadi target, batasan pengujian, dan jadwal. Seluruh pengujian baru dimulai setelah ada otorisasi tertulis yang eksplisit.',
      },
      {
        title: 'Penemuan & Pengujian',
        text: 'Kami mengidentifikasi permukaan serangan yang relevan dan melakukan pengujian keamanan dalam cakupan yang disepakati menggunakan metode teknis yang sesuai.',
      },
      {
        title: 'Validasi & Analisis',
        text: 'Setiap temuan yang dilaporkan divalidasi secara teknis dan dinilai berdasarkan tingkat keparahan, potensi dampak, dan relevansinya dengan lingkungan Anda.',
      },
      {
        title: 'Pelaporan',
        text: 'Kami menyerahkan laporan terstruktur untuk tim teknis maupun pengambil keputusan, mencakup bukti, analisis dampak, klasifikasi risiko, dan rekomendasi perbaikan yang terprioritaskan.',
      },
      {
        title: 'Perbaikan & Pengujian Ulang',
        text: 'Kami mendampingi upaya perbaikan Anda dan melakukan pengujian ulang, bila termasuk dalam lingkup pekerjaan, untuk memastikan masalah yang teridentifikasi telah ditangani.',
      },
    ],
    needs: {
      kicker: 'Sebelum Memulai',
      title: 'Yang kami butuhkan dari Anda.',
      lead: 'Pekerjaan yang baik dimulai dari persiapan yang jelas. Berikut hal-hal yang akan kami minta sebelum pengujian dimulai.',
      items: [
        { icon: 'layers', title: 'Cakupan yang jelas', text: 'Sistem, aplikasi, atau lingkungan yang akan dinilai, serta apa saja yang berada di luar cakupan.' },
        { icon: 'shieldCheck', title: 'Otorisasi tertulis', text: 'Izin resmi dari pemilik sistem sebelum pengujian dimulai.' },
        { icon: 'user', title: 'Kontak yang dapat dihubungi', text: 'Perwakilan dari pihak Anda yang dapat kami hubungi dengan cepat selama pekerjaan berlangsung.' },
        { icon: 'key', title: 'Jadwal & akses pengujian', text: 'Waktu yang disepakati, serta akun uji atau akses bila diperlukan, dibagikan melalui saluran aman.' },
      ],
    },
    during: {
      kicker: 'Selama Pekerjaan Berlangsung',
      title: 'Yang dapat Anda harapkan dari kami.',
      items: [
        {
          icon: 'alert',
          title: 'Masalah kritis segera dilaporkan',
          text: 'Jika kami menemukan masalah kritis selama pengujian, kami segera memberi tahu kontak yang ditunjuk tanpa menunggu laporan akhir.',
        },
        {
          icon: 'shieldCheck',
          title: 'Pengujian yang terkendali dan hati-hati',
          text: 'Kami menguji sesuai cakupan yang disepakati dan berhati-hati agar tidak mengganggu operasional Anda.',
        },
        {
          icon: 'chat',
          title: 'Komunikasi terbuka',
          text: 'Anda dapat menanyakan progres dan metode kami kapan saja selama pekerjaan berlangsung.',
        },
      ],
    },
  },

  /* ------------------------------------------------------ PRINCIPLES */

  principles: {
    kicker: 'Komitmen Kami',
    title: 'Kepercayaan tertanam dalam semua yang kami lakukan.',
    lead: [
      'Riset keamanan membutuhkan kemampuan teknis, tanggung jawab profesional, dan penghormatan terhadap sistem serta organisasi yang terlibat.',
      'Prinsip-prinsip berikut menjadi pedoman dalam setiap pekerjaan SecureCore.',
    ],
    practiceLabel: 'Dalam praktik',
    items: [
      {
        icon: 'shieldCheck',
        title: 'Hanya dengan Otorisasi',
        text: 'Kami tidak pernah melakukan pengujian keamanan tanpa izin tertulis yang eksplisit dan cakupan yang disepakati dengan jelas.',
        practice: [
          'Otorisasi tertandatangan sebelum pengujian dimulai',
          'Cakupan dan batasan terdokumentasi dengan jelas',
          'Pengujian berhenti di batas cakupan yang disepakati',
        ],
      },
      {
        icon: 'lock',
        title: 'Rahasia Sejak Awal',
        text: 'Sistem, temuan asesmen, dan informasi sensitif Anda diperlakukan secara rahasia. Kami siap bekerja di bawah Perjanjian Kerahasiaan (NDA) bila diperlukan.',
        practice: [
          'Temuan hanya dibagikan kepada kontak yang berwenang',
          'Data sensitif ditangani melalui saluran aman',
          'NDA tersedia atas permintaan',
        ],
      },
      {
        icon: 'mail',
        title: 'Responsible Disclosure',
        text: 'Ketika riset independen kami menemukan kerentanan pada sistem pihak ketiga, kami mengikuti praktik pelaporan yang bertanggung jawab dan pengungkapan terkoordinasi.',
        practice: [
          'Pemberitahuan privat kepada pihak terdampak',
          'Waktu yang wajar untuk perbaikan sebelum publikasi',
          'Koordinasi dengan vendor bila relevan',
        ],
      },
      {
        icon: 'eye',
        title: 'Bukti di Atas Rasa Takut',
        text: 'Kami tidak mengandalkan taktik menakut-nakuti atau klaim berlebihan. Kami menyajikan bukti yang tervalidasi, menjelaskan risiko yang sebenarnya, dan memberikan rekomendasi yang praktis.',
        practice: [
          'Tingkat keparahan berdasarkan dampak nyata, bukan sensasi',
          'Penjelasan jelas tentang arti setiap temuan',
          'Rekomendasi praktis, bukan rasa takut',
        ],
      },
    ],
    report: {
      kicker: 'Kami Menerapkan yang Kami Sampaikan',
      title: 'Menemukan masalah keamanan pada sistem SecureCore?',
      text: 'Jika Anda menemukan kerentanan pada sistem kami sendiri, mohon laporkan secara privat kepada kami. Berikan waktu yang wajar untuk menyelidiki dan menanganinya sebelum membagikan detailnya secara publik. Kami menghargai setiap laporan yang bertanggung jawab.',
      cta: 'Laporkan Masalah',
      mailSubject: 'Laporan masalah keamanan',
    },
  },

  /* --------------------------------------------------------- CONTACT */

  contact: {
    kicker: 'Mulai Percakapan',
    title: 'Mari bicara tentang keamanan Anda.',
    lead: [
      'Baik Anda sedang mengevaluasi postur keamanan, merencanakan penetration test, atau menjajaki kolaborasi riset teknis, kami dengan senang hati mendengarnya.',
      'Ceritakan tentang organisasi Anda dan sistem yang ingin dinilai. Tim kami akan menghubungi Anda untuk membahas kebutuhan serta cakupan pekerjaan yang memungkinkan.',
    ],
    cta: 'Hubungi Kami',
    emailLabel: 'Email',
    mailSubject: 'Pertanyaan keamanan',
    notice:
      'Demi keamanan Anda, mohon jangan menyertakan kata sandi, kredensial akses, atau detail kerentanan yang sensitif pada email pertama. Kami dapat menyiapkan saluran komunikasi yang aman bila diperlukan.',
    form: {
      title: 'Kirim pesan kepada kami',
      lead: 'Ceritakan sedikit tentang kebutuhan Anda. Kami akan meninjau pesan Anda dan menindaklanjutinya melalui email.',
      name: 'Nama lengkap',
      namePh: 'contoh: Budi Santoso',
      email: 'Email kerja',
      emailPh: 'nama@perusahaan.com',
      organization: 'Nama organisasi / perusahaan',
      organizationPh: 'Nama perusahaan',
      services: 'Layanan yang diminati',
      servicesHint: 'Pilih satu atau lebih.',
      notSure: 'Belum yakin, butuh saran',
      message: 'Ceritakan kebutuhan Anda',
      messagePh: 'Sistem apa yang terlibat, dan apa yang ingin Anda capai?',
      messageHint: 'Mohon jangan sertakan kata sandi, kredensial, atau detail kerentanan.',
      submit: 'Kirim Pesan',
      sending: 'Mengirim…',
      privacy: 'Data Anda hanya digunakan untuk menanggapi permintaan ini.',
      required: 'Wajib',
      servicesError: 'Mohon pilih minimal satu layanan.',
      success: {
        title: 'Pesan diterima',
        body: 'Terima kasih, {name}. Pesan Anda telah terkirim dengan aman ke tim SecureCore. Kami akan meninjaunya dan menghubungi Anda melalui {email}.',
      },
      error: {
        title: 'Pesan belum terkirim',
        body: 'Terjadi kendala saat mengirim pesan Anda. Silakan coba lagi sebentar lagi, atau kirim email langsung ke contact@securecore.id.',
      },
      rateLimited: 'Anda telah mengirim beberapa pesan dalam waktu singkat. Silakan coba lagi nanti, atau kirim email langsung ke contact@securecore.id.',
      sentPlain: 'Pesan diterima. Terima kasih, pesan Anda telah terkirim dengan aman ke tim SecureCore. Kami akan menghubungi Anda melalui email.',
      close: 'Tutup',
      orEmail: 'Lebih suka email?',
      orEmailText: 'Anda juga dapat menghubungi kami langsung.',
    },
    include: {
      title: 'Yang sebaiknya Anda sertakan',
      items: [
        'Nama organisasi dan peran Anda',
        'Sistem atau aplikasi yang ingin dinilai',
        'Alasan permintaan (peluncuran, audit, atau kekhawatiran tertentu)',
        'Perkiraan jadwal yang Anda inginkan',
      ],
    },
    next: {
      kicker: 'Langkah Selanjutnya',
      title: 'Dari email pertama hingga rencana yang jelas.',
      steps: [
        { title: 'Kami meninjau pesan Anda', text: 'Kami membaca permintaan Anda dan mungkin mengajukan beberapa pertanyaan klarifikasi.' },
        { title: 'Diskusi cakupan', text: 'Kami membahas tujuan, sistem, dan batasan Anda untuk menentukan cakupan yang masuk akal.' },
        { title: 'Proposal & otorisasi', text: 'Anda menerima usulan cakupan dan pendekatan. Pengujian baru dimulai setelah ada otorisasi tertulis.' },
      ],
    },
    faq: {
      kicker: 'FAQ',
      title: 'Pertanyaan yang sering diajukan.',
      items: [
        {
          q: 'Apakah Anda menguji sistem tanpa izin?',
          a: 'Tidak. Kami hanya menguji sistem dengan otorisasi tertulis yang eksplisit dari pemilik sistem dan cakupan yang disepakati dengan jelas.',
        },
        {
          q: 'Apakah Anda bersedia menandatangani Perjanjian Kerahasiaan (NDA)?',
          a: 'Ya. Kami memperlakukan setiap pekerjaan sebagai rahasia sejak awal dan siap bekerja di bawah NDA bila diperlukan.',
        },
        {
          q: 'Berapa lama sebuah asesmen berlangsung?',
          a: 'Tergantung pada cakupan dan kompleksitas sistem yang dinilai. Kami akan memberikan estimasi jadwal setelah cakupan disepakati.',
        },
        {
          q: 'Apakah tersedia pengujian ulang setelah perbaikan?',
          a: 'Ya. Pengujian ulang dapat dimasukkan dalam pekerjaan untuk memastikan masalah yang dilaporkan telah ditangani dengan benar.',
        },
        {
          q: 'Apakah Anda bekerja dengan organisasi berskala kecil?',
          a: 'Ya. Setiap pekerjaan dirancang secara individual, sehingga kami dapat bekerja dengan tim dari berbagai ukuran dan tingkat kematangan keamanan.',
        },
        {
          q: 'Dalam bahasa apa Anda bekerja?',
          a: 'Kami berkomunikasi dan menyerahkan laporan dalam Bahasa Indonesia dan bahasa Inggris.',
        },
      ],
    },
  },

  /* ---------------------------------------------------------- FOOTER */

  footer: {
    lines: ['Riset Keamanan Independen & Perlindungan Digital.', 'Independent Research. Professional Security.'],
    navTitle: 'Navigasi',
    servicesTitle: 'Layanan',
    companyTitle: 'Perusahaan',
    contactTitle: 'Kontak',
    contactText: 'Punya pertanyaan keamanan atau sistem yang ingin dinilai? Kami dengan senang hati mendengarnya.',
    languageLabel: 'Bahasa',
    backToTop: 'Kembali ke atas',
    securityTitle: 'Keamanan',
    securityText: 'Riset keamanan yang bertanggung jawab. Pengujian berizin. Pekerjaan yang terjaga kerahasiaannya.',
    rights: 'Hak cipta dilindungi.',
  },

  notFound: {
    title: 'Halaman tidak ditemukan',
    text: 'Halaman yang Anda cari tidak ada atau sudah dipindahkan.',
    back: 'Kembali ke beranda',
  },
};

export const content: Record<Lang, Content> = { en, id };
