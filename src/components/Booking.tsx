import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { CONTACT, useI18n } from "@/lib/i18n";

const HOURS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export function Booking() {
  const { t, lang } = useI18n();
  const [type, setType] = useState("type1");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    date: "",
    time: "",
    matter: "",
  });

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const types = [
    { id: "type1", title: t("book.type1"), desc: t("book.type1d") },
    { id: "type2", title: t("book.type2"), desc: t("book.type2d") },
    { id: "type3", title: t("book.type3"), desc: t("book.type3d") },
  ];

  const isWeekend = (d: string) => {
    if (!d) return false;
    const day = new Date(`${d}T12:00:00`).getDay();
    return day === 0 || day === 6;
  };

  const message = () => {
    const label = types.find((x) => x.id === type)?.title ?? "";
    return lang === "es"
      ? `Solicitud de consulta — OCCR & Asociados\n\nModalidad: ${label}\nNombre: ${form.name}\nEmpresa: ${form.company || "—"}\nCorreo: ${form.email}\nFecha solicitada: ${form.date}\nHora solicitada: ${form.time} (hora de Venezuela)\n\nAsunto:\n${form.matter}`
      : `Consultation request — OCCR & Associates\n\nType: ${label}\nName: ${form.name}\nCompany: ${form.company || "—"}\nEmail: ${form.email}\nRequested date: ${form.date}\nRequested time: ${form.time} (Venezuela time)\n\nMatter:\n${form.matter}`;
  };

  const valid = form.name && form.email && form.date && form.time && form.matter && !isWeekend(form.date);

  const submit = (channel: "wa" | "mail") => {
    if (!valid) {
      toast.error(t("book.required"));
      return;
    }
    const body = encodeURIComponent(message());
    if (channel === "wa") {
      window.open(`https://wa.me/${CONTACT.whatsapp}?text=${body}`, "_blank");
    } else {
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
        lang === "es" ? "Solicitud de consulta — OCCR & Asociados" : "Consultation request — OCCR & Associates",
      )}&body=${body}`;
    }
    toast.success(t("book.sent"));
  };

  const field =
    "w-full border border-border bg-card px-4 py-3 text-sm text-navy-deep outline-none transition-colors placeholder:text-muted-foreground focus:border-navy";

  return (
    <section id="agendar" className="surface-steel py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow text-navy/60">{t("book.eyebrow")}</p>
          <h2 className="mt-5 font-display text-3xl text-navy-deep md:text-5xl">{t("book.title")}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-navy/70">{t("book.intro")}</p>
        </motion.div>

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {types.map((x) => (
            <button
              key={x.id}
              onClick={() => setType(x.id)}
              className={`border p-5 text-left transition-all ${
                type === x.id
                  ? "border-navy bg-navy-deep text-silver"
                  : "border-border bg-card/70 text-navy-deep hover:border-navy/40"
              }`}
            >
              <p className="font-display text-lg leading-snug">{x.title}</p>
              <p
                className={`mt-2 text-[0.78rem] leading-relaxed ${
                  type === x.id ? "text-silver/70" : "text-muted-foreground"
                }`}
              >
                {x.desc}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-4 border border-border bg-card/80 p-6 backdrop-blur-sm md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className={field}
              placeholder={t("book.name")}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className={field}
              placeholder={t("book.company")}
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
            <input
              className={field}
              type="email"
              placeholder={t("book.email")}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <label className="relative block">
                <CalendarDays
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy/40"
                />
                <input
                  className={field}
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </label>
              <label className="relative block">
                <Clock
                  size={15}
                  className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 text-navy/40"
                />
                <select
                  className={field}
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                >
                  <option value="">{t("book.time")}</option>
                  {HOURS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {isWeekend(form.date) && (
            <p className="text-xs text-destructive">
              {lang === "es"
                ? "Atendemos de lunes a viernes. Seleccione un día hábil o solicite un horario especial por WhatsApp."
                : "We operate Monday to Friday. Please select a business day or request a special slot via WhatsApp."}
            </p>
          )}

          <textarea
            className={`${field} min-h-32 resize-y`}
            placeholder={t("book.matter")}
            value={form.matter}
            onChange={(e) => setForm({ ...form, matter: e.target.value })}
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => submit("wa")}
              className="inline-flex flex-1 items-center justify-center gap-3 bg-navy-deep px-6 py-4 text-[0.72rem] uppercase tracking-[0.2em] text-silver transition-colors hover:bg-navy"
            >
              <MessageCircle size={15} />
              {t("book.submit")}
            </button>
            <button
              onClick={() => submit("mail")}
              className="inline-flex items-center justify-center gap-3 border border-navy/25 px-6 py-4 text-[0.72rem] uppercase tracking-[0.2em] text-navy transition-colors hover:border-navy hover:bg-navy/5"
            >
              <Mail size={15} />
              {t("book.submitEmail")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
