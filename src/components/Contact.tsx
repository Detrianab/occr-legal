import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { CONTACT, useI18n } from "@/lib/i18n";

export function Contact() {
  const { t, lang } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const valid = form.name && form.email && form.message;

  const body = () => {
    return lang === "es"
      ? `Mensaje desde occr.legal\n\nNombre: ${form.name}\nCorreo: ${form.email}\n\nMensaje:\n${form.message}`
      : `Message from occr.legal\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
  };

  const submit = (channel: "wa" | "mail") => {
    if (!valid) {
      toast.error(t("contact.required"));
      return;
    }
    const text = encodeURIComponent(body());
    if (channel === "wa") {
      window.open(`https://wa.me/${CONTACT.whatsapp}?text=${text}`, "_blank");
    } else {
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
        lang === "es" ? "Mensaje desde occr.legal" : "Message from occr.legal",
      )}&body=${text}`;
    }
    toast.success(t("contact.sent"));
  };

  const field =
    "w-full border border-border bg-card px-4 py-3 text-sm text-navy-deep outline-none transition-colors placeholder:text-muted-foreground focus:border-navy";

  const items = [
    { icon: Phone, label: CONTACT.phoneDisplay, href: `tel:${CONTACT.phoneDisplay.replace(/\s/g, "")}` },
    { icon: Mail, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MapPin, label: t("office.directions"), href: CONTACT.mapsUrl },
  ];

  return (
    <section id="contacto" className="surface-steel py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow text-navy/60">{t("contact.eyebrow")}</p>
          <h2 className="mt-5 font-display text-3xl text-navy-deep md:text-5xl">{t("contact.title")}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-navy/70">{t("contact.intro")}</p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-start gap-4"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-navy/15 bg-card text-navy-deep transition-colors group-hover:border-navy/40">
                  <item.icon size={18} />
                </span>
                <span className="mt-2 text-sm leading-relaxed text-navy/80 transition-colors group-hover:text-navy-deep">
                  {item.label}
                </span>
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-4 border border-border bg-card/80 p-6 backdrop-blur-sm md:p-8"
          >
            <input
              className={field}
              placeholder={t("contact.name")}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className={field}
              type="email"
              placeholder={t("contact.email")}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <textarea
              className={`${field} min-h-32 resize-y`}
              placeholder={t("contact.message")}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => submit("wa")}
                className="inline-flex flex-1 items-center justify-center gap-3 bg-navy-deep px-6 py-4 text-[0.72rem] uppercase tracking-[0.2em] text-silver transition-colors hover:bg-navy"
              >
                <MessageCircle size={15} />
                {t("contact.submit")}
              </button>
              <button
                onClick={() => submit("mail")}
                className="inline-flex items-center justify-center gap-3 border border-navy/25 px-6 py-4 text-[0.72rem] uppercase tracking-[0.2em] text-navy transition-colors hover:border-navy hover:bg-navy/5"
              >
                <Mail size={15} />
                {t("contact.submitEmail")}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
