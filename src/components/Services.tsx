import { motion } from "framer-motion";
import { Anchor, Ship, Building2, Scale, FileText, ArrowRight, Merge, ShieldCheck, Copyright } from "lucide-react";
import { services } from "@/lib/content";
import { Reveal, TextReveal } from "@/components/ui/reveal";
import { useI18n } from "@/lib/i18n";

const icons: Record<string, React.ElementType> = {
  maritimo: Ship,
  comercio: Anchor,
  corporativo: Building2,
  arbitraje: Scale,
  complementarios: FileText,
  fusiones: Merge,
  cumplimiento: ShieldCheck,
  propiedad: Copyright,
};

export function Services() {
  const { t, lang } = useI18n();
  const es = lang === "es";

  return (
    <section id="areas" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="eyebrow text-navy/60">{t("services.eyebrow")}</p>
          <h2 className="mt-5 max-w-3xl font-display text-3xl leading-tight text-navy-deep md:text-5xl">
            <TextReveal text={t("services.title")} />
          </h2>
          <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
            {t("services.intro")}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.key] ?? FileText;
            return (
              <motion.article
                key={s.key}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col bg-card p-8 transition-colors hover:bg-secondary"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 rule-gold transition-transform duration-700 group-hover:scale-x-100"
                />
                <span className="absolute right-8 top-8 font-display text-sm text-navy/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon size={26} strokeWidth={1.2} className="text-navy transition-colors group-hover:text-gold" />
                <h3 className="mt-6 font-display text-2xl text-navy-deep">{s.title[lang]}</h3>
                <div className="mt-4 h-px w-12 bg-gold" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.summary[lang]}</p>
                <ul className="mt-6 space-y-2">
                  {s.items[lang].map((it) => (
                    <li key={it} className="flex gap-3 text-[0.82rem] leading-relaxed text-navy/70">
                      <span className="mt-2 h-px w-3 shrink-0 bg-navy/40" />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}

          {/* Celda final: panel de acción — evita el espacio vacío de la retícula */}
          <motion.aside
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: services.length * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col justify-between overflow-hidden surface-navy p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 80% 15%, color-mix(in oklab, var(--gold) 16%, transparent) 0%, transparent 45%)",
              }}
            />
            <div className="relative">
              <p className="eyebrow text-gold">{es ? "Asesoría a medida" : "Tailored counsel"}</p>
              <p className="mt-6 font-display text-2xl leading-snug text-silver md:text-[1.75rem]">
                {es
                  ? "¿Su operación combina varias de estas áreas? La atendemos como un solo expediente."
                  : "Does your operation span several of these areas? We handle it as a single matter."}
              </p>
              <div className="mt-6 h-px w-16 rule-gold" />
              <p className="mt-6 text-sm leading-relaxed text-silver/70">
                {es
                  ? "Diagnóstico inicial sin costo de exploración: revisamos su contrato, embarque o estructura societaria y le indicamos la ruta técnica."
                  : "Complimentary initial assessment: we review your contract, shipment or corporate structure and outline the technical route."}
              </p>
            </div>
            <a
              href="#agendar"
              className="group relative mt-10 inline-flex items-center justify-between gap-3 border border-gold/60 px-6 py-4 text-[0.7rem] uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-navy-deep"
            >
              {es ? "Agendar diagnóstico" : "Schedule assessment"}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
