import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Clock, ExternalLink, Mail, MapPin, Maximize2, Minimize2, Phone } from "lucide-react";
import { Reveal, TextReveal } from "@/components/ui/reveal";
import { CONTACT, useI18n } from "@/lib/i18n";

export function OfficeMap() {
  const { t, lang } = useI18n();
  const es = lang === "es";
  const [expanded, setExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-160, 160], [5, -5]), { stiffness: 260, damping: 28 });
  const rotateY = useSpring(useTransform(mouseX, [-260, 260], [-5, 5]), { stiffness: 260, damping: 28 });

  const onMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };
  const onLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const embed = `https://www.google.com/maps?q=${encodeURIComponent(
    "Multicentro Empresarial del Este, Torre Libertador, Chacao, Caracas",
  )}&output=embed`;

  return (
    <section id="oficina" className="relative overflow-hidden surface-navy py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 90% 20%, color-mix(in oklab, var(--gold) 10%, transparent) 0%, transparent 45%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="eyebrow text-gold">{t("office.eyebrow")}</p>
          <h2 className="mt-5 font-display text-3xl text-silver md:text-5xl">
            <TextReveal text={t("office.title")} />
          </h2>
          <div className="mt-6 h-px w-32 rule-gold" />

          <ul className="mt-8 space-y-6 text-sm">
            <li className="flex gap-4">
              <MapPin size={18} strokeWidth={1.3} className="mt-0.5 shrink-0 text-gold" />
              <span className="leading-relaxed text-silver/80">{CONTACT.address}</span>
            </li>
            <li className="flex gap-4">
              <Clock size={18} strokeWidth={1.3} className="mt-0.5 shrink-0 text-gold" />
              <span className="leading-relaxed text-silver/80">
                <span className="block eyebrow text-silver-dark">{t("office.hours")}</span>
                <span className="mt-1 block">{t("office.hoursValue")}</span>
                <span className="mt-1 block text-silver-dark/80">{t("office.intl")}</span>
              </span>
            </li>
            <li className="flex gap-4">
              <Phone size={18} strokeWidth={1.3} className="mt-0.5 shrink-0 text-gold" />
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="text-silver/80 underline-offset-4 transition-colors hover:text-gold"
              >
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-4">
              <Mail size={18} strokeWidth={1.3} className="mt-0.5 shrink-0 text-gold" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-silver/80 underline-offset-4 transition-colors hover:text-gold"
              >
                {CONTACT.email}
              </a>
            </li>
          </ul>

          <a
            href={CONTACT.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex items-center gap-2 border border-gold/60 px-6 py-3.5 text-[0.7rem] uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-navy-deep"
          >
            {t("office.directions")}
            <ExternalLink size={14} />
          </a>
        </Reveal>

        <Reveal delay={0.12}>
          <motion.div
            ref={containerRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
            className="relative border border-silver/20 bg-white/[0.03] p-3 backdrop-blur-sm"
          >
            <div className="absolute -left-3 -top-3 h-16 w-16 border-l border-t border-gold/60" />
            <div className="absolute -bottom-3 -right-3 h-16 w-16 border-b border-r border-gold/60" />

            <div className="flex items-center justify-between px-2 pb-3 pt-1">
              <div>
                <p className="eyebrow text-silver-dark">{es ? "Sede principal" : "Head office"}</p>
                <p className="mt-1 text-[0.78rem] tracking-[0.1em] text-silver/80">
                  10.4959° N, 66.8532° W · Chacao
                </p>
              </div>
              <button
                onClick={() => setExpanded((v) => !v)}
                className="inline-flex items-center gap-2 border border-silver/25 px-3 py-2 text-[0.62rem] uppercase tracking-[0.16em] text-silver/80 transition-colors hover:border-gold hover:text-gold"
              >
                {expanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                {expanded ? (es ? "Reducir" : "Collapse") : es ? "Ampliar" : "Expand"}
              </button>
            </div>

            <motion.div
              animate={{ height: expanded ? 520 : 340 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden"
            >
              <iframe
                title="OCCR Legal — Caracas"
                src={embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full grayscale-[0.55] contrast-[1.05] brightness-[0.95] transition-all duration-700 hover:grayscale-0"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-multiply"
                style={{
                  background:
                    "linear-gradient(140deg, color-mix(in oklab, var(--navy) 22%, transparent), transparent 55%)",
                }}
              />
              <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-2 border border-gold/40 bg-navy-deep/80 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.18em] text-gold backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                OCCR Legal
              </span>
            </motion.div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
