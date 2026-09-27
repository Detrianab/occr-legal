import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { credentials } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function About() {
  const { t, lang } = useI18n();

  const stats = [
    { value: "18", label: t("about.stat1") },
    { value: "10+", label: t("about.stat2") },
    { value: "04", label: t("about.stat3") },
  ];

  return (
    <section id="sobre" className="surface-navy py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow text-gold">{t("about.eyebrow")}</p>
          <h2 className="mt-5 font-display text-3xl text-silver md:text-5xl">{t("about.name")}</h2>
          <p className="mt-3 text-sm tracking-[0.12em] text-silver-dark">{t("about.role")}</p>
          <div className="mt-8 h-px w-40 rule-gold" />

          <div className="mt-8 space-y-5 text-[0.95rem] leading-relaxed text-silver/75">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <blockquote className="border-l border-gold/60 pl-5 font-display text-xl italic leading-snug text-silver md:text-2xl">
              {t("about.p3")}
            </blockquote>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-silver/15 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl text-gold md:text-5xl">{s.value}</p>
                <p className="mt-2 text-[0.68rem] uppercase leading-snug tracking-[0.14em] text-silver-dark">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="self-start border border-silver/15 bg-white/[0.03] p-8 backdrop-blur-sm"
        >
          <p className="eyebrow text-silver-dark">{t("about.credentials")}</p>
          <ul className="mt-6 space-y-4">
            {credentials[lang].map((c) => (
              <li key={c} className="flex gap-3 text-sm leading-relaxed text-silver/80">
                <Check size={15} className="mt-1 shrink-0 text-gold" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
