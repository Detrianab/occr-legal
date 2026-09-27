import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import emblem from "@/assets/occr-emblem.png";
import { CONTACT, useI18n } from "@/lib/i18n";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="inicio" className="relative min-h-[100svh] overflow-hidden surface-steel">
      {/* Capa 1 — trama cartográfica */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 32%, color-mix(in oklab, var(--navy) 12%, transparent) 0%, transparent 45%), radial-gradient(circle at 82% 78%, color-mix(in oklab, var(--navy) 10%, transparent) 0%, transparent 40%)",
        }}
      />
      {/* Capa 2 — rosa de los vientos */}
      <motion.img
        src={emblem.url}
        alt=""
        aria-hidden
        initial={{ opacity: 0, scale: 1.1, rotate: -8 }}
        animate={{ opacity: 0.12, scale: 1, rotate: 0 }}
        transition={{ duration: 2, ease }}
        className="pointer-events-none absolute -bottom-24 -right-24 h-[26rem] w-[26rem] object-contain md:h-[38rem] md:w-[38rem]"
      />
      {/* Capa 3 — líneas de rumbo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/3 h-px w-full rule-gold opacity-30" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-navy/5" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-24 pt-32 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease }}
          className="eyebrow text-navy/70"
        >
          {t("hero.eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 1, ease }}
          className="mt-6 max-w-4xl font-display text-4xl leading-[1.08] text-navy-deep sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t("hero.title1")}
          <span className="block text-navy">{t("hero.title2")}</span>
          <span className="block">{t("hero.title3")}</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1.1, ease }}
          className="mt-8 h-px w-56 origin-left rule-gold"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease }}
          className="mt-8 max-w-2xl text-[0.95rem] leading-relaxed text-navy/75 md:text-base"
        >
          {t("hero.lead")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="#agendar"
            className="group inline-flex items-center justify-center gap-3 bg-navy-deep px-7 py-4 text-[0.72rem] uppercase tracking-[0.2em] text-silver transition-colors hover:bg-navy"
          >
            {t("hero.cta")}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 border border-navy/25 px-7 py-4 text-[0.72rem] uppercase tracking-[0.2em] text-navy transition-colors hover:border-navy hover:bg-navy/5"
          >
            <MessageCircle size={15} />
            {t("hero.cta2")}
          </a>
        </motion.div>

        {/* Capa 4 — texto de apoyo inferior derecho */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-16 max-w-xs text-[0.68rem] uppercase leading-relaxed tracking-[0.16em] text-navy/50 md:absolute md:bottom-10 md:right-28 md:mt-0 md:text-right"
        >
          {t("hero.note")}
        </motion.p>
      </div>
    </section>
  );
}
