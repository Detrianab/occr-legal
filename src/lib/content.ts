import type { Lang } from "./i18n";

export type Service = {
  key: string;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  items: Record<Lang, string[]>;
};

export const services: Service[] = [
  {
    key: "maritimo",
    title: { es: "Derecho Marítimo", en: "Maritime Law" },
    summary: {
      es: "Asesoría integral en operaciones navieras y protección de intereses en tráfico portuario.",
      en: "Comprehensive counsel on shipping operations and protection of interests in port traffic.",
    },
    items: {
      es: [
        "Contratos de fletamento",
        "Averías gruesas y siniestros",
        "Responsabilidad civil de navieras",
        "Litigios ante la jurisdicción marítima",
        "Régimen de agencias marítimas",
      ],
      en: [
        "Charter party contracts",
        "General average and casualties",
        "Shipowner civil liability",
        "Litigation before maritime jurisdiction",
        "Shipping agency regime",
      ],
    },
  },
  {
    key: "comercio",
    title: { es: "Comercio Exterior", en: "Foreign Trade" },
    summary: {
      es: "Espectro aduanero completo y cumplimiento de regulaciones internacionales, incluidas licencias OFAC.",
      en: "Full customs spectrum and international regulatory compliance, including OFAC licensing.",
    },
    items: {
      es: [
        "Licencias de importación y exportación",
        "Clasificación arancelaria",
        "Cumplimiento de regulaciones internacionales (OFAC)",
        "Prevención de sanciones y bloqueos",
        "Asesoría a inversionistas extranjeros",
      ],
      en: [
        "Import and export licensing",
        "Tariff classification",
        "International regulatory compliance (OFAC)",
        "Prevention of sanctions and blocking risk",
        "Counsel to foreign investors",
      ],
    },
  },
  {
    key: "corporativo",
    title: { es: "Derecho Corporativo", en: "Corporate Law" },
    summary: {
      es: "Estructura societaria, contratación compleja y compliance preventivo para la alta dirección.",
      en: "Corporate structure, complex contracting and preventive compliance for senior management.",
    },
    items: {
      es: [
        "Constitución de empresas",
        "Reformas estatutarias y actas extraordinarias",
        "Contratos con proveedores, clientes y alianzas",
        "Compliance preventivo",
        "Análisis regulatorio",
      ],
      en: [
        "Company incorporation",
        "Bylaw amendments and extraordinary minutes",
        "Supplier, client and alliance contracts",
        "Preventive compliance",
        "Regulatory analysis",
      ],
    },
  },
  {
    key: "arbitraje",
    title: { es: "Arbitraje", en: "Arbitration" },
    summary: {
      es: "Representación en arbitraje comercial nacional e internacional con estrategia de litigio planificada.",
      en: "Representation in domestic and international commercial arbitration with planned litigation strategy.",
    },
    items: {
      es: [
        "Arbitraje comercial nacional e internacional",
        "Mediación y conciliación",
        "Estrategia de litigio planificada",
        "Ejecución y reconocimiento de laudos",
      ],
      en: [
        "Domestic and international commercial arbitration",
        "Mediation and conciliation",
        "Planned litigation strategy",
        "Award enforcement and recognition",
      ],
    },
  },
  {
    key: "complementarios",
    title: { es: "Servicios complementarios", en: "Complementary services" },
    summary: {
      es: "Acompañamiento 360° en litigios civiles patrimoniales derivados de clientes corporativos.",
      en: "360° support in civil property litigation arising from corporate clients.",
    },
    items: {
      es: [
        "Cobranzas patrimoniales",
        "Desalojos y arrendamientos comerciales",
        "Acompañamiento integral al cliente corporativo",
      ],
      en: [
        "Property collections",
        "Commercial evictions and leases",
        "Integral support for corporate clients",
      ],
    },
  },
];

export const credentials: Record<Lang, string[]> = {
  es: [
    "Especialista en Derecho Penal (USM)",
    "Especialista en Función del Fiscal del Ministerio Público (ENFMP)",
    "Derecho Corporativo (UC)",
    "Especialización en Arbitraje Comercial Nacional e Internacional (UMA)",
    "Cumplimiento Normativo (Compliance) y Análisis Regulatorio de las Empresas",
    "Derecho de Navegación y Comercio Exterior (UCV — preparación de tesis)",
  ],
  en: [
    "Specialist in Criminal Law (USM)",
    "Specialist in Public Prosecutor Function (ENFMP)",
    "Corporate Law (UC)",
    "Specialization in National and International Commercial Arbitration (UMA)",
    "Regulatory Compliance and Corporate Regulatory Analysis",
    "Navigation Law and Foreign Trade (UCV — thesis preparation)",
  ],
};
