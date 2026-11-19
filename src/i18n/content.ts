/**
 * All page copy lives here, one object per language.
 * Edit the text here; components only read from it.
 */

export const languages = {
  en: 'English',
  id: 'Bahasa Indonesia',
} as const;

export type Lang = keyof typeof languages;

export const CONTACT_EMAIL = 'contact@securecore.id';

const en = {
  meta: {
    title: 'SecureCore — Independent Security Research & Digital Protection',
    description:
      'Independent security researchers helping organizations identify vulnerabilities, understand real risks, and strengthen their digital security.',
    ogLocale: 'en_US',
  },
  a11y: {
    skip: 'Skip to content',
    home: 'SecureCore home',
    menu: 'Menu',
    primaryNav: 'Primary',
    langSwitch: 'Baca dalam Bahasa Indonesia',
  },
  nav: [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#approach', label: 'Approach' },
    { href: '#principles', label: 'Principles' },
    { href: '#contact', label: 'Contact' },
  ],
  navCta: 'Get in touch',
  langShort: 'ID',
  hero: {
    eyebrow: 'Independent Security Research & Digital Protection',
    title: 'We help you find the weaknesses before someone else does.',
    lead: 'Independent security researchers helping organizations identify vulnerabilities, understand real risks, and strengthen their digital security.',
    primaryCta: 'Request an assessment',
    secondaryCta: 'Explore services',
    mailSubject: 'Security assessment inquiry',
    tags: ['Authorized testing only', 'Confidential by default', 'Vendor-neutral'],
  },
  report: {
    label: 'Example report excerpt',
    file: 'assessment-summary.txt',
    rows: [
      { k: 'scope', v: 'web app · api · cloud config' },
      { k: 'method', v: 'manual testing + validation' },
      { k: 'status', v: 'remediation in progress' },
    ],
    severityTitle: 'Findings by severity',
    severities: [
      { key: 'critical', label: 'Critical', count: 1 },
      { key: 'high', label: 'High', count: 3 },
      { key: 'medium', label: 'Medium', count: 6 },
      { key: 'low', label: 'Low', count: 9 },
    ],
    note: 'Every finding comes with evidence, impact, and a clear fix.',
  },
  about: {
    kicker: 'About',
    title: 'Independent by design.',
    body: [
      'SecureCore is a team of independent cybersecurity researchers. We focus on identifying vulnerabilities, evaluating the security of digital systems, and doing hands-on technical research.',
      'Our job is to help organizations understand where they are exposed, how much it actually matters, and what to do about it, so they can strengthen their digital infrastructure with confidence.',
    ],
    points: [
      {
        title: 'Researcher-led',
        text: 'The people who test your systems are the people who write the report. No hand-offs, no lost context.',
      },
      {
        title: 'Vendor-neutral',
        text: 'We do not resell security products. Our recommendations are based only on what your environment needs.',
      },
      {
        title: 'Real risk, not noise',
        text: 'Findings are manually validated and ranked by real-world impact, not copied from a scanner.',
      },
    ],
  },
  services: {
    kicker: 'Services',
    title: 'What we can help with.',
    lead: 'Engagements are scoped to your systems, your risks, and your timeline.',
    items: [
      {
        icon: 'scan',
        title: 'Vulnerability Assessment',
        text: 'Systematic identification of security weaknesses across your applications, networks, and exposed services.',
      },
      {
        icon: 'target',
        title: 'Penetration Testing',
        text: 'Authorized, scoped simulation of real-world attacks to show what an attacker could actually reach.',
      },
      {
        icon: 'code',
        title: 'Web & API Security Review',
        text: 'In-depth testing of authentication, access control, business logic, and data handling in your web apps and APIs.',
      },
      {
        icon: 'server',
        title: 'Infrastructure & Cloud Review',
        text: 'Review of server, network, and cloud configurations to close misconfigurations before they are exploited.',
      },
      {
        icon: 'flask',
        title: 'Security Research & Advisory',
        text: 'Technical research and practical guidance to help your team understand threats and make better security decisions.',
      },
      {
        icon: 'refresh',
        title: 'Remediation Support & Retest',
        text: 'We help your team fix what we found, then retest to confirm each issue is truly resolved.',
      },
    ],
  },
  approach: {
    kicker: 'Approach',
    title: 'A clear, repeatable process.',
    lead: 'You always know what we are testing, why, and what happens next.',
    steps: [
      {
        title: 'Scope & authorization',
        text: 'We agree on targets, boundaries, and timing in writing before any testing begins.',
      },
      {
        title: 'Discovery & testing',
        text: 'We map your attack surface and test it the way a motivated attacker would.',
      },
      {
        title: 'Validation & analysis',
        text: 'Every finding is verified by hand and rated by its real impact on your business.',
      },
      {
        title: 'Reporting',
        text: 'A clear report for both leadership and engineers: evidence, impact, and prioritized fixes.',
      },
      {
        title: 'Remediation & retest',
        text: 'We support your fixes and retest to confirm the risk is closed.',
      },
    ],
  },
  principles: {
    kicker: 'Principles',
    title: 'How we work.',
    items: [
      {
        title: 'Authorized only',
        text: 'We never test anything without explicit written permission and an agreed scope.',
      },
      {
        title: 'Confidential',
        text: 'Your findings stay between us and you. We are happy to work under an NDA.',
      },
      {
        title: 'Responsible disclosure',
        text: 'When our research uncovers issues in third-party systems, we report them privately and responsibly.',
      },
      {
        title: 'Evidence over fear',
        text: 'No scare tactics. We show you what is real, how serious it is, and how to fix it.',
      },
    ],
  },
  contact: {
    kicker: 'Contact',
    title: 'Let’s talk about your security.',
    lead: 'Tell us briefly about your organization and the systems you want reviewed. We will get back to you to discuss scope.',
    emailLabel: 'Email us at',
    cta: 'Send an email',
    mailSubject: 'Security assessment inquiry',
    note: 'Please do not send credentials or sensitive vulnerability details in your first email. We will arrange a secure channel when needed.',
  },
  footer: {
    tagline: 'Your Safety, Our Mission',
    legal: 'All security testing is performed only with explicit written authorization from the system owner.',
    securityTxt: 'security.txt',
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
    title: 'SecureCore — Riset Keamanan Independen & Perlindungan Digital',
    description:
      'Peneliti keamanan independen yang membantu organisasi menemukan kerentanan, memahami risiko nyata, dan memperkuat keamanan digital mereka.',
    ogLocale: 'id_ID',
  },
  a11y: {
    skip: 'Langsung ke konten',
    home: 'Beranda SecureCore',
    menu: 'Menu',
    primaryNav: 'Navigasi utama',
    langSwitch: 'Read in English',
  },
  nav: [
    { href: '#about', label: 'Tentang' },
    { href: '#services', label: 'Layanan' },
    { href: '#approach', label: 'Pendekatan' },
    { href: '#principles', label: 'Prinsip' },
    { href: '#contact', label: 'Kontak' },
  ],
  navCta: 'Hubungi kami',
  langShort: 'EN',
  hero: {
    eyebrow: 'Riset Keamanan Independen & Perlindungan Digital',
    title: 'Kami membantu Anda menemukan celah sebelum orang lain menemukannya.',
    lead: 'Peneliti keamanan independen yang membantu organisasi menemukan kerentanan, memahami risiko nyata, dan memperkuat keamanan digital mereka.',
    primaryCta: 'Ajukan asesmen',
    secondaryCta: 'Lihat layanan',
    mailSubject: 'Permintaan asesmen keamanan',
    tags: ['Hanya pengujian resmi', 'Rahasia sejak awal', 'Netral vendor'],
  },
  report: {
    label: 'Contoh cuplikan laporan',
    file: 'ringkasan-asesmen.txt',
    rows: [
      { k: 'cakupan', v: 'web app · api · konfigurasi cloud' },
      { k: 'metode', v: 'pengujian manual + validasi' },
      { k: 'status', v: 'perbaikan sedang berjalan' },
    ],
    severityTitle: 'Temuan berdasarkan tingkat risiko',
    severities: [
      { key: 'critical', label: 'Kritis', count: 1 },
      { key: 'high', label: 'Tinggi', count: 3 },
      { key: 'medium', label: 'Sedang', count: 6 },
      { key: 'low', label: 'Rendah', count: 9 },
    ],
    note: 'Setiap temuan disertai bukti, dampak, dan langkah perbaikan yang jelas.',
  },
  about: {
    kicker: 'Tentang',
    title: 'Independen sejak awal.',
    body: [
      'SecureCore adalah tim peneliti keamanan siber independen. Fokus kami adalah mengidentifikasi kerentanan, mengevaluasi keamanan sistem digital, dan melakukan penelitian teknis secara langsung.',
      'Tugas kami adalah membantu organisasi memahami di mana mereka rentan, seberapa besar dampaknya, dan apa yang perlu dilakukan, sehingga infrastruktur digital mereka bisa diperkuat dengan yakin.',
    ],
    points: [
      {
        title: 'Dipimpin peneliti',
        text: 'Orang yang menguji sistem Anda adalah orang yang menulis laporannya. Tidak ada konteks yang hilang.',
      },
      {
        title: 'Netral vendor',
        text: 'Kami tidak menjual produk keamanan. Rekomendasi kami hanya berdasarkan kebutuhan lingkungan Anda.',
      },
      {
        title: 'Risiko nyata, bukan kebisingan',
        text: 'Setiap temuan divalidasi secara manual dan diurutkan berdasarkan dampak nyata, bukan sekadar hasil scanner.',
      },
    ],
  },
  services: {
    kicker: 'Layanan',
    title: 'Apa yang bisa kami bantu.',
    lead: 'Setiap pekerjaan disesuaikan dengan sistem, risiko, dan jadwal Anda.',
    items: [
      {
        icon: 'scan',
        title: 'Vulnerability Assessment',
        text: 'Identifikasi kelemahan keamanan secara sistematis pada aplikasi, jaringan, dan layanan yang terekspos.',
      },
      {
        icon: 'target',
        title: 'Penetration Testing',
        text: 'Simulasi serangan nyata yang resmi dan terukur untuk menunjukkan apa yang benar-benar bisa dijangkau penyerang.',
      },
      {
        icon: 'code',
        title: 'Review Keamanan Web & API',
        text: 'Pengujian mendalam terhadap autentikasi, kontrol akses, logika bisnis, dan pengelolaan data pada web dan API Anda.',
      },
      {
        icon: 'server',
        title: 'Review Infrastruktur & Cloud',
        text: 'Peninjauan konfigurasi server, jaringan, dan cloud untuk menutup kesalahan konfigurasi sebelum dimanfaatkan.',
      },
      {
        icon: 'flask',
        title: 'Riset & Konsultasi Keamanan',
        text: 'Penelitian teknis dan panduan praktis agar tim Anda memahami ancaman dan mengambil keputusan keamanan yang lebih baik.',
      },
      {
        icon: 'refresh',
        title: 'Pendampingan Perbaikan & Retest',
        text: 'Kami membantu tim Anda memperbaiki temuan, lalu menguji ulang untuk memastikan setiap masalah benar-benar tertutup.',
      },
    ],
  },
  approach: {
    kicker: 'Pendekatan',
    title: 'Proses yang jelas dan terukur.',
    lead: 'Anda selalu tahu apa yang kami uji, alasannya, dan langkah berikutnya.',
    steps: [
      {
        title: 'Cakupan & izin',
        text: 'Target, batasan, dan waktu disepakati secara tertulis sebelum pengujian dimulai.',
      },
      {
        title: 'Pemetaan & pengujian',
        text: 'Kami memetakan permukaan serangan Anda dan mengujinya seperti penyerang yang serius.',
      },
      {
        title: 'Validasi & analisis',
        text: 'Setiap temuan diverifikasi manual dan dinilai berdasarkan dampak nyata bagi bisnis Anda.',
      },
      {
        title: 'Pelaporan',
        text: 'Laporan yang jelas untuk manajemen dan tim teknis: bukti, dampak, dan prioritas perbaikan.',
      },
      {
        title: 'Perbaikan & retest',
        text: 'Kami mendampingi perbaikan dan menguji ulang untuk memastikan risikonya sudah tertutup.',
      },
    ],
  },
  principles: {
    kicker: 'Prinsip',
    title: 'Cara kami bekerja.',
    items: [
      {
        title: 'Hanya dengan izin',
        text: 'Kami tidak pernah menguji apa pun tanpa izin tertulis dan cakupan yang disepakati.',
      },
      {
        title: 'Rahasia',
        text: 'Temuan hanya dibagikan kepada Anda. Kami siap bekerja di bawah NDA.',
      },
      {
        title: 'Responsible disclosure',
        text: 'Jika riset kami menemukan celah pada sistem pihak ketiga, kami melaporkannya secara privat dan bertanggung jawab.',
      },
      {
        title: 'Bukti, bukan menakut-nakuti',
        text: 'Tanpa taktik menakut-nakuti. Kami tunjukkan apa yang nyata, seberapa serius, dan cara memperbaikinya.',
      },
    ],
  },
  contact: {
    kicker: 'Kontak',
    title: 'Mari bicara soal keamanan Anda.',
    lead: 'Ceritakan singkat tentang organisasi Anda dan sistem yang ingin ditinjau. Kami akan menghubungi Anda untuk membahas cakupannya.',
    emailLabel: 'Kirim email ke',
    cta: 'Kirim email',
    mailSubject: 'Permintaan asesmen keamanan',
    note: 'Mohon jangan mengirim kredensial atau detail kerentanan sensitif di email pertama. Kami akan menyiapkan saluran aman bila diperlukan.',
  },
  footer: {
    tagline: 'Your Safety, Our Mission',
    legal: 'Seluruh pengujian keamanan hanya dilakukan dengan izin tertulis dari pemilik sistem.',
    securityTxt: 'security.txt',
    rights: 'Hak cipta dilindungi.',
  },
  notFound: {
    title: 'Halaman tidak ditemukan',
    text: 'Halaman yang Anda cari tidak ada atau sudah dipindahkan.',
    back: 'Kembali ke beranda',
  },
};

export const content: Record<Lang, Content> = { en, id };

export function mailto(subject: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

/** URL of the home page for a language. */
export function homePath(lang: Lang): string {
  return lang === 'en' ? '/' : `/${lang}/`;
}
