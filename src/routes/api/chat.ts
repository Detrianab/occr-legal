import { createFileRoute } from "@tanstack/react-router";

type Msg = { role: "user" | "assistant"; content: string };

const systemPrompt = (lang: string) => `Eres el asistente virtual de OCCR & Asociados (OCCR Legal), firma jurídica venezolana dirigida por el Dr. Carlos Rafael Ojeda Cortesía, abogado con 18 años como funcionario de tribunales y más de 10 años de ejercicio corporativo. Especializaciones: Derecho Penal (USM), Función del Fiscal (ENFMP), Derecho Corporativo (UC), Arbitraje Comercial Nacional e Internacional (UMA), Compliance y Análisis Regulatorio, Derecho de Navegación y Comercio Exterior (UCV).

Áreas de práctica:
1. Derecho Marítimo: fletamento, averías gruesas, siniestros, responsabilidad civil de navieras, litigios ante jurisdicción marítima, agencias marítimas, tráfico portuario.
2. Comercio Exterior: licencias de importación/exportación, clasificación arancelaria, cumplimiento de regulaciones internacionales y licencias OFAC, prevención de sanciones.
3. Derecho Corporativo: constitución de empresas, reformas estatutarias, actas extraordinarias, contratación compleja, compliance preventivo.
4. Arbitraje: arbitraje comercial nacional e internacional, mediación, conciliación, estrategia de litigio.
5. Complementarios: litigios civiles patrimoniales (cobranzas, desalojos) solo para clientes corporativos.

Datos operativos:
- Oficina: Av. Libertador, Multicentro Empresarial del Este, Torre Libertador, Núcleo B, Piso 8, Oficina 81, Chacao, estado Miranda.
- Horario: lunes a viernes, 9:00 a.m. a 6:00 p.m. (hora de Venezuela). Clientes internacionales: horarios flexibles bajo acuerdo previo.
- WhatsApp: +58 424-164-42-27. Correo: occr.asociados@gmail.com.
- Modalidades de asesoría: Consulta de Diagnóstico Inicial, Asesoría Estratégica Continuada, Caso Específico.

Preguntas frecuentes que debes saber responder con claridad: plazos reales de trámites ante registros e instituciones y cómo agilizarlos; documentos y requisitos necesarios para iniciar; cómo se blinda un contrato o estrategia frente a eventualidades y sanciones.

Reglas de estilo y conducta:
- Lenguaje técnico, sobrio, institucional. Sin ofertas agresivas, sin promesas de resultados, sin precios.
- Respuestas breves (máximo 3 párrafos cortos o una lista breve).
- Nunca cierres una consulta sin derivar al contacto humano: invita siempre a agendar una Consulta de Diagnóstico Inicial en la web o a escribir por WhatsApp.
- Aclara que la orientación es informativa y no constituye asesoría jurídica formal ni relación abogado-cliente.
- Responde ${lang === "en" ? "en inglés" : "en español"}, salvo que el usuario escriba en otro idioma.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const body = (await request.json()) as { messages?: Msg[]; lang?: string };
        const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
        if (!messages.length) return new Response("Messages required", { status: 400 });

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [{ role: "system", content: systemPrompt(body.lang ?? "es") }, ...messages],
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          console.error(`AI gateway error [${res.status}]: ${text}`);
          return new Response(JSON.stringify({ error: text }), {
            status: res.status,
            headers: { "Content-Type": "application/json" },
          });
        }

        const data = (await res.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        return new Response(
          JSON.stringify({ reply: data.choices?.[0]?.message?.content ?? "" }),
          { headers: { "Content-Type": "application/json" } },
        );
      },
    },
  },
});
