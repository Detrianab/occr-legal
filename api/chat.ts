import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers por seguridad
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[FLAG 1] Petición recibida en /api/chat');
    const { messages, lang } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('[FLAG ERROR] GEMINI_API_KEY no está configurada en Vercel');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Contexto o rol del asistente legal según el idioma
    const systemPrompt = lang === 'en' 
      ? "You are the virtual legal assistant for OCCR & Asociados, a law firm specializing in Maritime Law, Foreign Trade, Corporate Law, and Arbitration in Caracas, Venezuela. Be professional, concise, and helpful."
      : "Eres el asistente legal virtual de OCCR & Asociados, firma jurídica especializada en Derecho Marítimo, Comercio Exterior, Derecho Corporativo y Arbitraje en Caracas, Venezuela. Sé profesional, conciso y útil.";

    // Convertir el historial de mensajes al formato que espera Gemini API (contents)
    const contents = [
      {
        role: "user",
        parts: [{ text: `[System Instruction: ${systemPrompt}]` }]
      },
      ...(messages || []).map((m: { role: string; content: string }) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }))
    ];

    console.log('[FLAG 2] Conectando con Google Gemini API (gemini-3.6-flash)...');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[FLAG ERROR] Gemini API respondió con status ${response.status}:`, errText);
      return res.status(500).json({ error: 'Gemini API error', details: errText });
    }

    const data = await response.json();
    console.log('[FLAG 3] Respuesta exitosa obtenida de Gemini');

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || (lang === 'en' ? "I'm sorry, I couldn't generate a response right now." : "Disculpa, no he podido generar una respuesta en este momento.");

    return res.status(200).json({ reply });

  } catch (error: any) {
    console.error('[FLAG EXCEPTION]', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}