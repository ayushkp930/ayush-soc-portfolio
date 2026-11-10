# Ayush Kumar Patel — SOC & Purple Team Portfolio

A clean, responsive cybersecurity portfolio featuring SOC analysis, Purple Team, detection engineering, incident response, public projects, certifications, and hands-on learning platforms.

**Live website:** https://www.ayush-cyber-def.tech/  
**GitHub repository:** https://github.com/ayushkp930/ayush-soc-portfolio

## Tech stack

- **Frontend:** HTML, CSS and vanilla JavaScript
- **Server:** Minimal Node.js HTTP server (`server.mjs`)
- **Version control:** GitHub
- **Hosting:** Heroku (`ayush-cyber-def-site`)
- **Domain registrar / DNS:** .TECH / get.tech (Namify)
- **SSL:** Heroku Automated Certificate Management (ACM)

No login, database, forms, third-party JavaScript, or runtime npm dependencies are required.

## Local preview

Use a compatible Node.js version as specified in `package.json`.

```bash
npm start
# Open http://localhost:3000
```

Run the security smoke tests:

```bash
npm test
```

## Live domain and DNS

The **only intended primary website address** is:

**https://www.ayush-cyber-def.tech/**

The `www` domain is configured with the following DNS record:

| Type | Host | Target | TTL |
| --- | --- | --- | --- |
| CNAME | `www` | `metric-sailfish-krgqi5qgjap3dpuwyxxxpuip.herokudns.com` | Auto |

The target was supplied by Heroku during domain setup. **Always reconfirm it in Heroku → Settings → Domains before changing DNS**; targets can differ if a domain is re-added.

Heroku ACM has issued an automatically managed HTTPS certificate for the configured domain. There is no need to install the separately purchased Namecheap SSL certificate for this Heroku setup.

### Why the site uses `www`

The apex/root hostname (`ayush-cyber-def.tech`, without `www`) is **not configured as the public site**. It previously caused `DNS_PROBE_FINISHED_NXDOMAIN` because the app redirected visitors from `www` to the unconfigured root hostname.

That redirect was removed from `server.mjs`. **Do not add a `www` → apex redirect.** The root hostname would require separate DNS and HTTPS or forwarding configuration if added later.

## Deploying changes

1. Edit files in this GitHub repository and test locally where possible.
2. Commit your changes to the branch linked with Heroku (`main`).
3. If automatic deploys are enabled, Heroku can deploy the new commit. Otherwise, go to **Heroku → Deploy → GitHub → Manual Deploy → Deploy Branch**.
4. Confirm the live website at https://www.ayush-cyber-def.tech/.

To check the HTTPS response from Windows PowerShell:

```powershell
curl.exe -I https://www.ayush-cyber-def.tech
```

The homepage should return a successful HTTP response rather than a redirect to the unconfigured apex domain.

## SEO and social links

Use `https://www.ayush-cyber-def.tech/` consistently in:

- `index.html`: canonical URL, Open Graph URL/image and Twitter image
- `robots.txt`: sitemap reference, if present
- `sitemap.xml`: page URLs

**Note:** Some existing website metadata may still point to the apex hostname. Those source files must be updated separately; changing this README alone does not change production SEO metadata.

## Features and safeguards

- Responsive dark-themed interface with public project and learning-platform links
- Static file allowlist that prevents access to application source, configuration files and Git metadata through the web server
- Security headers including Content Security Policy (CSP), `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, COOP/CORP and HSTS over HTTPS
- Heroku `PORT` binding, `Procfile`, dependency-free HTTP server and automated smoke tests

Keep GitHub, Heroku and the domain account protected with multi-factor authentication. Never commit passwords, API keys, Heroku tokens, SSL private keys or `.env` secrets.

TryHackMe statistics shown in the portfolio should be treated as a **November 2026 snapshot**, not live metrics. Certificates should not be described as independently verified unless a verifiable issuer link is provided.

No website can be guaranteed completely invulnerable.
