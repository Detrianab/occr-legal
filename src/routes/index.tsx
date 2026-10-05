import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/lib/i18n";
import { Preloader } from "@/components/Preloader";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Booking } from "@/components/Booking";
import { Contact } from "@/components/Contact";
import { OfficeMap } from "@/components/OfficeMap";
import { SiteFooter } from "@/components/SiteFooter";
import { ChatWidget } from "@/components/ChatWidget";
import { Values } from "@/components/Values";
import { News } from "@/components/News";
import { ScrollProgress } from "@/components/ui/reveal";

const title = "OCCR Legal | Derecho Marítimo, Comercio Exterior y Arbitraje";
const description =
  "Firma legal en Caracas dirigida por Carlos Ojeda: derecho marítimo, comercio exterior, licencias OFAC, derecho corporativo y arbitraje comercial internacional.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: "OCCR Legal",
          description,
          url: "https://occr-digital-edge.lovable.app/",
          email: "occr.asociados@gmail.com",
          telephone: "+584241644227",
          address: {
            "@type": "PostalAddress",
            streetAddress:
              "Av. Libertador, Multicentro Empresarial del Este, Torre Libertador, Núcleo B, Piso 8, Oficina 81",
            addressLocality: "Chacao, Caracas",
            addressRegion: "Miranda",
            addressCountry: "VE",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "18:00",
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <Preloader />
      <ScrollProgress />
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Values />
        <Services />
        <News />
        <Booking />
        <Contact />
        <OfficeMap />
      </main>
      <SiteFooter />
      <ChatWidget />
      <Toaster position="top-center" />
    </LanguageProvider>
  );
}
