import { motion } from "framer-motion";
import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, useI18n } from "@/lib/i18n";

export function OfficeMap() {
  const { t } = useI18n();
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(
    "Multicentro Empresarial del Este, Torre Libertador, Chacao, Caracas",
  )}&output=embed`;

  return (
    <section id="oficina" className="bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow text-navy/60">{t("office.eyebrow")}</p>
          <h2 className="mt-5 font-display text-3xl text-navy-deep md:text-5xl">{t("office.title")}</h2>
          <div className="mt-6 h-px w-32 rule-gold" />

          <ul className="mt-8 space-y-6 text-sm">
            <li className="flex gap-4">
              <MapPin size={18} strokeWidth={1.3} className="mt-0.5 shrink-0 text-navy" />
              <span className="leading-relaxed text-navy/80">{CONTACT.address}</span>
            </li>
            <li className="flex gap-4">
              <Clock size={18} strokeWidth={1.3} className="mt-0.5 shrink-0 text-navy" />
              <span className="leading-relaxed text-navy/80">
                <span className="block eyebrow text-navy/50">{t("office.hours")}</span>
                <span className="mt-1 block">{t("office.hoursValue")}</span>
                <span className="mt-1 block text-muted-foreground">{t("office.intl")}</span>
              </span>
            </li>
            <li className="flex gap-4">
              <Phone size={18} strokeWidth={1.3} className="mt-0.5 shrink-0 text-navy" />
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="text-navy/80 underline-offset-4 hover:text-navy hover:underline"
              >
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-4">
              <Mail size={18} strokeWidth={1.3} className="mt-0.5 shrink-0 text-navy" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-navy/80 underline-offset-4 hover:text-navy hover:underline"
              >
                {CONTACT.email}
              </a>
            </li>
          </ul>

          <a
            href={CONTACT.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 border border-navy/25 px-6 py-3.5 text-[0.7rem] uppercase tracking-[0.2em] text-navy transition-colors hover:border-navy hover:bg-navy/5"
          >
            {t("office.directions")}
            <ExternalLink size={14} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden border border-border shadow-[0_20px_60px_-30px_color-mix(in_oklab,var(--navy)_60%,transparent)]"
        >
          <iframe
            title="OCCR & Asociados — Caracas"
            src={embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[22rem] w-full grayscale-[0.35] md:h-[30rem]"
          />
        </motion.div>
      </div>
    </section>
  );
}
