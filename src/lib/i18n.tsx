import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "es" | "en";

type Dict = Record<string, { es: string; en: string }>;

export const CONTACT = {
  phoneDisplay: "+58 424-164-42-27",
  whatsapp: "584241644227",
  email: "occr.asociados@gmail.com",
  address:
    "Av. Libertador, Multicentro Empresarial del Este, Torre Libertador, Núcleo B, Piso 8, Oficina 81, Chacao, Miranda",
  mapsUrl: "https://maps.app.goo.gl/fBrvzeacC2AF98hR7",
  linkedin: "https://www.linkedin.com/",
};

const dict: Dict = {
  "nav.home": { es: "Inicio", en: "Home" },
  "nav.about": { es: "Sobre Carlos Ojeda", en: "About Carlos Ojeda" },
  "nav.services": { es: "Áreas de práctica", en: "Practice areas" },
  "nav.office": { es: "Oficina", en: "Office" },
  "nav.book": { es: "Agendar consulta", en: "Schedule consultation" },

  "hero.eyebrow": { es: "OCCR & Asociados · Legal", en: "OCCR & Associates · Legal" },
  "hero.title1": { es: "Rigor técnico", en: "Technical rigor" },
  "hero.title2": { es: "al servicio de la estrategia", en: "in service of business" },
  "hero.title3": { es: "de su negocio.", en: "strategy." },
  "hero.lead": {
    es: "Firma jurídica especializada en Derecho Marítimo, Comercio Exterior, Derecho Corporativo y Arbitraje. Asesoría preventiva y estrategia de litigio para empresas nacionales e internacionales.",
    en: "Law firm specialized in Maritime Law, Foreign Trade, Corporate Law and Arbitration. Preventive counsel and litigation strategy for domestic and international companies.",
  },
  "hero.cta": { es: "Agendar diagnóstico inicial", en: "Schedule initial assessment" },
  "hero.cta2": { es: "Escribir por WhatsApp", en: "Message via WhatsApp" },
  "hero.note": {
    es: "Caracas, Venezuela · Atención a clientes internacionales bajo acuerdo horario previo.",
    en: "Caracas, Venezuela · International clients served under prior schedule agreement.",
  },

  "about.eyebrow": { es: "Dirección de la firma", en: "Firm leadership" },
  "about.name": { es: "Carlos Rafael Ojeda Cortesía", en: "Carlos Rafael Ojeda Cortesía" },
  "about.role": {
    es: "Abogado · Director de OCCR & Asociados",
    en: "Attorney · Director of OCCR & Associates",
  },
  "about.p1": {
    es: "Mi carrera se ha construido sobre dos pilares: la formación académica de alto nivel y la experiencia en el servicio público. Durante 18 años me desempeñé como funcionario de tribunales, lo que me permitió conocer el sistema judicial desde adentro y entender sus engranajes con una precisión que pocos abogados tienen.",
    en: "My career rests on two pillars: high-level academic training and public service experience. For 18 years I served as a court officer, which allowed me to understand the judicial system from within with a precision few attorneys have.",
  },
  "about.p2": {
    es: "Posteriormente asumí el libre ejercicio profesional, acumulando más de 10 años asesorando a empresas nacionales e internacionales en derecho marítimo, comercio exterior y arbitrajes complejos. Un hito determinante fue liderar la asesoría de una cobranza internacional de monto significativo con la industria petrolera venezolana.",
    en: "I then moved into private practice, accumulating more than 10 years advising domestic and international companies on maritime law, foreign trade and complex arbitration. A defining milestone was leading counsel on a significant international collection matter within the Venezuelan oil industry.",
  },
  "about.p3": {
    es: "El verdadero valor del abogado no está en repetir la ley, sino en encontrar la llave técnica que abre puertas donde otros solo ven paredes.",
    en: "The true value of a lawyer is not in reciting the law, but in finding the technical key that opens doors where others see only walls.",
  },
  "about.credentials": { es: "Formación y especializaciones", en: "Education and specializations" },
  "about.stat1": { es: "años en la judicatura", en: "years within the judiciary" },
  "about.stat2": { es: "años de ejercicio corporativo", en: "years of corporate practice" },
  "about.stat3": { es: "áreas de práctica principales", en: "core practice areas" },

  "services.eyebrow": { es: "Áreas de práctica", en: "Practice areas" },
  "services.title": {
    es: "Cobertura jurídica integral para operaciones exigentes",
    en: "Comprehensive legal coverage for demanding operations",
  },
  "services.intro": {
    es: "Nuestro enfoque es prevenir el conflicto antes de que llegue a los tribunales, blindando las operaciones desde la raíz.",
    en: "Our approach is to prevent conflict before it reaches the courts, protecting operations from the root.",
  },

  "book.eyebrow": { es: "Agendamiento", en: "Scheduling" },
  "book.title": { es: "Agende su consulta", en: "Schedule your consultation" },
  "book.intro": {
    es: "Seleccione modalidad, fecha y hora. La solicitud se confirma por WhatsApp o correo institucional dentro del horario de atención.",
    en: "Select modality, date and time. Your request is confirmed via WhatsApp or institutional email within business hours.",
  },
  "book.type": { es: "Tipo de asesoría", en: "Type of consultation" },
  "book.type1": { es: "Consulta de Diagnóstico Inicial", en: "Initial Assessment Consultation" },
  "book.type1d": {
    es: "Para nuevos prospectos que desean explorar cómo podemos ayudarlos.",
    en: "For new prospects exploring how we can assist them.",
  },
  "book.type2": { es: "Asesoría Estratégica Continuada", en: "Ongoing Strategic Counsel" },
  "book.type2d": {
    es: "Acompañamiento mensual o trimestral para clientes recurrentes.",
    en: "Monthly or quarterly support for recurring clients.",
  },
  "book.type3": { es: "Caso Específico", en: "Specific Matter" },
  "book.type3d": {
    es: "Un contrato, un arbitraje o una gestión aduanera puntual.",
    en: "A contract, an arbitration or a specific customs matter.",
  },
  "book.name": { es: "Nombre y apellido", en: "Full name" },
  "book.company": { es: "Empresa / Organización", en: "Company / Organization" },
  "book.email": { es: "Correo electrónico", en: "Email" },
  "book.date": { es: "Fecha", en: "Date" },
  "book.time": { es: "Hora (hora de Venezuela)", en: "Time (Venezuela time)" },
  "book.matter": { es: "Descripción del asunto", en: "Matter description" },
  "book.submit": { es: "Enviar solicitud", en: "Send request" },
  "book.submitEmail": { es: "Enviar por correo", en: "Send by email" },
  "book.required": { es: "Complete los campos requeridos.", en: "Please complete required fields." },
  "book.sent": {
    es: "Solicitud preparada. Confirme el envío en WhatsApp.",
    en: "Request prepared. Confirm sending in WhatsApp.",
  },

  "office.eyebrow": { es: "Oficina", en: "Office" },
  "office.title": { es: "Caracas · Chacao", en: "Caracas · Chacao" },
  "office.hours": { es: "Horario de atención", en: "Business hours" },
  "office.hoursValue": {
    es: "Lunes a viernes, 9:00 a.m. – 6:00 p.m. (hora de Venezuela).",
    en: "Monday to Friday, 9:00 a.m. – 6:00 p.m. (Venezuela time).",
  },
  "office.intl": {
    es: "Para clientes internacionales podemos flexibilizar horarios bajo acuerdo previo.",
    en: "For international clients, schedules may be adjusted under prior agreement.",
  },
  "office.directions": { es: "Ver en Google Maps", en: "View on Google Maps" },

  "chat.title": { es: "Asistente virtual OCCR", en: "OCCR virtual assistant" },
  "chat.sub": { es: "Disponible 24/7", en: "Available 24/7" },
  "chat.placeholder": { es: "Escriba su consulta…", en: "Type your question…" },
  "chat.greeting": {
    es: "Buen día. Soy el asistente virtual de OCCR & Asociados. Puedo orientarle sobre plazos, requisitos documentales y alcance de nuestras áreas de práctica, y derivarle con el Dr. Ojeda para una asesoría formal.",
    en: "Good day. I am the virtual assistant of OCCR & Associates. I can orient you on timelines, documentary requirements and the scope of our practice areas, and refer you to Dr. Ojeda for formal counsel.",
  },
  "chat.error": {
    es: "No fue posible procesar la consulta. Por favor, escríbanos por WhatsApp.",
    en: "The request could not be processed. Please contact us via WhatsApp.",
  },

  "footer.rights": { es: "Todos los derechos reservados.", en: "All rights reserved." },
  "footer.soon": { es: "Próximamente", en: "Coming soon" },
  "footer.disclaimer": {
    es: "La información publicada en este sitio tiene carácter informativo y no constituye asesoría jurídica ni establece relación abogado-cliente.",
    en: "Information published on this site is informative in nature and does not constitute legal advice nor create an attorney-client relationship.",
  },
};

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: "es",
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  const t = (k: string) => dict[k]?.[lang] ?? k;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
