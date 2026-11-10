# Ayush Kumar Patel — SOC & Purple Team Portfolio (GitHub + Heroku)

Clean, responsive HTML/CSS/JS cybersecurity portfolio featuring Ayush's user-supplied portrait, public repository links, certificates and training platforms. **No login, database, forms or third-party JavaScript.**

## Local preview

```bash
npm start
# Visit http://localhost:3000
```

Run security smoke tests with `npm test`. This project intentionally has **zero npm dependencies**.

## Recommended deployment

**GitHub** hosts the code, **Heroku** hosts the public website, **Namecheap** sells and manages the custom domain. You don't need both GitHub Pages and Heroku to host the same domain.

Read [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for the step-by-step process and Namecheap DNS setup.

## Features and safeguards

- Full responsive interface, original B&W portrait, GitHub projects and TryHackMe/Hack The Box links.
- CSP (also included in HTML), `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, COOP/CORP and HSTS on HTTPS requests.
- Strict static-file allowlist prevents serving project config, app source, `.env`, or Git metadata.
- Heroku `PORT` binding, `Procfile`, minimal Node.js HTTP server with zero dependencies.
- CI includes Node syntax and HTTP smoke tests.
- Treat TryHackMe statistics as a dated November 2026 account snapshot, not live data. Issuer certificates are **not independently verified** unless a direct URL is added.

No system can be guaranteed unhackable. Keep GitHub/Heroku/Namecheap 2FA enabled and deploy HTTPS with Heroku ACM.

## Before public launch

1. Update social/profile links or content if needed in `index.html`.
2. Check public contact and location details you're comfortable exposing.
3. Register a domain before setting custom-domain DNS, and use Heroku's actual DNS target—not an invented value.
4. Canonical URL, social-preview image, robots.txt, and sitemap.xml are already set to `https://ayush-cyber-def.tech/`. Verify the domain and SSL certificate before sharing publicly.
5. Never publish passwords, API keys, Heroku tokens or `.env` files.

## Configured custom domain

Primary: **https://ayush-cyber-def.tech/** (canonical). Also add `www.ayush-cyber-def.tech` in Heroku; the server redirects www requests to the canonical root after DNS and TLS are active. DNS targets must be copied from the actual Heroku app.
