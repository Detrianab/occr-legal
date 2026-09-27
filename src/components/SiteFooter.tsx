import { Linkedin, Instagram, MessageCircle, Mail } from "lucide-react";
import emblem from "@/assets/occr-emblem.png";
import { CONTACT, useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="surface-navy pb-10 pt-20">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col gap-10 border-b border-silver/15 pb-10 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4">
            <img src={emblem} alt="" className="h-14 w-14 object-contain" />
            <div>
              <p className="font-display text-xl tracking-[0.2em] text-silver">OCCR &amp;</p>
              <p className="text-[0.62rem] tracking-[0.38em] text-silver-dark">ASOCIADOS · LEGAL</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-silver/25 px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-silver/85 transition-colors hover:border-gold hover:text-gold"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 border border-silver/25 px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-silver/85 transition-colors hover:border-gold hover:text-gold"
            >
              <Mail size={14} /> Email
            </a>
            <span className="inline-flex items-center gap-2 border border-silver/15 px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-silver/40">
              <Linkedin size={14} /> LinkedIn · {t("footer.soon")}
            </span>
            <span className="inline-flex items-center gap-2 border border-silver/15 px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-silver/40">
              <Instagram size={14} /> Instagram · {t("footer.soon")}
            </span>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-[0.72rem] leading-relaxed text-silver-dark/70">
          {t("footer.disclaimer")}
        </p>
        <p className="mt-6 text-[0.7rem] tracking-[0.12em] text-silver-dark/60">
          © {new Date().getFullYear()} OCCR &amp; Asociados. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
