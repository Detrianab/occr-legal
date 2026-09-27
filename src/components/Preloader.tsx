import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import emblem from "@/assets/occr-emblem.png";

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setDone(true), 2200);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center surface-navy"
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.86, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-32 w-32 md:h-40 md:w-40"
          >
            <img src={emblem.url} alt="" className="h-full w-full object-contain" />
            <motion.div
              className="absolute inset-0 bg-navy-deep"
              initial={{ clipPath: "inset(0 0 0% 0)" }}
              animate={{ clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-8 text-center"
          >
            <p className="font-display text-2xl tracking-[0.25em] text-silver">OCCR &amp;</p>
            <p className="font-display text-sm tracking-[0.42em] text-silver-dark">ASOCIADOS</p>
          </motion.div>

          <motion.div
            className="mt-8 h-px w-40 rule-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
