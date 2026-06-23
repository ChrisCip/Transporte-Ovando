const truncate = (value, max = 500) => String(value ?? "").trim().slice(0, max);

const escapeHtml = (value) =>
  truncate(value, 2000)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const required = (value) => truncate(value).length > 0;

const getResendErrorMessage = (data) => {
  const raw = data?.message || data?.error?.message || data?.name || "";
  const message = String(raw).toLowerCase();

  if (message.includes("domain") || message.includes("verify") || message.includes("from")) {
    return "El remitente no está verificado en Resend. Usa onboarding@resend.dev para prueba o verifica un dominio propio.";
  }

  if (message.includes("api key") || message.includes("unauthorized") || message.includes("forbidden")) {
    return "La API key de Resend no es válida o no tiene permiso para enviar correos.";
  }

  return "Resend rechazó el envío. Revisa el remitente verificado y la API key.";
};

const kindLabel = (kind) => {
  if (kind === "excursion") return "Excursión";
  if (kind === "rental") return "Renta de vehículo";
  return "Transporte personalizado";
};

const compactRows = (rows) =>
  rows
    .map(([label, value]) => [label, truncate(value, 500)])
    .filter(([, value]) => required(value));

const rowsFromLead = (payload) => {
  const kind = payload.kind || "transport";
  const customer = payload.customer || {};
  const details = payload.details || {};
  const serviceName = truncate(payload.serviceName || "Solicitud web", 160);

  const common = [
    ["Tipo de solicitud", kindLabel(kind)],
    ["Servicio", serviceName],
    ["Cliente", customer.name || payload.name],
    ["Teléfono / WhatsApp", customer.phone || payload.phone],
  ];

  if (kind === "excursion") {
    return compactRows([
      ...common,
      ["Excursión / destino", details.excursion],
      ["Lugar de recogida", details.pickupLocation],
      ["Fecha", details.date],
      ["Personas", details.pax],
    ]);
  }

  if (kind === "rental") {
    return compactRows([
      ...common,
      ["Tipo de vehículo", details.vehicleType],
      ["Capacidad", details.capacity],
      ["Lugar de entrega", details.deliveryLocation],
      ["Fecha de inicio", details.startDate],
      ["Fecha de fin", details.endDate],
    ]);
  }

  return compactRows([
    ...common,
    ["Tipo de traslado", details.transferType],
    ["Origen", details.origin || payload.origin],
    ["Destino", details.destination || payload.destination],
    ["Fecha", details.date || payload.date],
    ["Hora", details.time],
    ["Personas", details.pax || payload.pax],
    ["Vehículo deseado", details.vehicleType],
  ]);
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL || process.env.CONTACT_EMAIL || "transporteovando@gmail.com";
  const from = process.env.BOOKING_FROM_EMAIL || "Transporte Ovando <onboarding@resend.dev>";

  if (!apiKey) {
    return res.status(503).json({ ok: false, error: "email_not_configured" });
  }

  const payload = req.body || {};
  const rows = rowsFromLead(payload);
  const serviceName = truncate(payload.serviceName || "Solicitud web", 160);
  const customerName = rows.find(([label]) => label === "Cliente")?.[1];
  const customerPhone = rows.find(([label]) => label === "Teléfono / WhatsApp")?.[1];

  if (!required(customerName) || !required(customerPhone) || !required(serviceName)) {
    return res.status(400).json({ ok: false, error: "missing_required_fields" });
  }

  const text = [
    "Nueva solicitud desde la web de Transporte Ovando",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const htmlRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#475569;font-weight:700;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;">${escapeHtml(value)}</td>
    </tr>
  `).join("");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a;">
      <h2 style="margin:0 0 12px;">Nueva solicitud desde la web</h2>
      <p style="margin:0 0 18px;color:#475569;">Transporte Turístico Ovando</p>
      <table style="border-collapse:collapse;width:100%;max-width:680px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
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
        subject: `Nueva solicitud: ${serviceName}`,
        text,
        html,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return res.status(502).json({
        ok: false,
        error: "email_send_failed",
        message: getResendErrorMessage(data),
        details: data,
      });
    }

    return res.status(200).json({ ok: true, id: data.id || null });
  } catch {
    return res.status(502).json({ ok: false, error: "email_send_failed" });
  }
}
