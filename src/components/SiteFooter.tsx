import { Linkedin, Instagram, MessageCircle, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import emblem from "@/assets/occr-emblem.png";
import { Globe } from "@/components/ui/globe";
import { Reveal } from "@/components/ui/reveal";
import { CONTACT, useI18n } from "@/lib/i18n";

const nav = [
  { id: "sobre", key: "nav.about" },
  { id: "valores", key: "nav.values" },
  { id: "areas", key: "nav.services" },
  { id: "news", key: "nav.news" },
  { id: "agendar", key: "nav.book" },
  { id: "contacto", key: "nav.contact" },
  { id: "oficina", key: "nav.office" },
];

export function SiteFooter() {
  const { t, lang } = useI18n();
  const es = lang === "es";

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <footer className="relative overflow-hidden surface-navy pt-24">
      {/* Globo terráqueo — alcance internacional de la firma */}
      <div className="pointer-events-none absolute -top-24 right-[-6rem] hidden w-[36rem] opacity-[0.28] md:block lg:right-[-2rem]">
        <div className="pointer-events-auto">
          <Globe />
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 10%, color-mix(in oklab, var(--gold) 9%, transparent) 0%, transparent 42%)",
        }}
      />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px rule-gold opacity-70" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <Reveal className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="flex items-center gap-4">
              <img src={emblem} alt="" className="h-16 w-16 object-contain" />
              <div>
                <p className="font-display text-2xl tracking-[0.22em] text-silver">OCCR</p>
                <p className="mt-1 text-[0.6rem] tracking-[0.4em] text-silver-dark">LEGAL</p>
              </div>
            </div>
            <p className="mt-8 max-w-lg font-display text-2xl leading-snug text-silver/90 md:text-3xl">
              {es
                ? "Derecho marítimo, comercio exterior y arbitraje con estándar internacional."
                : "Maritime law, foreign trade and arbitration at international standard."}
            </p>
            <div className="mt-8 h-px w-40 rule-gold" />

            <ul className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
              <li className="flex gap-3 text-silver/75">
                <MapPin size={16} strokeWidth={1.3} className="mt-0.5 shrink-0 text-gold" />
                <span className="leading-relaxed">{CONTACT.address}</span>
              </li>
              <li className="space-y-3">
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-silver/75 transition-colors hover:text-gold"
                >
                  <Phone size={16} strokeWidth={1.3} className="shrink-0 text-gold" />
                  {CONTACT.phoneDisplay}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-silver/75 transition-colors hover:text-gold"
                >
                  <Mail size={16} strokeWidth={1.3} className="shrink-0 text-gold" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="relative grid gap-10 sm:grid-cols-2">
            <div>
              <p className="eyebrow text-silver-dark">{es ? "Navegación" : "Navigation"}</p>
              <ul className="mt-6 space-y-3">
                {nav.map((l) => (
                  <li key={l.id}>
                    <button
                      onClick={() => go(l.id)}
                      className="group inline-flex items-center gap-2 text-[0.82rem] tracking-[0.06em] text-silver/75 transition-colors hover:text-gold"
                    >
                      <span className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-4" />
                      {t(l.key)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow text-silver-dark">{es ? "Canales directos" : "Direct channels"}</p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between gap-2 border border-silver/25 px-4 py-3 text-[0.68rem] uppercase tracking-[0.16em] text-silver/85 transition-colors hover:border-gold hover:text-gold"
                >
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle size={14} /> WhatsApp
                  </span>
                  <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group inline-flex items-center justify-between gap-2 border border-silver/25 px-4 py-3 text-[0.68rem] uppercase tracking-[0.16em] text-silver/85 transition-colors hover:border-gold hover:text-gold"
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail size={14} /> Email
                  </span>
                  <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5" />
                </a>
                <span className="inline-flex items-center gap-2 border border-silver/12 px-4 py-3 text-[0.68rem] uppercase tracking-[0.16em] text-silver/40">
                  <Linkedin size={14} /> LinkedIn · {t("footer.soon")}
                </span>
                <span className="inline-flex items-center gap-2 border border-silver/12 px-4 py-3 text-[0.68rem] uppercase tracking-[0.16em] text-silver/40">
                  <Instagram size={14} /> Instagram · {t("footer.soon")}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="relative mt-16 border-t border-silver/12 pb-10 pt-8">
          <p className="max-w-3xl text-[0.72rem] leading-relaxed text-silver-dark/70">{t("footer.disclaimer")}</p>
          <div className="mt-6 flex flex-col gap-3 text-[0.7rem] tracking-[0.12em] text-silver-dark/60 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} OCCR Legal. {t("footer.rights")}</p>
            <p className="uppercase tracking-[0.2em] sm:pr-24">Caracas · Venezuela</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
