import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Check, Clock, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Reveal, TextReveal } from "@/components/ui/reveal";
import { CONTACT, useI18n } from "@/lib/i18n";

const HOURS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

type FieldKey = "name" | "email" | "date" | "time" | "matter";

export function Booking() {
  const { t, lang } = useI18n();
  const es = lang === "es";
  const [type, setType] = useState("type1");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    date: "",
    time: "",
    matter: "",
  });

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const maxDate = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString().slice(0, 10);
  }, []);

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

  const errors: Partial<Record<FieldKey, string>> = {};
  if (!form.name.trim() || form.name.trim().length < 3)
    errors.name = es ? "Indique su nombre completo." : "Enter your full name.";
  if (!EMAIL_RE.test(form.email)) errors.email = es ? "Correo electrónico no válido." : "Invalid email address.";
  if (!form.date) errors.date = es ? "Seleccione una fecha." : "Select a date.";
  else if (isWeekend(form.date))
    errors.date = es
      ? "Atendemos de lunes a viernes. Solicite un horario especial por WhatsApp."
      : "We operate Monday to Friday. Request a special slot via WhatsApp.";
  else if (form.date < today) errors.date = es ? "La fecha ya pasó." : "That date has passed.";
  if (!form.time) errors.time = es ? "Seleccione una hora." : "Select a time.";
  if (form.matter.trim().length < 15)
    errors.matter = es
      ? "Describa brevemente el asunto (mínimo 15 caracteres)."
      : "Briefly describe the matter (minimum 15 characters).";

  const valid = Object.keys(errors).length === 0;
  const filled = (["name", "email", "date", "time", "matter"] as FieldKey[]).filter((k) => !errors[k]).length;
  const progress = Math.round((filled / 5) * 100);

  const show = (k: FieldKey) => (touched[k] ? errors[k] : undefined);
  const blur = (k: FieldKey) => setTouched((p) => ({ ...p, [k]: true }));

  const dateLabel = form.date
    ? new Date(`${form.date}T12:00:00`).toLocaleDateString(es ? "es-VE" : "en-US", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      })
    : "—";

  const message = () => {
    const label = types.find((x) => x.id === type)?.title ?? "";
    return es
      ? `Solicitud de consulta — OCCR Legal\n\nModalidad: ${label}\nNombre: ${form.name}\nEmpresa: ${form.company || "—"}\nCorreo: ${form.email}\nFecha solicitada: ${form.date} (${dateLabel})\nHora solicitada: ${form.time} (hora de Venezuela)\n\nAsunto:\n${form.matter}`
      : `Consultation request — OCCR Legal\n\nType: ${label}\nName: ${form.name}\nCompany: ${form.company || "—"}\nEmail: ${form.email}\nRequested date: ${form.date} (${dateLabel})\nRequested time: ${form.time} (Venezuela time)\n\nMatter:\n${form.matter}`;
  };

  const submit = (channel: "wa" | "mail") => {
    if (!valid) {
      setTouched({ name: true, email: true, date: true, time: true, matter: true });
      toast.error(Object.values(errors)[0] ?? t("book.required"));
      return;
    }
    const body = encodeURIComponent(message());
    const subject = encodeURIComponent(
      es ? "Solicitud de consulta — OCCR Legal" : "Consultation request — OCCR Legal",
    );
    if (channel === "wa") window.open(`https://wa.me/${CONTACT.whatsapp}?text=${body}`, "_blank", "noopener");
    else window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    toast.success(t("book.sent"));
  };

  const field =
    "w-full border border-border bg-card px-4 py-3 text-sm text-navy-deep outline-none transition-colors placeholder:text-muted-foreground focus:border-navy";
  const err = "border-destructive/70 focus:border-destructive";

  const Label = ({ children }: { children: React.ReactNode }) => (
    <span className="mb-2 block text-[0.62rem] uppercase tracking-[0.18em] text-navy/55">{children}</span>
  );

  return (
    <section id="agendar" className="relative overflow-hidden surface-steel py-24 md:py-32">
      <div className="relative mx-auto max-w-5xl px-5 md:px-10">
        <Reveal>
          <p className="eyebrow text-navy/60">{t("book.eyebrow")}</p>
          <h2 className="mt-5 font-display text-3xl text-navy-deep md:text-5xl">
            <TextReveal text={t("book.title")} />
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-navy/70">{t("book.intro")}</p>
        </Reveal>

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {types.map((x, i) => (
            <motion.button
              key={x.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setType(x.id)}
              aria-pressed={type === x.id}
              className={`relative border p-5 text-left transition-all duration-500 ${
                type === x.id
                  ? "border-navy bg-navy-deep text-silver shadow-lg"
                  : "border-border bg-card/70 text-navy-deep hover:-translate-y-0.5 hover:border-navy/40"
              }`}
            >
              {type === x.id && (
                <span className="absolute right-4 top-4 inline-flex h-5 w-5 items-center justify-center bg-gold text-navy-deep">
                  <Check size={12} strokeWidth={3} />
                </span>
              )}
              <p className="max-w-[85%] font-display text-lg leading-snug">{x.title}</p>
              <p
                className={`mt-2 text-[0.78rem] leading-relaxed ${
                  type === x.id ? "text-silver/70" : "text-muted-foreground"
                }`}
              >
                {x.desc}
              </p>
            </motion.button>
          ))}
        </div>

        <div className="mt-4 grid gap-5 border border-border bg-card/85 p-6 backdrop-blur-sm md:p-8">
          {/* Progreso del formulario */}
          <div>
            <div className="flex items-center justify-between text-[0.62rem] uppercase tracking-[0.18em] text-navy/50">
              <span>{es ? "Solicitud completa" : "Request completeness"}</span>
              <span className="text-navy/70">{progress}%</span>
            </div>
            <div className="mt-2 h-px w-full bg-border">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-px rule-gold"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <Label>{t("book.name")}</Label>
              <input
                className={`${field} ${show("name") ? err : ""}`}
                placeholder={t("book.name")}
                value={form.name}
                onBlur={() => blur("name")}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {show("name") && <span className="mt-1.5 block text-xs text-destructive">{show("name")}</span>}
            </label>

            <label className="block">
              <Label>{t("book.company")}</Label>
              <input
                className={field}
                placeholder={t("book.company")}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </label>

            <label className="block">
              <Label>{t("book.email")}</Label>
              <input
                className={`${field} ${show("email") ? err : ""}`}
                type="email"
                inputMode="email"
                placeholder="nombre@empresa.com"
                value={form.email}
                onBlur={() => blur("email")}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {show("email") && <span className="mt-1.5 block text-xs text-destructive">{show("email")}</span>}
            </label>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="block">
                <Label>{t("book.date")}</Label>
                <span className="relative block">
                  <CalendarDays
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy/40"
                  />
                  <input
                    className={`${field} ${show("date") ? err : ""}`}
                    type="date"
                    min={today}
                    max={maxDate}
                    value={form.date}
                    onBlur={() => blur("date")}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </span>
              </label>
              <label className="block">
                <Label>{t("book.time")}</Label>
                <span className="relative block">
                  <Clock
                    size={15}
                    className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 text-navy/40"
                  />
                  <select
                    className={`${field} ${show("time") ? err : ""}`}
                    value={form.time}
                    onBlur={() => blur("time")}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                  >
                    <option value="">{es ? "Seleccione" : "Select"}</option>
                    {HOURS.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
              {(show("date") || show("time")) && (
                <span className="text-xs text-destructive sm:col-span-2">{show("date") ?? show("time")}</span>
              )}
            </div>
          </div>

          <label className="block">
            <Label>{t("book.matter")}</Label>
            <textarea
              className={`${field} min-h-32 resize-y ${show("matter") ? err : ""}`}
              placeholder={
                es
                  ? "Ej.: revisión de contrato de fletamento, retención aduanera, cláusula arbitral…"
                  : "E.g.: charter party review, customs hold, arbitration clause…"
              }
              value={form.matter}
              onBlur={() => blur("matter")}
              onChange={(e) => setForm({ ...form, matter: e.target.value })}
            />
            {show("matter") && <span className="mt-1.5 block text-xs text-destructive">{show("matter")}</span>}
          </label>

          {/* Resumen de la solicitud */}
          <div className="grid gap-3 border-t border-border pt-5 text-[0.78rem] text-navy/70 sm:grid-cols-3">
            <p>
              <span className="block text-[0.6rem] uppercase tracking-[0.18em] text-navy/45">
                {es ? "Modalidad" : "Type"}
              </span>
              {types.find((x) => x.id === type)?.title}
            </p>
            <p>
              <span className="block text-[0.6rem] uppercase tracking-[0.18em] text-navy/45">{t("book.date")}</span>
              <span className="capitalize">{dateLabel}</span>
            </p>
            <p>
              <span className="block text-[0.6rem] uppercase tracking-[0.18em] text-navy/45">{t("book.time")}</span>
              {form.time || "—"}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => submit("wa")}
              className="group inline-flex flex-1 items-center justify-center gap-3 bg-navy-deep px-6 py-4 text-[0.72rem] uppercase tracking-[0.2em] text-silver transition-colors hover:bg-navy disabled:opacity-100"
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
          <p className="text-[0.7rem] leading-relaxed text-navy/50">
            {es
              ? "Su solicitud se envía por el canal que elija; confirmamos disponibilidad dentro del horario de atención (L–V, 9:00–18:00, hora de Venezuela)."
              : "Your request is sent through the channel you choose; we confirm availability within business hours (Mon–Fri, 9:00–18:00 Venezuela time)."}
          </p>
        </div>
      </div>
    </section>
  );
}
