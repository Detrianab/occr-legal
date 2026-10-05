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
  "nav.values": { es: "La firma", en: "The firm" },
  "nav.services": { es: "Áreas de práctica", en: "Practice areas" },
  "nav.news": { es: "OCCR News", en: "OCCR News" },
  "nav.office": { es: "Oficina", en: "Office" },
  "nav.contact": { es: "Contacto", en: "Contact" },
  "nav.book": { es: "Agendar consulta", en: "Schedule consultation" },

  "hero.eyebrow": { es: "OCCR Legal", en: "OCCR Legal" },
  "hero.title1": { es: "Rigor técnico y visión estratégica", en: "Technical rigor and strategic vision" },
  "hero.title2": { es: "para proteger y potenciar su negocio,", en: "to protect and strengthen your business," },
  "hero.title3": { es: "con criterio jurídico de alto nivel al servicio corporativo", en: "with high-level legal judgment at the service of business" },
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
    es: "Abogado Especialista en Derecho Corporativo, Marítimo, Comercio Exterior y Arbitraje Comercial; Función del Fiscal del Ministerio Público",
    en: "Attorney specializing in Corporate, Maritime and Foreign Trade Law, Commercial Arbitration, and the Public Prosecutor Function",
  },
  "about.p1": {
    es: "Abogado con amplia trayectoria en la prevención de riesgos corporativos, estructuración de negocios internacionales y resolución compleja de disputas. Su práctica combina una sólida formación en Derecho de la Navegación y Comercio Exterior con una visión estratégica orientada a la protección y potenciación del patrimonio empresarial. Cuenta con sólida experiencia en procesos de fusiones y adquisiciones de empresas (M&A), así como en la estructuración e implementación de negocios de diversa escala, adaptando soluciones jurídicas precisas tanto para emprendimientos emergentes como para esquemas corporativos de gran envergadura.",
    en: "Attorney with extensive experience in corporate risk prevention, international business structuring and complex dispute resolution. His practice combines a strong background in Navigation and Foreign Trade Law with a strategic vision focused on protecting and strengthening business assets. He has substantial experience in mergers and acquisitions (M&A), as well as structuring and implementing ventures of different scales, tailoring precise legal solutions for both emerging enterprises and large corporate structures.",
  },
  "about.p2": {
    es: "Asimismo, ha liderado auditorías de cumplimiento, negociación de contratos de transporte y logística, y el diseño de estrategias para la recuperación de activos y resolución de contingencias patrimoniales complejas, garantizando la máxima rigurosidad técnica y el estricto resguardo del secreto profesional. Como complemento a su práctica principal, su formación en áreas transversales del derecho le otorga un criterio jurídico holístico, indispensable para abordar operaciones multidisciplinarias de alto nivel.",
    en: "He has also led compliance audits, transport and logistics contract negotiations, and the design of strategies for asset recovery and complex financial contingencies, ensuring the highest technical rigor and strict protection of professional confidentiality. Complementing his principal practice, his training across multiple legal disciplines provides the holistic legal judgment required for high-level multidisciplinary operations.",
  },
  "about.p3": {
    es: "«El valor de un abogado no radica en recitar la norma, sino en descifrar la arquitectura legal para construir soluciones donde otros solo ven obstáculos.»",
    en: "“A lawyer’s value does not lie in reciting the law, but in deciphering its legal architecture to build solutions where others see only obstacles.”",
  },
  "about.credentials": { es: "Formación y especializaciones", en: "Education and specializations" },
  "about.stat1": { es: "años de servicio en el Poder Judicial Venezolano", en: "years of service in the Venezuelan Judicial Branch" },
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

  "contact.eyebrow": { es: "Contacto", en: "Contact" },
  "contact.title": { es: "Escríbanos", en: "Write to us" },
  "contact.intro": {
    es: "¿Tiene una consulta puntual o prefiere que le contactemos? Envíenos un mensaje y le responderemos a la mayor brevedad posible.",
    en: "Do you have a specific question or prefer we reach out? Send us a message and we will reply as soon as possible.",
  },
  "contact.name": { es: "Nombre y apellido", en: "Full name" },
  "contact.email": { es: "Correo electrónico", en: "Email" },
  "contact.message": { es: "Mensaje", en: "Message" },
  "contact.submit": { es: "Enviar por WhatsApp", en: "Send via WhatsApp" },
  "contact.submitEmail": { es: "Enviar por correo", en: "Send by email" },
  "contact.required": { es: "Complete los campos requeridos.", en: "Please complete required fields." },
  "contact.sent": {
    es: "Mensaje preparado. Confirme el envío en WhatsApp.",
    en: "Message prepared. Confirm sending in WhatsApp.",
  },

  "chat.title": { es: "Asistente virtual OCCR", en: "OCCR virtual assistant" },
  "chat.sub": { es: "Disponible 24/7", en: "Available 24/7" },
  "chat.placeholder": { es: "Escriba su consulta…", en: "Type your question…" },
  "chat.greeting": {
    es: "Buen día. Soy el asistente virtual de OCCR Legal. Puedo orientarle sobre plazos, requisitos documentales y alcance de nuestras áreas de práctica, y derivarle con el Dr. Ojeda para una asesoría formal.",
    en: "Good day. I am the virtual assistant of OCCR Legal. I can orient you on timelines, documentary requirements and the scope of our practice areas, and refer you to Dr. Ojeda for formal counsel.",
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
