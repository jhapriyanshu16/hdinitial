# HD Initial website

A static, mobile-first business website built with HTML5, CSS3 and vanilla JavaScript. No build step or framework is required. Serve the project root over HTTP(S) so root-relative assets and routes work as intended.

## Local preview

From this directory, start any static HTTP server, for example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Do not open the HTML files directly with `file://`; the site uses root-relative paths.

## Configuration before launch

Edit [`js/config.js`](./js/config.js):

- `whatsappNumber`: verified WhatsApp number in international format, digits only (`917887558376`).
- `email`: company email address (`hdinitialpvtltd@gmail.com`).
- `businessHours`: displayed business-hours text, including Sunday emergency availability.
- `branches`: update each published branch name, address, telephone number and email.
- `socialLinks`: the Instagram, Facebook and LinkedIn icons currently use platform homepage placeholders; update the URLs when company profiles are ready.
- `website`: live production domain (`https://hdinitial.com`). Page canonical links and Open Graph URLs use this value.
- `gstin` and `cin`: add the verified identifiers when available; these are intentionally pending for the initial deployment.

The sitemap, `robots.txt`, canonical URLs, and structured data use the live domain `https://hdinitial.com`.

## Pages and functionality

- Homepage pathways for individual and business customers.
- Homepage experience and impact statistics with configurable values and a repeat-on-entry, reduced-motion-aware count-up animation.
- Product category catalogue without fabricated product inventory or prices.
- Service and business solution directories, including CCTV, computer repair, networking, data services, AMC and office automation.
- Rental enquiry builder and CCTV enquiry builder.
- General/business enquiry forms that open WhatsApp with submitted form details prefilled for the customer to send.
- Every enquiry form collects phone and city plus optional email and company name; these values are included in the prepared WhatsApp message.
- Contact page quick-action cards, emergency call/WhatsApp support and branch-specific email links.
- Accessible responsive navigation, lightweight local search, FAQ disclosures, floating WhatsApp access and back-to-top control.
- Hero imagery loads immediately; below-the-fold card, split-panel and callout backgrounds load as they approach the viewport. If `IntersectionObserver` is unavailable, those images load eagerly.
- Netlify browser caching: HTML is revalidated on each visit; images are cached for 7 days and CSS/JavaScript for 1 day, with stale-while-revalidate windows. Change these durations in the Netlify `_headers` file as needed. Asset filenames are not content-hashed, so immutable caching is not enabled.
- Knowledge centre with eight original practical guides.
- About page with the company story, mission, vision, values, team, map-style timeline, locations and technology partner wordmarks; contact, a project page with a temporary gallery-unavailable notice (excluded from indexing until project content is available), reviewed privacy and terms pages, and a 404 page.
- Unique page titles/descriptions and canonicals, accurate homepage business structured data, service/article structured data where appropriate, `sitemap.xml` and `robots.txt`.

## Content and asset notes

- HD Initial has four branches: Virar East (Head Office), Andheri West, Boisar West and Kalyan East. Their addresses, phone numbers and emails are maintained in `js/config.js`.
- The website highlights service to clients across Mumbai and Maharashtra.
- WhatsApp enquiries use `+91-7887558376`; the floating WhatsApp button opens a direct chat with a prewritten message.
- Product models, prices, stock, rental availability and terms, and service scope are confirmed individually.
- Client testimonials, experience and impact statistics are supplied company content. No project photographs, warranties or authorized brand relationships have been invented. The projects page states that its gallery is currently unavailable until genuine company photographs are provided.
- The supplied HD Initial logo is in `assets/logo/hd-initial-logo.png`. The separate informational image was not presented as company project photography.
- Technology partners on the About page are presented as styled text wordmarks; no official partner logo files are bundled in the project.
- The homepage “Choose your path” section uses the supplied `assets/images/choose_your_path_bg.png` as a tuned, darkened section-wide background; its individual audience cards retain solid translucent surfaces for readable text.
- Image backgrounds are omitted from the homepage “Start an enquiry” icon cards, the equipment-rental feature panel, and enquiry forms. Image-enabled cards use a dedicated image strip above the heading and description so card copy stays on a solid, readable surface; section, hero, split-panel and callout imagery remains separate.
- The site includes locally stored, compressed Unsplash and Pexels photos in `assets/images/` for softly blurred hero and content-box backgrounds; card images are matched to their headings, with separate laptop and desktop-computer imagery and distinct CCTV images for home, shop, office and outdoor settings. These are illustrative stock imagery, not HD Initial installations or customer projects. Sources: [laptops and workspaces](https://unsplash.com/s/photos/laptop-workspace), [desktop computer workstation](https://www.pexels.com/photo/workstation-while-working-on-the-webpage-6804581/), [computer components](https://unsplash.com/s/photos/computer-components), [CCTV camera](https://www.pexels.com/photo/white-2-cctv-camera-mounted-on-black-post-under-clear-blue-sky-96612/), [CCTV dome](https://www.pexels.com/photo/close-up-of-security-camera-on-modern-building-37591155/), [CCTV at business premises](https://www.pexels.com/photo/surveillance-cameras-in-city-19782580/), [outdoor CCTV](https://www.pexels.com/photo/surveillance-cameras-against-blue-sky-5650141/), [fingerprint access](https://www.pexels.com/photo/finger-scan-17155842/), [computer repair](https://www.pexels.com/photo/person-in-green-sweater-playing-audio-mixer-4705603/), [office teams](https://unsplash.com/s/photos/office-team), [office interiors](https://unsplash.com/s/photos/office-interior), [printers](https://unsplash.com/s/photos/printer), [server racks](https://unsplash.com/s/photos/server-rack), and [meeting rooms](https://unsplash.com/s/photos/meeting-room).
- Privacy and terms pages contain the reviewed company policies.
- No backend, analytics, payment flow, inventory, or appointment booking is included.

## SEO topic map

| Topic group | Primary destination |
|---|---|
| Computers, refurbished systems, components and upgrades | `/products/` and its category pages |
| CCTV installation, repair, mobile viewing and camera systems | `/services/cctv-installation.html` |
| Computer repair, on-site troubleshooting, Apple device support and door-to-door support | `/services/computer-repair.html`, `/services/apple-support.html` and `/services/door-to-door-service.html` |
| Data backup and recovery for hard disks, SSDs, pen drives and mobile devices | `/services/data-backup-recovery.html` |
| LAN/WAN, VPN, structured cabling, servers, AMC and business infrastructure | `/services/`, `/services/networking.html` and `/solutions/business-it-solutions.html` |
| Attendance, access control, EPABX, intercom, projectors and interactive displays | `/services/biometric-access-control.html` and `/services/office-automation.html` |
| Laptop, desktop, display, server and projector rentals | `/rentals/` |
| Website, hosting, productivity software and custom software | `/solutions/web-digital-solutions.html` |
| Local intent | Virar East (Head Office), Andheri West, Boisar West and Kalyan East branches |

## Deployment checklist

1. Deploy with GSTIN and CIN pending; add the verified legal identifiers to `js/config.js` when available.
2. Keep the live production domain consistent in `js/config.js`, `sitemap.xml`, `robots.txt`, and static SEO defaults.
3. Keep the reviewed privacy and terms content up to date.
4. Add genuine installation photographs and verified brand/product assets only when available.
5. Deploy the site to Netlify from the project root. Netlify reads `_headers` automatically for the published directory; confirm the publish directory includes this file.
6. The Netlify `_headers` file configures security headers and caching. Verify the resulting headers on the deployed site. The Content Security Policy allows same-origin resources, data-URI images used by browser controls, and inline styles required by the current page; keep it in sync if new external resources are added.
7. Serve the site over HTTPS and verify HTTPS is enforced before relying on the included one-year HSTS policy.
8. Test canonical URLs, forms, links, security headers, cache headers, lazy-loaded imagery, and mobile layouts on the production host.
9. Validate structured data and submit the sitemap through the relevant search-engine webmaster tools.
