import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import emblem from "@/assets/occr-emblem.png";
import { useI18n } from "@/lib/i18n";

const links = [
  { id: "inicio", key: "nav.home" },
  { id: "sobre", key: "nav.about" },
  { id: "valores", key: "nav.values" },
  { id: "areas", key: "nav.services" },
  { id: "news", key: "nav.news" },
  { id: "oficina", key: "nav.office" },
  { id: "contacto", key: "nav.contact" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function SiteNav() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: resalta la sección visible
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.01, 0.25, 0.5] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-700 ${
        scrolled
          ? "border-b border-gold/25 bg-navy-deep/80 backdrop-blur-xl supports-[backdrop-filter]:bg-navy-deep/70"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3 md:px-10">
        <button onClick={() => go("inicio")} className="flex min-w-0 items-center gap-4 text-left">
          <img src={emblem} alt="OCCR Legal" className="h-14 w-14 shrink-0 object-contain md:h-16 md:w-16" />
          <span className="leading-none">
            <span
              className={`block font-display text-xl tracking-[0.18em] transition-colors md:text-2xl ${scrolled ? "text-silver" : "text-navy-deep"}`}
            >
              OCCR
            </span>
            <span
              className={`block text-[0.68rem] tracking-[0.35em] transition-colors ${scrolled ? "text-silver-dark" : "text-navy/60"}`}
            >
              LEGAL
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-5 xl:flex xl:gap-7">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`relative py-2 text-[0.78rem] uppercase tracking-[0.13em] transition-colors xl:text-[0.82rem] ${
                active === l.id
                  ? scrolled
                    ? "text-gold"
                    : "text-navy-deep"
                  : scrolled
                    ? "text-silver/70 hover:text-gold"
                    : "text-navy/65 hover:text-navy"
              }`}
            >
              {t(l.key)}
              {active === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  className="absolute -bottom-0.5 left-0 h-px w-full bg-gold"
                />
              )}
            </button>
          ))}

          {/* Selector de idiomas con banderas SVG (Escritorio) */}
          <div
            className={`flex items-center gap-1.5 border px-1.5 py-0.5 transition-colors ${scrolled ? "border-silver/25" : "border-navy/20"}`}
          >
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`flex items-center gap-1.5 px-2 py-0.5 text-[0.7rem] uppercase tracking-[0.15em] transition-colors ${
                  lang === l
                    ? "bg-gold text-navy-deep font-medium"
                    : scrolled
                      ? "text-silver/70 hover:text-gold"
                      : "text-navy/60 hover:text-navy"
                }`}
              >
                {l === "es" ? (
                  <svg className="h-3 w-4.5 rounded-sm object-cover shadow-sm" viewBox="0 0 750 500" aria-label="Español">
                    <rect width="750" height="500" fill="#c60b1e"/>
                    <rect width="750" height="250" y="125" fill="#ffc400"/>
                  </svg>
                ) : (
                  <svg className="h-3 w-4.5 rounded-sm object-cover shadow-sm" viewBox="0 0 740 390" aria-label="English">
                    <rect width="740" height="390" fill="#b22234"/>
                    <path d="M0 30h740M0 90h740M0 150h740M0 210h740M0 270h740M0 330h740" stroke="#fff" strokeWidth="30"/>
                    <rect width="296" height="210" fill="#3c3b6e"/>
                  </svg>
                )}
                <span>{l.toUpperCase()}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => go("agendar")}
            className={`group inline-flex items-center gap-2 border px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] transition-colors ${
              scrolled
                ? "border-gold/70 text-gold hover:bg-gold hover:text-navy-deep"
                : "border-navy/30 text-navy hover:border-navy-deep hover:bg-navy-deep hover:text-silver"
            }`}
          >
            {t("nav.book")}
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <button
          className={`shrink-0 xl:hidden ${scrolled ? "text-silver" : "text-navy-deep"}`}
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="surface-navy border-t border-gold/20 px-6 pb-7 pt-3 xl:hidden"
          >
            {links.map((l, i) => (
              <motion.button
                key={l.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: EASE }}
                onClick={() => go(l.id)}
                className={`flex w-full items-center justify-between border-b border-silver/10 py-3.5 text-left text-sm tracking-[0.12em] ${
                  active === l.id ? "text-gold" : "text-silver/85"
                }`}
              >
                {t(l.key)}
                <ArrowRight size={14} className="opacity-40" />
              </motion.button>
            ))}
            <div className="mt-5 flex items-center justify-between gap-3">
              {/* Selector de idiomas con banderas SVG (Móvil) */}
              <div className="flex gap-1 border border-silver/25 px-1.5 py-0.5">
                {(["es", "en"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.15em] ${
                      lang === l ? "bg-gold text-navy-deep font-medium" : "text-silver/70"
                    }`}
                  >
                    {l === "es" ? (
                      <svg className="h-3 w-4.5 rounded-sm object-cover shadow-sm" viewBox="0 0 750 500" aria-label="Español">
                        <rect width="750" height="500" fill="#c60b1e"/>
                        <rect width="750" height="250" y="125" fill="#ffc400"/>
                      </svg>
                    ) : (
                      <svg className="h-3 w-4.5 rounded-sm object-cover shadow-sm" viewBox="0 0 740 390" aria-label="English">
                        <rect width="740" height="390" fill="#b22234"/>
                        <path d="M0 30h740M0 90h740M0 150h740M0 210h740M0 270h740M0 330h740" stroke="#fff" strokeWidth="30"/>
                        <rect width="296" height="210" fill="#3c3b6e"/>
                      </svg>
                    )}
                    <span>{l.toUpperCase()}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => go("agendar")}
                className="border border-gold/70 px-4 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-gold"
              >
                {t("nav.book")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}