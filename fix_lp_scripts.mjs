import fs from "fs";

const p = "lp/index.html";
let h = fs.readFileSync(p, "utf8");

const start = h.indexOf(
  '  <script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>'
);
if (start < 0) {
  // try without defer
  const alt = h.indexOf(
    '  <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>'
  );
  if (alt < 0) throw new Error("gsap script not found");
}

const startPos = start >= 0 ? start : h.indexOf(
  '  <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>'
);
const end = h.lastIndexOf("</body>");

const gsapBlockStart = h.indexOf("    /* Fullscreen 3D */");
const setTimeoutEnd =
  h.indexOf("    }, 2500);", h.indexOf("    setTimeout(() => {", gsapBlockStart)) +
  "    }, 2500);".length;
if (gsapBlockStart < 0 || setTimeoutEnd < 20) throw new Error("gsap core not found");
const core = h.slice(gsapBlockStart, setTimeoutEnd);

const newScripts = `  <script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
  <script defer>
    function waUrl(msg) {
      const n = String(window.PV_WA || "").replace(/\\D/g, "");
      const text = encodeURIComponent(msg || window.PV_WA_MSG || "");
      return \`https://wa.me/\${n}?text=\${text}\`;
    }
    document.querySelectorAll(".js-wa").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        window.open(waUrl(el.dataset.msg), "_blank", "noopener");
      });
    });

    const header = document.getElementById("header");
    const navToggle = document.getElementById("navToggle");
    const navBackdrop = document.getElementById("navBackdrop");
    const closeNav = () => {
      header?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
      navToggle?.setAttribute("aria-label", "Abrir menu");
      navBackdrop?.classList.remove("is-on");
      document.body.style.overflow = "";
    };
    const openNav = () => {
      header?.classList.add("is-open");
      navToggle?.setAttribute("aria-expanded", "true");
      navToggle?.setAttribute("aria-label", "Fechar menu");
      navBackdrop?.classList.add("is-on");
      document.body.style.overflow = "hidden";
    };
    if (navToggle && header) {
      navToggle.addEventListener("click", () => {
        if (header.classList.contains("is-open")) closeNav();
        else openNav();
      });
      navBackdrop?.addEventListener("click", closeNav);
      header.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", closeNav));
      window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeNav(); });
      window.addEventListener("resize", () => { if (window.innerWidth > 960) closeNav(); });
    }
    if (header) {
      const onScrollHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
      onScrollHeader();
      window.addEventListener("scroll", onScrollHeader, { passive: true });
    }

    const offerImg = document.getElementById("offerImg");
    const offerCaption = document.getElementById("offerCaption");
    document.querySelectorAll("#offerList .offer-item").forEach((item) => {
      item.addEventListener("click", () => {
        document.querySelectorAll("#offerList .offer-item").forEach((i) => i.classList.remove("is-active"));
        item.classList.add("is-active");
        if (offerImg) {
          offerImg.src = item.dataset.img;
          if (offerCaption) offerCaption.textContent = item.dataset.title;
        }
      });
    });

    document.querySelectorAll("#faqList .faq-item").forEach((item) => {
      const btn = item.querySelector("button");
      btn.addEventListener("click", () => {
        const open = item.classList.contains("is-open");
        document.querySelectorAll("#faqList .faq-item").forEach((i) => {
          i.classList.remove("is-open");
          i.querySelector("button span:last-child").textContent = "+";
        });
        if (!open) {
          item.classList.add("is-open");
          btn.querySelector("span:last-child").textContent = "−";
        }
      });
    });

    (function lazyModelViewer() {
      const shell = document.getElementById("modelShell");
      const mv = document.getElementById("pvModel");
      if (!shell || !mv) return;
      const boot = () => {
        const s = document.createElement("script");
        s.type = "module";
        s.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";
        s.onload = () => {
          if (mv.dataset.src) {
            mv.src = mv.dataset.src;
            mv.removeAttribute("data-src");
          }
          try { mv.dismissPoster?.(); } catch (_) {}
        };
        document.head.appendChild(s);
      };
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            boot();
          }
        }, { rootMargin: "240px" });
        io.observe(shell);
      } else boot();
    })();

    document.querySelectorAll("img").forEach((img) => {
      if (img.closest(".hero-media") || img.closest(".brand")) return;
      if (!img.getAttribute("loading")) img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");
    });

${core}
  </script>
`;

h = h.slice(0, startPos) + newScripts + h.slice(end);
fs.writeFileSync(p, h);
console.log("ok scripts rebuilt");
