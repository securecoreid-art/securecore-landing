# SecureCore — Landing Page

> **Independent Research. Professional Security.**
> Landing page for [securecore.id](https://securecore.id), built with [Astro](https://astro.build) 5 as a fully static site.

- Bilingual: English (`/`) and Bahasa Indonesia (`/id/`)
- Zero third-party scripts, trackers, or CDNs: fonts are self-hosted
- Strict security headers (CSP, HSTS, etc.) via `.htaccess`
- `/.well-known/security.txt` (RFC 9116)
- Automatic deploy to cPanel via GitHub Actions (FTPS)

---

## Menjalankan di lokal

Butuh Node.js 20.3+ atau 22+.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # hasil build ke folder dist/
npm run preview   # cek hasil build
```

## Struktur

```
src/
  i18n/content.ts        ← SEMUA teks website (EN + ID). Edit copy di sini.
  components/            ← Header, Hero, About, Services, Approach, Principles, Contact, Footer
  layouts/Base.astro     ← <head>, meta SEO, Open Graph
  pages/index.astro      ← halaman English  (/)
  pages/id/index.astro   ← halaman Indonesia (/id/)
  pages/404.astro
  styles/global.css      ← warna brand, font, tombol
public/
  .htaccess              ← HTTPS redirect + security headers + cache
  .well-known/security.txt
  favicon.svg, apple-touch-icon.png, og-image.png, robots.txt, sitemap.xml
brand/logo-original.png  ← file logo asli
.github/workflows/deploy.yml
```

**Ganti teks:** edit `src/i18n/content.ts`. Setiap teks ada versi `en` dan `id`.
**Ganti email:** ubah `CONTACT_EMAIL` di file yang sama, plus `public/.well-known/security.txt`.

---

## Setup GitHub (sekali saja)

### 1. Buat repository

1. Buka https://github.com/new
2. Nama repo: misalnya `securecore-landing`
3. Visibility: **Public** (aman, karena tidak ada rahasia di kode)
4. **Jangan** centang "Add a README" / .gitignore / license (sudah ada di project)
5. Klik **Create repository**

### 2. Push kode pertama kali

Dari folder project:

```bash
git add .
git commit -m "Initial SecureCore landing page"
git remote add origin https://github.com/<username>/securecore-landing.git
git push -u origin main
```

Saat diminta password, GitHub butuh **Personal Access Token**, bukan password akun:
GitHub → Settings → Developer settings → Personal access tokens → Fine-grained token → beri akses *Contents: Read and write* ke repo ini.

> Push pertama akan menjalankan workflow deploy dan **gagal** karena secrets belum diisi. Itu normal. Isi secrets di langkah 4, lalu jalankan ulang.

### 3. Buat akun FTP khusus di cPanel

Disarankan pakai akun FTP terpisah, bukan akun utama cPanel:

1. cPanel → **FTP Accounts** → buat akun baru, misalnya `deploy@securecore.id`
2. **Directory**: arahkan ke `public_html` (atau folder root domain)
3. Pakai password kuat dan acak
4. Catat **FTP Server** (biasanya `ftp.securecore.id` atau hostname server dari panel "Configure FTP Client")

### 4. Isi GitHub Secrets

Repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Contoh isi | Keterangan |
|---|---|---|
| `FTP_SERVER` | `ftp.securecore.id` | host FTP dari cPanel |
| `FTP_USERNAME` | `deploy@securecore.id` | akun FTP |
| `FTP_PASSWORD` | `••••••••` | password akun FTP |
| `FTP_SERVER_DIR` | `./` | `./` jika akun FTP sudah diarahkan ke `public_html`; jika tidak, `public_html/`. **Harus diakhiri `/`** |

Lalu: tab **Actions → Build & Deploy to cPanel → Run workflow**.

Setelah itu, **setiap push ke `main` otomatis build & deploy.**

---

## Checklist setelah deploy pertama

- [ ] SSL aktif: cPanel → **SSL/TLS Status** → Run AutoSSL (wajib sebelum HSTS berlaku)
- [ ] `https://securecore.id` dan `https://securecore.id/id/` terbuka normal
- [ ] `http://` dan `www.` ter-redirect ke `https://securecore.id`
- [ ] Cek header di https://securityheaders.com: target nilai **A/A+**
- [ ] Cek https://securecore.id/.well-known/security.txt
- [ ] Pastikan mailbox `contact@securecore.id` sudah dibuat di cPanel → Email Accounts

## Catatan keamanan

- **Jangan pernah** commit password, token, atau file `.env`. Kredensial hanya di GitHub Secrets.
- CSP sengaja ketat (`script-src 'self'; style-src 'self'`). Jika nanti menambah script/font/analytics pihak ketiga, domainnya harus ditambahkan ke CSP di `public/.htaccess`.
- HSTS saat ini `max-age=31536000` **tanpa** `includeSubDomains`/`preload`. Tambahkan hanya jika semua subdomain (mail, cpanel, dll.) sudah HTTPS.
- `security.txt` punya field `Expires`. **Perbarui sebelum 19 Nov 2027.**
- Jika FTPS gagal karena sertifikat server (umum di shared hosting), tambahkan `security: loose` di step deploy, atau minta hosting mengaktifkan sertifikat valid untuk FTP.

## Upgrade di masa depan

Project ini pakai Astro **5.18.2** agar kompatibel dengan Node 20. Untuk naik ke Astro terbaru (butuh Node 22+), ikuti panduan resmi: https://docs.astro.build/en/guides/upgrade-to/v6/ lalu v7.
