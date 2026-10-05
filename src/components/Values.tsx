import { motion } from "framer-motion";
import { ShieldCheck, Compass, Landmark, Globe2, Gavel, Handshake } from "lucide-react";
import contractImg from "@/assets/contract-signing.png";
import { Reveal, TextReveal, Parallax } from "@/components/ui/reveal";
import { useI18n } from "@/lib/i18n";

const pillars = [
  {
    icon: Landmark,
    title: { es: "Conocimiento del sistema desde adentro", en: "The system understood from within" },
    body: {
      es: "18 años de servicio en el Poder Judicial Venezolano nos permiten anticipar tiempos, criterios y riesgos procesales antes de que se materialicen.",
      en: "18 years of service in the Venezuelan Judicial Branch let us anticipate timelines, criteria and procedural risk before it materializes.",
    },
  },
  {
    icon: ShieldCheck,
    title: { es: "Prevención antes que litigio", en: "Prevention over litigation" },
    body: {
      es: "Blindamos contratos, estructuras y operaciones en su origen. El mejor juicio es el que nunca fue necesario.",
      en: "We reinforce contracts, structures and operations at the source. The best case is the one never needed.",
    },
  },
  {
    icon: Globe2,
    title: { es: "Estándar internacional", en: "International standard" },
    body: {
      es: "Cumplimiento OFAC, comercio exterior y arbitraje transfronterizo con interlocución en español e inglés.",
      en: "OFAC compliance, foreign trade and cross-border arbitration, handled in Spanish and English.",
    },
  },
  {
    icon: Compass,
    title: { es: "Estrategia, no formularios", en: "Strategy, not templates" },
    body: {
      es: "Cada asunto se estudia sobre su propia ingeniería jurídica: hechos, jurisdicción, prueba y ruta de ejecución.",
      en: "Every matter is engineered on its own terms: facts, jurisdiction, evidence and enforcement path.",
    },
  },
  {
    icon: Gavel,
    title: { es: "Rigor técnico verificable", en: "Verifiable technical rigor" },
    body: {
      es: "Fundamentación documentada, trazabilidad de cada decisión y criterios sostenibles ante cualquier foro.",
      en: "Documented reasoning, traceable decisions and criteria that hold before any forum.",
    },
  },
  {
    icon: Handshake,
    title: { es: "Confidencialidad y trato directo", en: "Confidentiality and direct access" },
    body: {
      es: "El cliente habla con quien decide. Reserva absoluta sobre la información y las operaciones encomendadas.",
      en: "Clients speak with the decision-maker. Absolute reserve over entrusted information and operations.",
    },
  },
];

export function Values() {
  const { lang } = useI18n();
  const es = lang === "es";

  return (
    <section id="valores" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 8%, color-mix(in oklab, var(--gold) 10%, transparent) 0%, transparent 42%), radial-gradient(circle at 4% 92%, color-mix(in oklab, var(--navy) 8%, transparent) 0%, transparent 40%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-navy/60">{es ? "Sobre OCCR Legal" : "About OCCR Legal"}</p>
            <h2 className="mt-5 font-display text-3xl leading-[1.12] text-navy-deep md:text-5xl">
              <TextReveal
                text={
                  es
                    ? "Presencia corporativa fundamentada en el criterio técnico, la excelencia estratégica y la gestión integral del riesgo."
                    : "Corporate presence grounded in technical judgment, strategic excellence and comprehensive risk management."
                }
              />
            </h2>
            <div className="mt-7 h-px w-40 rule-gold" />
            <div className="mt-7 space-y-5 text-[0.95rem] leading-relaxed text-muted-foreground">
              <p>
                {es
                   ? "OCCR Legal es una firma de servicios jurídicos especializados con sede en Caracas, orientada a la consultoría, protección patrimonial y representación estratégica de empresas navieras, importadores, exportadores, actores del sector marítimo-portuario, grupos corporativos e inversionistas internacionales. Operamos bajo un modelo de alta efectividad, acompañamiento directo y responsabilidad absoluta: prescindimos de la intermediación operativa para garantizar que cada asunto sea diseñado, conducido y ejecutado personalmente por sus socios principales."
                    : "OCCR Legal is a specialized legal services firm based in Caracas, focused on consulting, asset protection and strategic representation for shipping companies, importers, exporters, maritime and port operators, corporate groups and international investors. We operate through a model of high effectiveness, direct counsel and absolute accountability: each matter is personally designed, led and executed by the firm’s principal partners."}
              </p>
              <p>
                {es
                   ? "Nuestra práctica integra el Derecho Corporativo, el Gobierno Corporativo, el Derecho de la Navegación, el Comercio Exterior, la Contratación Internacional y el Arbitraje Comercial como un sistema articulado de blindaje operativo y resolución compleja de controversias, resguardando la continuidad y rentabilidad de los negocios de nuestros clientes."
                   : "Our practice integrates Corporate Law, Corporate Governance, Navigation Law, Foreign Trade, International Contracting and Commercial Arbitration as a coordinated system for operational protection and complex dispute resolution, safeguarding the continuity and profitability of our clients’ businesses."}
              </p>
            </div>
          </Reveal>

          <Parallax distance={34}>
            <Reveal delay={0.1} className="relative">
              <div className="absolute -left-4 -top-4 hidden h-24 w-24 border-l border-t border-gold/50 md:block" />
              <div className="absolute -bottom-4 -right-4 hidden h-24 w-24 border-b border-r border-gold/50 md:block" />
              <div className="relative overflow-hidden border border-border shadow-[0_40px_90px_-50px_color-mix(in_oklab,var(--navy)_75%,transparent)]">
                <img
                  src={contractImg}
                  alt={
                    es
                      ? "Firma de contrato durante una asesoría legal corporativa"
                      : "Contract signing during corporate legal counsel"
                  }
                  loading="lazy"
                  className="h-[26rem] w-full object-cover object-center saturate-[0.75] md:h-[34rem]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, color-mix(in oklab, var(--navy-deep) 82%, transparent) 0%, transparent 58%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="eyebrow text-gold">{es ? "Lo que nos distingue" : "What sets us apart"}</p>
                  <p className="mt-3 max-w-md font-display text-xl leading-snug text-silver md:text-2xl">
                    {es
                      ? "Documentos que resisten auditoría, arbitraje y tribunal."
                      : "Documents that withstand audit, arbitration and court."}
                  </p>
                </div>
              </div>
            </Reveal>
          </Parallax>
        </div>

        <Reveal className="mt-20" delay={0.05}>
          <p className="eyebrow text-navy/60">
            {es ? "Diferenciadores y valores corporativos" : "Differentiators and corporate values"}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.article
              key={p.title.es}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden bg-card p-8"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 rule-gold transition-transform duration-700 group-hover:scale-x-100"
              />
              <p.icon size={24} strokeWidth={1.2} className="text-navy transition-colors group-hover:text-gold" />
              <h3 className="mt-6 font-display text-xl leading-snug text-navy-deep">{p.title[lang]}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body[lang]}</p>
              <span className="absolute right-7 top-7 font-display text-sm text-navy/20">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
