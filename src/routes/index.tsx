import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/lib/i18n";
import { Preloader } from "@/components/Preloader";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Booking } from "@/components/Booking";
import { OfficeMap } from "@/components/OfficeMap";
import { SiteFooter } from "@/components/SiteFooter";
import { ChatWidget } from "@/components/ChatWidget";

const title = "OCCR & Asociados | Derecho Marítimo, Comercio Exterior y Arbitraje";
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
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <Preloader />
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Services />
        <Booking />
        <OfficeMap />
      </main>
      <SiteFooter />
      <ChatWidget />
      <Toaster position="top-center" />
    </LanguageProvider>
  );
}
