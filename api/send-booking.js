const truncate = (value, max = 500) => String(value ?? "").trim().slice(0, max);

const escapeHtml = (value) =>
  truncate(value, 2000)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const required = (value) => truncate(value).length > 0;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL || process.env.CONTACT_EMAIL || "reservas@ovando.com";
  const from = process.env.BOOKING_FROM_EMAIL || "Transporte Ovando <onboarding@resend.dev>";

  if (!apiKey) {
    return res.status(503).json({ ok: false, error: "email_not_configured" });
  }

  const payload = req.body || {};
  const booking = {
    name: truncate(payload.name, 120),
    phone: truncate(payload.phone, 80),
    serviceName: truncate(payload.serviceName, 160),
    origin: truncate(payload.origin, 200),
    destination: truncate(payload.destination, 200),
    date: truncate(payload.date, 80),
    pax: truncate(payload.pax, 20),
  };

  if (!required(booking.name) || !required(booking.phone) || !required(booking.serviceName)) {
    return res.status(400).json({ ok: false, error: "missing_required_fields" });
  }

  const rows = [
    ["Cliente", booking.name],
    ["Telefono / WhatsApp", booking.phone],
    ["Servicio", booking.serviceName],
    ["Origen", booking.origin],
    ["Destino", booking.destination],
    ["Fecha", booking.date],
    ["Pasajeros", booking.pax],
  ];

  const text = [
    "Nueva solicitud desde la web de Transporte Ovando",
    "",
    ...rows.map(([label, value]) => `${label}: ${value || "No especificado"}`),
  ].join("\n");

  const htmlRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#475569;font-weight:700;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;">${escapeHtml(value || "No especificado")}</td>
    </tr>
  `).join("");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a;">
      <h2 style="margin:0 0 12px;">Nueva solicitud desde la web</h2>
      <p style="margin:0 0 18px;color:#475569;">Transporte Turistico Ovando</p>
      <table style="border-collapse:collapse;width:100%;max-width:640px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
        ${htmlRows}
      </table>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Nueva solicitud: ${booking.serviceName}`,
        text,
        html,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return res.status(502).json({ ok: false, error: "email_send_failed", details: data });
    }

    return res.status(200).json({ ok: true, id: data.id || null });
  } catch {
    return res.status(502).json({ ok: false, error: "email_send_failed" });
  }
}
