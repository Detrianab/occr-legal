import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Send, X, MessageCircle } from "lucide-react";
import { CONTACT, useI18n } from "@/lib/i18n";

type Msg = { role: "user" | "assistant"; content: string };

export function ChatWidget() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: "assistant", content: t("chat.greeting") }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { reply?: string };
      setMessages([...next, { role: "assistant", content: data.reply || t("chat.error") }]);
    } catch {
      setMessages([...next, { role: "assistant", content: t("chat.error") }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        <a
          href={`https://wa.me/${CONTACT.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-navy-deep text-gold shadow-lg transition-transform hover:scale-105"
        >
          <MessageCircle size={19} />
        </a>
        <button
          onClick={() => setOpen(!open)}
          aria-label={t("chat.title")}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-deep text-silver shadow-xl transition-transform hover:scale-105"
        >
          {open ? <X size={20} /> : <MessageSquare size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-3 z-50 flex h-[70svh] w-[min(24rem,calc(100vw-1.5rem))] flex-col border border-border bg-card shadow-2xl sm:right-5 sm:bottom-28"
          >
            <div className="surface-navy px-5 py-4">
              <p className="font-display text-lg text-silver">{t("chat.title")}</p>
              <p className="mt-0.5 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {t("chat.sub")}
              </p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[88%] whitespace-pre-wrap px-4 py-3 text-[0.83rem] leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-navy-deep text-silver"
                      : "bg-secondary text-navy-deep"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="w-16 bg-secondary px-4 py-3">
                  <span className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-navy/50"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
                      />
                    ))}
                  </span>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="flex items-center gap-2 border-t border-border p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={t("chat.placeholder")}
                className="flex-1 bg-transparent px-2 py-2 text-sm text-navy-deep outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={send}
                disabled={loading}
                className="flex h-10 w-10 items-center justify-center bg-navy-deep text-silver transition-colors hover:bg-navy disabled:opacity-50"
                aria-label="Enviar"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
