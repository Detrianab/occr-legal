import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import emblem from "@/assets/occr-emblem.png";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const id = setTimeout(() => setDone(true), 1900);
    return () => {
      clearTimeout(id);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center surface-navy"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {/* Halo dorado difuso */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute h-[36rem] w-[36rem] rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--gold) 14%, transparent) 0%, transparent 62%)",
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: EASE }}
          />

          {/* Emblema: revelado por máscara, sin recuadros */}
          <motion.img
            src={emblem}
            alt=""
            aria-hidden
            initial={{ opacity: 0, scale: 0.88, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: EASE }}
            className="relative h-28 w-28 object-contain md:h-36 md:w-36"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: EASE }}
            className="relative mt-7 text-center"
          >
            <p className="font-display text-2xl tracking-[0.3em] text-silver">OCCR</p>
            <p className="mt-1 font-display text-[0.7rem] tracking-[0.5em] text-silver-dark">LEGAL</p>
          </motion.div>

          {/* Filete dorado de carga */}
          <div className="relative mt-8 h-px w-44 overflow-hidden bg-silver/15">
            <motion.div
              className="h-full w-full origin-left rule-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.7, ease: "easeInOut" }}
            />
          </div>

          {/* Cortina final ascendente */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-navy-deep"
            initial={{ y: "100%" }}
            exit={{ y: "0%" }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ opacity: 0 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
