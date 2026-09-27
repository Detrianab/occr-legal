import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import emblem from "@/assets/occr-emblem.png";
import { useI18n } from "@/lib/i18n";

const links = [
  { id: "inicio", key: "nav.home" },
  { id: "sobre", key: "nav.about" },
  { id: "areas", key: "nav.services" },
  { id: "oficina", key: "nav.office" },
];

export function SiteNav() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "surface-navy shadow-[0_1px_0_0_color-mix(in_oklab,var(--gold)_35%,transparent)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <button onClick={() => go("inicio")} className="flex items-center gap-3 text-left">
          <img src={emblem.url} alt="OCCR & Asociados" className="h-10 w-10 object-contain" />
          <span className="leading-none">
            <span className={`block font-display text-lg tracking-[0.18em] ${scrolled ? "text-silver" : "text-navy-deep"}`}>OCCR &amp;</span>
            <span className={`block text-[0.6rem] tracking-[0.35em] ${scrolled ? "text-silver-dark" : "text-navy/60"}`}>ASOCIADOS · LEGAL</span>
          </span>
        </button>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`text-[0.72rem] uppercase tracking-[0.18em] transition-colors hover:text-gold ${scrolled ? "text-silver/80" : "text-navy/70"}`}
            >
              {t(l.key)}
            </button>
          ))}
          <div className={`flex items-center gap-1 border px-1 py-0.5 ${scrolled ? "border-silver/25" : "border-navy/20"}`}>
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.15em] transition-colors ${
                  lang === l
                    ? "bg-gold text-navy-deep"
                    : scrolled
                      ? "text-silver/70 hover:text-gold"
                      : "text-navy/60 hover:text-navy"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            onClick={() => go("agendar")}
            className={`border px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] transition-colors ${scrolled ? "border-gold/70 text-gold hover:bg-gold hover:text-navy-deep" : "border-navy/30 text-navy hover:bg-navy-deep hover:text-silver hover:border-navy-deep"}`}
          >
            {t("nav.book")}
          </button>
        </div>

        <button className={`lg:hidden ${scrolled ? "text-silver" : "text-navy-deep"}`} onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="surface-navy border-t border-silver/10 px-6 pb-6 pt-2 lg:hidden">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="block w-full border-b border-silver/10 py-3 text-left text-sm tracking-[0.12em] text-silver/85"
            >
              {t(l.key)}
            </button>
          ))}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-1 border border-silver/25 px-1 py-0.5">
              {(["es", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 text-[0.65rem] uppercase tracking-[0.15em] ${
                    lang === l ? "bg-gold text-navy-deep" : "text-silver/70"
                  }`}
                >
                  {l}
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
        </div>
      )}
    </header>
  );
}
