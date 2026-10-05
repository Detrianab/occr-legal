import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Landmark, Newspaper, Search } from "lucide-react";
import { Reveal, TextReveal } from "@/components/ui/reveal";
import { useI18n } from "@/lib/i18n";
import tsjLogo from "@/assets/institutions/tsj.png";
import avdmLogo from "@/assets/institutions/avdm.png";
import cedcaLogo from "@/assets/institutions/cedca.png";
import ompiLogo from "@/assets/institutions/ompi.png";
import ciadiLogo from "@/assets/institutions/ciadi.png";
import cciLogo from "@/assets/institutions/cci.png";
import imoLogo from "@/assets/institutions/imo.png";

const resources = [
  { name: "Tribunal Supremo de Justicia", short: "TSJ", url: "https://www.tsj.gob.ve/", logo: tsjLogo},
  { name: "Asociación Venezolana de Derecho Marítimo", short: "AVDM", url: "https://avdm-cmi.com/", logo: avdmLogo },
  { name: "Centro Empresarial de Conciliación y Arbitraje", short: "CEDCA", url: "https://cedca.org.ve/", logo: cedcaLogo },
  { name: "Organización Mundial de la Propiedad Intelectual", short: "OMPI", url: "https://www.wipo.int/portal/es/", logo: ompiLogo },
  { name: "Centro Internacional de Arreglo de Diferencias Relativas a Inversiones", short: "CIADI", url: "https://icsid.worldbank.org/es/servicios/arbitraje", logo: ciadiLogo },
  { name: "Corte Internacional de Arbitraje de la CCI", short: "CCI", url: "https://iccwbo.org/dispute-resolution/dispute-resolution-services/icc-international-court-of-arbitration/", logo: cciLogo },
  { name: "International Maritime Organization", short: "IMO", url: "https://www.imo.org/", logo: imoLogo},
];

const editorial = [
  { icon: Newspaper, es: "Noticias", en: "News", esBody: "Actualidad jurídica y regulatoria relevante para la toma de decisiones empresariales.", enBody: "Legal and regulatory developments relevant to business decision-making." },
  { icon: BookOpen, es: "Publicaciones", en: "Publications", esBody: "Análisis técnico de normas, precedentes y tendencias de nuestras áreas de práctica.", enBody: "Technical analysis of rules, precedents and trends across our practice areas." },
  { icon: Search, es: "Investigaciones", en: "Research", esBody: "Estudios de profundidad sobre riesgos, operaciones y controversias de alta complejidad.", enBody: "In-depth studies on high-complexity risks, operations and disputes." },
];

export function News() {
  const { lang } = useI18n();
  const es = lang === "es";

  return (
    <section id="news" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="eyebrow text-navy/60">OCCR News</p>
          <h2 className="mt-5 max-w-4xl font-display text-3xl leading-tight text-navy-deep md:text-5xl">
            <TextReveal text={es ? "Conocimiento jurídico para decisiones de alto nivel" : "Legal knowledge for high-level decisions"} />
          </h2>
          <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
            {es ? "Un espacio editorial para noticias, publicaciones e investigaciones en las áreas de especialidad de OCCR Legal." : "An editorial space for news, publications and research across OCCR Legal’s specialist practice areas."}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">
          {editorial.map((item, index) => (
            <motion.article
              key={item.es}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="bg-card p-8"
            >
              <item.icon size={25} strokeWidth={1.2} className="text-gold" />
              <h3 className="mt-6 font-display text-2xl text-navy-deep">{es ? item.es : item.en}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{es ? item.esBody : item.enBody}</p>
              <p className="mt-8 text-[0.66rem] uppercase tracking-[0.18em] text-navy/45">{es ? "Próximamente" : "Coming soon"}</p>
            </motion.article>
          ))}
        </div>

        <Reveal className="mt-20">
          <div className="flex items-end justify-between gap-6 border-b border-navy/15 pb-6">
            <div>
              <p className="eyebrow text-navy/60">{es ? "Fuentes institucionales" : "Institutional resources"}</p>
              <h3 className="mt-3 font-display text-2xl text-navy-deep md:text-3xl">{es ? "Consulta directa" : "Direct access"}</h3>
            </div>
            <Landmark size={28} strokeWidth={1.1} className="shrink-0 text-gold" />
          </div>
          <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource, index) => (
              <a
                key={resource.short}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex min-h-64 flex-col bg-card p-6 transition-colors hover:bg-background ${index === resources.length - 1 ? "lg:col-span-2" : ""}`}
              >
                <span className="flex h-28 w-full items-center justify-center border-b border-navy/10 pb-5">
                  <img
                    src={resource.logo}
                    alt={`${resource.name} logo`}
                    loading="lazy"
                    className="max-h-20 max-w-[88%] object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </span>
                <span className="mt-5 flex flex-1 items-end justify-between gap-4">
                  <span>
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold">{resource.short}</span>
                    <span className="mt-2 block text-sm leading-snug text-navy transition-colors group-hover:text-navy-deep">{resource.name}</span>
                  </span>
                  <ArrowUpRight size={16} className="mb-0.5 shrink-0 text-navy/45 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" />
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}