import { motion } from "framer-motion";
import { Anchor, Ship, Building2, Scale, FileText } from "lucide-react";
import { services } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

const icons: Record<string, React.ElementType> = {
  maritimo: Ship,
  comercio: Anchor,
  corporativo: Building2,
  arbitraje: Scale,
  complementarios: FileText,
};

export function Services() {
  const { t, lang } = useI18n();

  return (
    <section id="areas" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="eyebrow text-navy/60">{t("services.eyebrow")}</p>
        <h2 className="mt-5 max-w-3xl font-display text-3xl leading-tight text-navy-deep md:text-5xl">
          {t("services.title")}
        </h2>
        <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
          {t("services.intro")}
        </p>

        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.key] ?? FileText;
            return (
              <motion.article
                key={s.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-card p-8 transition-colors hover:bg-secondary"
              >
                <span className="absolute right-8 top-8 font-display text-sm text-navy/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon size={26} strokeWidth={1.2} className="text-navy" />
                <h3 className="mt-6 font-display text-2xl text-navy-deep">{s.title[lang]}</h3>
                <div className="mt-4 h-px w-12 bg-gold" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.summary[lang]}</p>
                <ul className="mt-6 space-y-2">
                  {s.items[lang].map((it) => (
                    <li
                      key={it}
                      className="flex gap-3 text-[0.82rem] leading-relaxed text-navy/70"
                    >
                      <span className="mt-2 h-px w-3 shrink-0 bg-navy/40" />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
