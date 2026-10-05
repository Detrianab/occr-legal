import createGlobe, { type COBEOptions } from "cobe";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Configuración calibrada a la paleta OCCR: esfera navy con marcadores dorados. */
const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.28,
  dark: 1,
  diffuse: 1.1,
  mapSamples: 17000,
  mapBrightness: 5.2,
  baseColor: [0.16, 0.21, 0.33],
  markerColor: [0.85, 0.7, 0.42],
  glowColor: [0.28, 0.34, 0.48],
  markers: [
    { location: [10.4806, -66.9036], size: 0.11 }, // Caracas
    { location: [8.9824, -79.5199], size: 0.06 }, // Panamá
    { location: [29.7604, -95.3698], size: 0.06 }, // Houston
    { location: [25.7617, -80.1918], size: 0.06 }, // Miami
    { location: [51.9244, 4.4777], size: 0.07 }, // Rotterdam
    { location: [40.4168, -3.7038], size: 0.05 }, // Madrid
    { location: [25.2048, 55.2708], size: 0.05 }, // Dubái
    { location: [1.3521, 103.8198], size: 0.07 }, // Singapur
    { location: [31.2304, 121.4737], size: 0.06 }, // Shanghái
    { location: [-23.9608, -46.3336], size: 0.05 }, // Santos
  ],
};

export function Globe({ className, config = GLOBE_CONFIG }: { className?: string; config?: COBEOptions }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);
  const [r, setR] = useState(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerMovement.current = delta;
      setR(delta / 220);
    }
  };

  const rRef = useRef(0);
  rRef.current = r;

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) widthRef.current = canvasRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
    });

    let frame = 0;
    const tick = () => {
      if (pointerInteracting.current === null) phiRef.current += 0.0035;
      globe.update({
        phi: phiRef.current + rRef.current,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const id = setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 60);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(id);
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("mx-auto aspect-square w-full max-w-[32rem]", className)}>
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-0 transition-opacity duration-1000 [contain:layout_paint_size]"
        onPointerDown={(e) => updatePointerInteraction(e.clientX - pointerMovement.current)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}
