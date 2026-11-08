(() => {
  "use strict";

  const config = window.SITE_CONFIG;
  const renderSocialLinks = (className) => `
    <nav class="${className}" aria-label="Social media">
      <a href="${config.socialLinks.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.25" fill="currentColor"/></svg>
      </a>
      <a href="${config.socialLinks.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z"/></svg>
      </a>
      <a href="${config.socialLinks.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M5.2 8.3a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM3.6 9.8h3.2V20H3.6V9.8Zm5.2 0h3.1v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V20h-3.2v-4.9c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H8.8V9.8Z"/></svg>
      </a>
    </nav>`;

  const navGroups = [
    {
      label: "Products",
      links: [
        ["All products", "/products/"],
        ["Computers", "/products/computers.html"],
        ["Refurbished computers", "/products/refurbished-computers.html"],
        ["Components & upgrades", "/products/components-and-upgrades.html"],
        ["Custom PCs", "/products/custom-pcs.html"],
        ["Printers & peripherals", "/products/printers-and-peripherals.html"]
      ]
    },
    {
      label: "Services",
      links: [
        ["All services", "/services/"],
        ["CCTV installation", "/services/cctv-installation.html"],
        ["Computer repair", "/services/computer-repair.html"],
        ["Mac & Apple support", "/services/apple-support.html"],
        ["Door-to-door support", "/services/door-to-door-service.html"],
        ["Data backup & recovery", "/services/data-backup-recovery.html"],
        ["Networking", "/services/networking.html"],
        ["Server solutions", "/services/server-solutions.html"],
        ["Biometric & access control", "/services/biometric-access-control.html"],
        ["EPABX & office automation", "/services/office-automation.html"],
        ["AMC & maintenance", "/services/amc-maintenance.html"]
      ]
    },
    {
      label: "Solutions",
      links: [
        ["Business IT solutions", "/solutions/business-it-solutions.html"],
        ["Office IT setup", "/solutions/office-it-setup.html"],
        ["Security & surveillance", "/solutions/security-surveillance.html"],
        ["Attendance management", "/solutions/attendance-management.html"],
        ["Web & digital solutions", "/solutions/web-digital-solutions.html"]
      ]
    }
  ];

  const hrefForWhatsApp = (message) => {
    const number = config.whatsappNumber.trim();
    if (!/^\d{10,15}$/.test(number)) return "";
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  };

  const makeMessage = (subject, values = {}) => {
    const lines = [
      `Hello ${config.companyName},`,
      `I would like to enquire about: ${subject}.`
    ];
    Object.entries(values).forEach(([label, value]) => {
      if (String(value || "").trim()) lines.push(`${label}: ${String(value).trim()}`);
    });
    lines.push("Please let me know the next steps. Thank you.");
    return lines.join("\n");
  };

  const telephoneHref = (telephone) => `tel:${telephone.replace(/[^\d+]/g, "")}`;

  const renderBranchLocations = () => {
    document.querySelectorAll("[data-branch-locations]").forEach((mount) => {
      mount.innerHTML = config.branches.map((branch) => `
        <article class="card branch-card" data-no-card-image>
          <div class="branch-card__heading">
            <span class="branch-card__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="1.8"/></svg>
            </span>
            <h3>${branch.name}</h3>
          </div>
          <address>${branch.address}</address>
          <div class="branch-card__contacts">
            <a href="${telephoneHref(branch.telephone)}">${branch.telephone}</a>
            <a href="mailto:${branch.email}">${branch.email}</a>
          </div>
        </article>`).join("");
    });
  };

  const applyWhatsApp = (link, message) => {
    const href = hrefForWhatsApp(message);
    if (href) {
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.removeAttribute("aria-disabled");
      link.classList.remove("is-disabled");
    } else {
      link.href = "/contact/";
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.setAttribute("aria-disabled", "true");
      link.classList.add("is-disabled");
      link.title = "WhatsApp contact details are being configured. Please use email or the contact page.";
    }
  };

  const renderHeader = () => {
    const mount = document.querySelector("[data-site-header]");
    if (!mount) return;
    const groups = navGroups.map((group, index) => `
      <div class="nav-group">
        <button class="nav-group__toggle" type="button" aria-expanded="false" aria-controls="nav-panel-${index}">
          ${group.label}<span aria-hidden="true">⌄</span>
        </button>
        <div class="nav-group__panel" id="nav-panel-${index}" hidden>
          ${group.links.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
        </div>
      </div>`).join("");
    mount.innerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="utility-bar"><div class="container utility-bar__inner">
        <span>${config.businessHours}</span><a href="mailto:${config.email}">${config.email}</a>
      </div></div>
      <header class="site-header">
        <div class="container site-header__inner">
          <a class="brand" href="/" aria-label="${config.companyName} home">
            <img src="/assets/logo/hd-initial-logo-cropped.png" width="70" height="64" alt="${config.companyName} logo">
            <span class="brand__text"><strong>HD Initial Pvt. Ltd.</strong><small>A Division of HD Initial Group</small></span>
          </a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">
            <span class="sr-only">Open navigation menu</span><span class="menu-toggle__icon" aria-hidden="true"></span>
          </button>
          <nav class="primary-nav" id="primary-navigation" aria-label="Main navigation">
            <a href="/">Home</a>${groups}
            <a href="/rentals/">Rentals</a><a href="/about/">About</a><a href="/contact/">Contact</a>
            <button type="button" class="search-open" aria-label="Search this website"><span class="search-open__icon" aria-hidden="true"></span></button>
            <a class="button button--small button--orange" data-whatsapp data-subject="general enquiry" href="/contact/">WhatsApp us</a>
          </nav>
        </div>
      </header>
      <dialog class="search-dialog" aria-labelledby="search-title">
        <div class="search-dialog__top"><h2 id="search-title">Search HD Initial</h2><button class="search-close icon-button" type="button" aria-label="Close search">×</button></div>
        <label for="site-search">Search products, services and solutions</label>
        <input id="site-search" type="search" autocomplete="off" placeholder="Search CCTV, laptops, repairs and more">
        <button class="search-clear" type="button">Clear search</button>
        <p class="search-status" aria-live="polite">Start typing to see relevant pages.</p>
        <ul class="search-results" aria-label="Search results"></ul>
      </dialog>`;
  };

  const renderFooter = () => {
    const mount = document.querySelector("[data-site-footer]");
    if (!mount) return;
    const registrationDetails = [
      ["GSTIN", config.gstin],
      ["CIN", config.cin]
    ]
      .filter(([, value]) => value && !/^to be supplied$/i.test(value.trim()))
      .map(([label, value]) => `${label}: ${value}`)
      .join("<br>");

    mount.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <a class="brand brand--footer" href="/"><img src="/assets/logo/hd-initial-logo-cropped.png" width="78" height="72" alt="" aria-hidden="true"><span class="brand__text"><strong>HD Initial</strong><small>A Division of HD Initial Group</small></span></a>
            <p>Technology that works, with practical hardware, security, infrastructure and technical support for individuals and businesses across Mumbai and Maharashtra.</p>
            <a data-whatsapp data-subject="general enquiry" href="/contact/">Start a WhatsApp enquiry</a>
            ${renderSocialLinks("footer-social")}
          </div>
          <nav aria-label="Explore"><h2>Explore</h2><ul><li><a href="/products/">Products</a></li><li><a href="/services/">Services</a></li><li><a href="/solutions/">Business solutions</a></li><li><a href="/rentals/">Equipment rentals</a></li><li><a href="/knowledge/">Knowledge centre</a></li></ul></nav>
          <div><h2>Contact</h2><address><a href="mailto:${config.email}">${config.email}</a><p>${config.businessHours}</p>${registrationDetails ? `<p>${registrationDetails}</p>` : ""}</address></div>
          <div><h2>Our branches</h2><ul class="footer-branch-list">${config.branches.map((branch) => `<li><span>${branch.name}</span><span class="footer-branch-address">${branch.address}</span><a href="${telephoneHref(branch.telephone)}">${branch.telephone}</a><a href="mailto:${branch.email}">${branch.email}</a></li>`).join("")}</ul></div>
        </div>
        <div class="container footer-bottom"><span>© <span data-year></span> ${config.companyName}. All rights reserved.</span><nav aria-label="Legal"><a href="/privacy-policy.html">Privacy policy</a><a href="/terms-and-conditions.html">Terms & conditions</a></nav></div>
      </footer>
      <a class="floating-whatsapp" data-whatsapp data-whatsapp-message="Hello HD Initial, I would like to know more about your products and services." href="/contact/" aria-label="Chat with HD Initial on WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <path d="M16 3.2a12.4 12.4 0 0 0-10.6 18.8L3.8 28.5l6.7-1.6A12.4 12.4 0 1 0 16 3.2Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
          <path d="M12.1 10.2c-.3-.7-.7-.7-1-.7h-.8c-.3 0-.8.1-1.2.6-.4.4-1.6 1.5-1.6 3.7s1.6 4.3 1.8 4.6c.2.3 3.1 5 7.7 6.8 3.8 1.5 4.6 1.2 5.4 1.1.8-.1 2.5-1 2.8-2 .4-1 .4-1.8.2-2-.1-.2-.4-.3-.9-.6-.5-.2-2.5-1.2-2.9-1.3-.4-.1-.7-.2-1 .3-.3.5-1.1 1.3-1.3 1.6-.3.3-.5.4-1 .1-.5-.2-1.9-.7-3.6-2.2-1.3-1.1-2.2-2.5-2.5-2.9-.3-.5 0-.7.2-.9.2-.2.5-.6.7-.8.2-.3.3-.5.5-.8.2-.3.1-.6 0-.8-.1-.2-.9-2.2-1.2-3Z" fill="currentColor" transform="translate(2.5 0) scale(.82)"/>
        </svg>
      </a>
      <button class="back-to-top" type="button" aria-label="Back to top">↑</button>`;
  };

  document.querySelectorAll("[data-contact-social]").forEach((mount) => {
    mount.innerHTML = renderSocialLinks("contact-social");
  });

  const initNavigation = () => {
    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".primary-nav");
    if (menuButton && nav) {
      menuButton.addEventListener("click", () => {
        const expanded = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!expanded));
        menuButton.querySelector(".sr-only").textContent = expanded ? "Open navigation menu" : "Close navigation menu";
        nav.classList.toggle("is-open", !expanded);
      });
    }
    document.querySelectorAll(".nav-group__toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const panel = document.getElementById(button.getAttribute("aria-controls"));
        const expanded = button.getAttribute("aria-expanded") === "true";
        if (!expanded) {
          document.querySelectorAll(".nav-group__toggle[aria-expanded='true']").forEach((otherButton) => {
            otherButton.setAttribute("aria-expanded", "false");
            document.getElementById(otherButton.getAttribute("aria-controls")).hidden = true;
          });
        }
        button.setAttribute("aria-expanded", String(!expanded));
        panel.hidden = expanded;
      });
    });
    document.addEventListener("click", (event) => {
      if (event.target.closest(".nav-group")) return;
      document.querySelectorAll(".nav-group__toggle[aria-expanded='true']").forEach((button) => {
        button.setAttribute("aria-expanded", "false");
        document.getElementById(button.getAttribute("aria-controls")).hidden = true;
      });
    });
    document.querySelectorAll(".primary-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        nav?.classList.remove("is-open");
        menuButton?.setAttribute("aria-expanded", "false");
        menuButton?.querySelector(".sr-only") && (menuButton.querySelector(".sr-only").textContent = "Open navigation menu");
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      document.querySelectorAll(".nav-group__toggle[aria-expanded='true']").forEach((button) => {
        button.setAttribute("aria-expanded", "false");
        document.getElementById(button.getAttribute("aria-controls")).hidden = true;
      });
      nav?.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
      const menuLabel = menuButton?.querySelector(".sr-only");
      if (menuLabel) menuLabel.textContent = "Open navigation menu";
    });
    document.querySelectorAll(".search-open").forEach((button) => button.addEventListener("click", () => {
      const dialog = document.querySelector(".search-dialog");
      dialog.showModal();
      document.querySelector("#site-search").focus();
    }));
    document.querySelector(".search-close")?.addEventListener("click", () => document.querySelector(".search-dialog").close());
    document.querySelector(".search-dialog")?.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) event.currentTarget.close();
    });
  };

  const searchablePages = [
    ["Computers", "New laptops and desktop computers Dell Inspiron Intel i5 i7 8GB 512GB SSD HP PCs Core i3 i5 indicative prices warranty setup support", "/products/computers.html"],
    ["Refurbished computers", "Quality-tested refurbished laptops desktops Core i3 i5 256GB SSD 6 month warranty refurbished parts setup indicative prices", "/products/refurbished-computers.html"],
    ["Components and upgrades", "RAM SSD upgrade spare parts", "/products/components-and-upgrades.html"],
    ["Custom PCs", "Custom-built desktop computers", "/products/custom-pcs.html"],
    ["Printers and peripherals", "New Lenovo monitors Full HD eye care energy efficient refurbished HP Canon Epson printers scanners cleaning setup support indicative prices", "/products/printers-and-peripherals.html"],
    ["CCTV installation", "Home business commercial warehouse surveillance repair CP Plus Hikvision HD 4K night vision remote monitoring mobile app", "/services/cctv-installation.html"],
    ["Computer repair", "Laptop desktop on-site troubleshooting hardware diagnostics software virus malware performance optimisation upgrades", "/services/computer-repair.html"],
    ["Mac and Apple device support", "Apple MacBook iMac iPhone iPad certified technicians genuine parts warranty software hardware repair macOS data migration", "/services/apple-support.html"],
    ["Door-to-door service", "Repair pickup delivery support", "/services/door-to-door-service.html"],
    ["Networking solutions", "LAN WAN switches routers structured cabling cable management Wi-Fi network design VPN remote access security configuration", "/services/networking.html"],
    ["Server solutions", "Server installation configuration", "/services/server-solutions.html"],
    ["Data backup and recovery", "Hard drive HDD SSD data recovery USB pen drive mobile phone cloud backup automated secure", "/services/data-backup-recovery.html"],
    ["AMC and maintenance", "Annual maintenance contract comprehensive non-comprehensive 24/7 technical support preventive maintenance health checks emergency response", "/services/amc-maintenance.html"],
    ["Biometric and access control", "Attendance machine automated attendance remote monitoring access control system integration", "/services/biometric-access-control.html"],
    ["Office automation", "EPABX intercom extensions call recording voicemail system programming projector smartboard interactive display AV calibration training", "/services/office-automation.html"],
    ["Business IT solutions", "Office IT setup infrastructure support", "/solutions/business-it-solutions.html"],
    ["Laptop and short-term equipment rentals", "Daily weekly monthly flexible laptop desktop smartboard server projector networking equipment rental", "/rentals/"],
    ["Web and digital solutions", "Website domain hosting custom software", "/solutions/web-digital-solutions.html"],
    ["TallyPrime", "Accounting software business solutions", "/solutions/web-digital-solutions.html"],
    ["Microsoft Office", "Productivity software solutions", "/solutions/web-digital-solutions.html"],
    ["Antivirus solutions", "Device security software", "/solutions/web-digital-solutions.html"],
    ["Knowledge centre", "Helpful technology guides and articles", "/knowledge/"],
    ["New vs refurbished laptops", "New refurbished computer condition warranty", "/knowledge/articles/new-vs-refurbished-laptops.html"],
    ["Choosing home CCTV", "Home security surveillance camera planning", "/knowledge/articles/choose-home-cctv.html"],
    ["CCTV for shops and offices", "Commercial business surveillance coverage", "/knowledge/articles/cctv-for-shops-and-offices.html"],
    ["Business IT AMC guide", "Annual maintenance contract preventive IT support", "/knowledge/articles/business-it-amc.html"],
    ["Biometric attendance guide", "Workplace attendance management biometric systems", "/knowledge/articles/biometric-attendance.html"],
    ["Protect business data", "Backup recovery data protection", "/knowledge/articles/protect-business-data.html"],
    ["SSD upgrade signs", "Computer storage upgrade performance SSD", "/knowledge/articles/ssd-upgrade-signs.html"],
    ["Plan office networking", "LAN network setup office infrastructure", "/knowledge/articles/plan-office-network.html"],
    ["Contact HD Initial", "Virar East contact service areas", "/contact/"]
  ];

  const imageTopics = [
    { pattern: /cctv|surveillance|security camera|camera placement/, image: "cctv-cameras" },
    { pattern: /biometric|fingerprint|attendance|access control/, image: "fingerprint-access" },
    { pattern: /repair|troubleshoot|diagnostic|fault|door-to-door/, image: "computer-repair" },
    { pattern: /printer|printing/, image: "printer" },
    { pattern: /component|upgrade|ram|ssd|spare part|motherboard/, image: "computer-components" },
    { pattern: /server|network|lan|infrastructure|backup|data protection|connectivity/, image: "server-racks" },
    { pattern: /projector|smartboard|interactive display|meeting room|presentation/, image: "meeting-room" },
    { pattern: /laptop|notebook/, image: "computer-laptop" },
    { pattern: /desktop|computer|hardware|pc\b|refurbished/, image: "desktop-computer" },
    { pattern: /team|business|company|workplace|consultation|software|digital/, image: "technology-team" },
    { pattern: /office|home|property|location|site|rental|service|support|maintenance/, image: "office-workspace" }
  ];

  const titleImageMap = {
    "for individuals": "office-workspace",
    "for businesses and organisations": "technology-team",
    "buy hardware": "computer-components",
    "rent equipment": "computer-laptop",
    "computers": "desktop-computer",
    "laptops": "computer-laptop",
    "desktop computers": "desktop-computer",
    "laptops and desktop computers": "desktop-computer",
    "refurbished computers": "desktop-computer",
    "custom desktop pcs": "desktop-computer",
    "new vs refurbished laptops which should you choose": "computer-laptop",
    "cctv installation": "cctv-cameras",
    "home security": "cctv-dome",
    "shops & showrooms": "cctv-cameras",
    "offices & commercial sites": "cctv-business",
    "warehouse & industrial": "cctv-outdoor",
    "computer repair": "computer-repair",
    "business it setup": "server-racks",
    "amc & maintenance": "technology-team",
    "equipment rentals": "computer-laptop",
    "hardware and upgrades": "computer-components",
    "door-to-door computer support": "computer-repair",
    "business it solutions": "server-racks",
    "attendance management": "fingerprint-access",
    "web and digital solutions": "technology-team",
    "security & surveillance": "cctv-cameras",
    "it, security & support": "technology-team",
    "cctv & surveillance": "cctv-cameras"
  };

  const imageForDescription = (description) => {
    const text = description.toLowerCase();
    return imageTopics.find(({ pattern }) => pattern.test(text))?.image;
  };

  const imageForCard = (box) => {
    const heading = box.querySelector("h1, h2, h3, h4")?.textContent || "";
    const normalizedHeading = heading.toLowerCase().replace(/[^a-z0-9&\s]/g, "").trim();
    return titleImageMap[normalizedHeading] || imageForDescription(heading) || imageForDescription(box.textContent) || "meeting-room";
  };

  const initImagery = () => {
    const imagePath = (name) => `/assets/images/${name}.webp`;
    const isProductPage = location.pathname.startsWith("/products/");
    const isServiceDetailPage = location.pathname.startsWith("/services/")
      && location.pathname !== "/services/"
      && location.pathname !== "/services/index.html";
    const isServiceDirectoryPage = location.pathname === "/services/"
      || location.pathname === "/services/index.html";
    const isSolutionPage = location.pathname.startsWith("/solutions/");
    const isSolutionDetailPage = isSolutionPage
      && location.pathname !== "/solutions/"
      && location.pathname !== "/solutions/index.html";
    const isSolutionDirectoryPage = isSolutionPage && !isSolutionDetailPage;
    document.body.classList.toggle("product-page", isProductPage);
    document.body.classList.toggle("service-page", isServiceDetailPage);
    document.body.classList.toggle("solution-page", isSolutionDetailPage);
    const hero = document.querySelector(".hero");
    if (hero) {
      const heroContext = `${location.pathname} ${hero.querySelector("h1")?.textContent || ""}`;
      const heroImage = location.pathname === "/"
        ? "computer-laptop"
        : imageForDescription(heroContext) || "office-workspace";
      hero.style.setProperty("--hero-image", `url("${imagePath(heroImage)}")`);
    }

    const imageBoxes = [...document.querySelectorAll(".card:not([data-no-card-image]), .split__panel:not([data-no-card-image]), .callout:not([data-no-card-image])")]
      .filter((box) => {
        if (isServiceDetailPage && box.matches(".card")) return false;
        if (isSolutionDetailPage && box.matches(".card")) return false;
        if (isProductPage) return box.hasAttribute("data-card-image");
        if (isServiceDirectoryPage || isSolutionDirectoryPage) {
          return box.hasAttribute("data-card-image");
        }
        return true;
      });
    const imageClassFor = (box) => box.matches(".card")
      ? "card--image"
      : box.matches(".callout")
        ? "callout--image"
        : "split__panel--image";
    const prepareImage = (box) => {
      const name = imageForCard(box);
      if (box.matches(".card")) {
        const imageStrip = document.createElement("div");
        imageStrip.className = "card__image-strip";
        imageStrip.setAttribute("aria-hidden", "true");
        const content = document.createElement("div");
        content.className = "card__content";
        while (box.firstChild) content.append(box.firstChild);
        box.append(imageStrip, content);
      }
      return () => box.style.setProperty("--card-image", `url("${imagePath(name)}")`);
    };
    const deferredImages = imageBoxes.map((box) => {
      box.classList.add(imageClassFor(box));
      return { box, load: prepareImage(box) };
    });
    if ("IntersectionObserver" in window) {
      const imageLoaders = new Map();
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          imageLoaders.get(entry.target)?.();
          imageLoaders.delete(entry.target);
          observer.unobserve(entry.target);
        });
      }, { rootMargin: "300px 0px" });
      deferredImages.forEach(({ box, load }) => {
        imageLoaders.set(box, load);
        imageObserver.observe(box);
      });
    } else {
      deferredImages.forEach(({ load }) => load());
    }
  };

  const initImpactStats = () => {
    const values = [...document.querySelectorAll("[data-stat-value]")];
    if (!values.length) return;

    const setFinalValues = () => {
      values.forEach((value) => {
        value.textContent = value.dataset.statTarget;
      });
    };

    const setInitialValues = () => {
      values.forEach((value) => {
        value.textContent = "0";
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setFinalValues();
      return;
    }

    const duration = 1600;
    const stagger = 120;
    const timeouts = [];
    const frames = [];
    const stopAnimation = () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      frames.forEach((frame) => window.cancelAnimationFrame(frame));
      timeouts.length = 0;
      frames.length = 0;
    };
    const animateValue = (value, index) => {
      const target = Number(value.dataset.statTarget);
      if (!Number.isFinite(target) || target < 0) {
        throw new Error(`Invalid statistics counter target: ${value.dataset.statTarget}`);
      }

      timeouts[index] = window.setTimeout(() => {
        const start = performance.now();
        const update = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const easedProgress = 1 - (1 - progress) ** 4;
          value.textContent = String(Math.round(target * easedProgress));
          if (progress < 1) frames[index] = window.requestAnimationFrame(update);
        };
        frames[index] = window.requestAnimationFrame(update);
      }, index * stagger);
    };

    const section = document.querySelector(".section--impact");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setFinalValues();
            return;
          }
          stopAnimation();
          values.forEach((value, index) => animateValue(value, index));
          return;
        }
        stopAnimation();
        setInitialValues();
      });
    }, { threshold: 0 });
    observer.observe(section);
  };

  const initSearch = () => {
    const input = document.querySelector("#site-search");
    if (!input) return;
    const results = document.querySelector(".search-results");
    const status = document.querySelector(".search-status");
    input.addEventListener("input", () => {
      const term = input.value.trim().toLowerCase();
      results.replaceChildren();
      if (!term) {
        status.textContent = "Start typing to see relevant pages.";
        return;
      }
      const terms = term.split(/\s+/).filter(Boolean);
      const matches = searchablePages.filter(([title, description]) => {
        const searchableText = `${title} ${description}`.toLowerCase();
        return terms.every((part) => searchableText.includes(part));
      });
      const unique = [...new Map(matches.map((item) => [item[2], item])).values()].slice(0, 8);
      if (!unique.length) {
        status.textContent = "No matching pages found. Try a broader search or contact us.";
        return;
      }
      status.textContent = `${unique.length} relevant ${unique.length === 1 ? "page" : "pages"} found.`;
      unique.forEach(([title, description, href]) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = href;
        a.innerHTML = `<strong>${title}</strong><span>${description}</span>`;
        li.append(a);
        results.append(li);
      });
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") document.querySelector(".search-dialog").close();
    });
    document.querySelector(".search-clear")?.addEventListener("click", () => {
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    });
  };

  const initDirectoryFilters = () => {
    document.querySelectorAll("[data-directory-filter]").forEach((input) => {
      const root = input.closest("[data-directory-root]");
      if (!root) return;
      document.body.classList.add("directory-page");
      const cards = [...root.querySelectorAll("[data-directory-card]")];
      const groups = [...root.querySelectorAll("[data-directory-group]")];
      const status = root.querySelector("[data-directory-status]");
      const clear = root.querySelector("[data-directory-clear]");
      const label = root.dataset.directoryItemLabel || "items";
      const update = () => {
        const terms = input.value
          .trim()
          .toLocaleLowerCase()
          .split(/\s+/)
          .filter(Boolean);
        let visibleCount = 0;
        cards.forEach((card) => {
          const text = card.textContent.toLocaleLowerCase();
          const matches = terms.every((term) => text.includes(term));
          card.hidden = !matches;
          if (matches) visibleCount += 1;
        });
        groups.forEach((group) => {
          group.hidden = !group.querySelector("[data-directory-card]:not([hidden])");
        });
        if (clear) clear.disabled = terms.length === 0;
        if (status && terms.length) {
          status.textContent = visibleCount
            ? `Showing ${visibleCount} of ${cards.length} ${label}.`
            : `No matching ${label} found. Try a broader search or clear the filter.`;
        } else if (status) {
          status.textContent = `Showing all ${cards.length} ${label}.`;
        }
      };

      input.addEventListener("input", update);
      clear?.addEventListener("click", () => {
        input.value = "";
        update();
        input.focus();
      });
      root.querySelector(".directory-shortcuts")?.addEventListener("click", (event) => {
        const link = event.target.closest('a[href^="#"]');
        const target = link && root.querySelector(link.getAttribute("href"));
        if (target?.hidden && input.value) {
          input.value = "";
          update();
        }
      });
    });
  };

  const initSolutionSuggestions = () => {
    if (!location.pathname.startsWith("/solutions/")) return;
    const hero = document.querySelector("main .hero");
    if (!hero) return;

    const solutionPages = [
      { title: "All solutions", href: "/solutions/" },
      { title: "Business IT", href: "/solutions/business-it-solutions.html" },
      { title: "Office setup", href: "/solutions/office-it-setup.html" },
      { title: "Security", href: "/solutions/security-surveillance.html" },
      { title: "Attendance", href: "/solutions/attendance-management.html" },
      { title: "Web & digital", href: "/solutions/web-digital-solutions.html" }
    ];
    const currentPath = location.pathname === "/solutions/index.html"
      ? "/solutions/"
      : location.pathname;
    const section = document.createElement("section");
    section.className = "solution-suggestions";
    section.setAttribute("aria-label", "Explore other solutions");

    const container = document.createElement("div");
    container.className = "container solution-suggestions__inner";
    const label = document.createElement("span");
    label.className = "solution-suggestions__label";
    label.textContent = "Explore solutions";
    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Solution pages");

    solutionPages.forEach(({ title, href }) => {
      if (href === currentPath) {
        const current = document.createElement("span");
        current.className = "solution-suggestions__current";
        current.setAttribute("aria-current", "page");
        current.textContent = title;
        nav.append(current);
        return;
      }
      const link = document.createElement("a");
      link.href = href;
      link.textContent = title;
      nav.append(link);
    });

    container.append(label, nav);
    section.append(container);
    hero.insertAdjacentElement("afterend", section);
  };

  const initProductBrands = () => {
    const path = location.pathname;
    if (!path.startsWith("/products/") && !path.startsWith("/rentals/")) return;
    const hero = document.querySelector("main .hero");
    if (!hero) return;

    const brands = [
      ["HP", "hp"],
      ["Dell", "dell"],
      ["Lenovo", "lenovo"],
      ["acer", "acer"],
      ["ASUS", "asus"],
      ["HIKVISION", "hikvision"],
      ["CP PLUS", "cp"],
      ["CISCO", "cisco"],
      ["D-Link", "dlink"],
      ["Microsoft", "microsoft"]
    ];
    const section = document.createElement("section");
    section.className = "section about-partners product-brands";
    section.setAttribute("aria-label", "Product brands");
    const container = document.createElement("div");
    container.className = "container";
    const list = document.createElement("ul");
    list.className = "about-partners__list product-brands__list";
    list.setAttribute("aria-label", "Brand logos");

    brands.forEach(([name, style]) => {
      const item = document.createElement("li");
      item.className = `partner-wordmark partner-wordmark--${style}`;
      item.textContent = name;
      list.append(item);
    });

    container.append(list);
    section.append(container);
    hero.insertAdjacentElement("afterend", section);
  };

  const initEnquiries = () => {
    document.querySelectorAll("[data-whatsapp]").forEach((link) => {
      const message = link.dataset.whatsappMessage || makeMessage(link.dataset.subject || "general enquiry");
      applyWhatsApp(link, message);
    });
    const contactFields = [
      { name: "Email", type: "email", autocomplete: "email", optional: true },
      { name: "Phone", type: "tel", autocomplete: "tel", required: true },
      { name: "City", type: "text", autocomplete: "address-level2", required: true },
      { name: "Company name", type: "text", autocomplete: "organization", optional: true }
    ];
    document.querySelectorAll("form[data-enquiry]").forEach((form, formIndex) => {
      const grid = form.querySelector(".form-grid");
      const submitField = form.querySelector('button[type="submit"]')?.closest(".field");
      if (grid && submitField) {
        contactFields.forEach((field, fieldIndex) => {
          const wrapper = document.createElement("div");
          wrapper.className = "field";
          const id = `enquiry-contact-${formIndex}-${fieldIndex}`;
          const label = document.createElement("label");
          label.htmlFor = id;
          label.textContent = `${field.name}${field.optional ? " (optional)" : ""}`;
          const input = document.createElement("input");
          input.id = id;
          input.name = field.name;
          input.type = field.type;
          input.autocomplete = field.autocomplete;
          if (field.required) input.required = true;
          wrapper.append(label, input);
          grid.insertBefore(wrapper, submitField);
        });
      }

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const output = form.querySelector("[aria-live]");
        if (!form.reportValidity()) return;
        const fields = Object.fromEntries(new FormData(form).entries());
        const subject = form.dataset.enquiry;
        const message = makeMessage(subject, fields);
        const href = hrefForWhatsApp(message);
        if (!href) {
          if (output) output.textContent = `WhatsApp contact details have not been configured yet. Please email ${config.email} or use the contact page.`;
          return;
        }
        if (output) output.textContent = "Your enquiry is ready to send in WhatsApp.";
        window.location.assign(href);
      });
    });
  };

  const initUtilities = () => {
    document.querySelectorAll("[data-year]").forEach((element) => { element.textContent = new Date().getFullYear(); });
    const topButton = document.querySelector(".back-to-top");
    const updateFloatingControls = () => {
      const active = document.activeElement;
      const editing = active && active.matches("input, select, textarea");
      document.body.classList.toggle("page-form-active", Boolean(editing));
    };
    document.addEventListener("focusin", updateFloatingControls);
    document.addEventListener("focusout", () => setTimeout(updateFloatingControls, 0));
    if (topButton) {
      window.addEventListener("scroll", () => topButton.classList.toggle("is-visible", window.scrollY > 500), { passive: true });
      topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    const configuredWebsite = config.website.replace(/\/$/, "");
    const rebaseUrl = (value) => value.startsWith("https://hdinitial.com")
      ? `${configuredWebsite}${value.slice("https://hdinitial.com".length)}`
      : value;
    if (canonical && config.website) {
      const pagePath = canonical.getAttribute("href").replace(/^https?:\/\/[^/]+/i, "");
      canonical.href = new URL(pagePath || "/", config.website).href;
    }
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl && config.website) {
      ogUrl.content = new URL(location.pathname, config.website).href;
    }
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && config.website) ogImage.content = rebaseUrl(ogImage.content);
    document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
      const schema = JSON.parse(script.textContent);
      const rebaseSchemaUrls = (value) => {
        if (typeof value === "string") return rebaseUrl(value);
        if (Array.isArray(value)) return value.map(rebaseSchemaUrls);
        if (value && typeof value === "object") {
          Object.entries(value).forEach(([key, child]) => { value[key] = rebaseSchemaUrls(child); });
        }
        return value;
      };
      script.textContent = JSON.stringify(rebaseSchemaUrls(schema));
    });
    const startDate = document.querySelector("[data-rental-start]");
    const endDate = document.querySelector("[data-rental-end]");
    if (startDate && endDate) {
      const today = new Date();
      const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      startDate.min = localToday;
      endDate.min = localToday;
      startDate.addEventListener("change", () => {
        if (!startDate.value) {
          endDate.min = localToday;
          return;
        }
        const [year, month, day] = startDate.value.split("-").map(Number);
        const nextDay = new Date(year, month - 1, day + 1);
        endDate.min = `${nextDay.getFullYear()}-${String(nextDay.getMonth() + 1).padStart(2, "0")}-${String(nextDay.getDate()).padStart(2, "0")}`;
        if (endDate.value && endDate.value < endDate.min) endDate.value = "";
      });
    }
  };

  renderHeader();
  renderFooter();
  renderBranchLocations();
  initNavigation();
  initSearch();
  initImagery();
  initDirectoryFilters();
  initSolutionSuggestions();
  initProductBrands();
  initImpactStats();
  initEnquiries();
  initUtilities();
})();
