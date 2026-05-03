const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";

// ╔══════════════════════════════════════════════════════════╗
// ║  EDIT THIS SECTION — all email content lives here        ║
// ╚══════════════════════════════════════════════════════════╝
const config = {
  subject:     "🎉 You're officially on the Aurrallo waitlist!",
  previewText: "Get ready to stop chasing invoices forever. We'll be in touch soon 🚀",

  from:    { name: "The Team at Aurrallo", email: "hello@aurrallo.com" },
  replyTo: "hello@aurrallo.com",

  brand: { name: "Aurrallo" },

  hero: {
    topEmoji:       "🎉",
    headline:       "You're on the list — and we're pumped.",
    subtext:        "Thanks for signing up. We're building something that makes getting paid completely effortless, and you're one of the first to know about it.",
    secondaryEmoji: "🚀",
  },

  sections: [
    {
      emoji: "📊",
      title: "So what exactly is Aurrallo?",
      body:  "Aurrallo connects to QuickBooks and automatically sends professional follow-up reminders for overdue invoices — on your schedule, in your voice. No more awkward emails. No more forgotten invoices. Just get paid.",
    },
    {
      emoji: "⏳",
      title: "When do I get access?",
      body:  "We're in private beta right now, growing slowly and intentionally so we can give every user the attention they deserve. You'll be among the very first to get access — and early members get an exclusive founding discount. 👀",
    },
    {
      emoji: "💬",
      title: "Have questions or feedback?",
      body:  "Seriously — just hit reply. We read every single message and genuinely love hearing from people who are in the same pain we're solving. Your feedback shapes what we build next.",
    },
    {
      emoji: "📲",
      title: "Stay in the loop",
      body:  "We share behind-the-scenes updates, launch news, and early access drops on Instagram. Follow along so you don't miss a thing.",
    },
  ],

  cta: {
    preText:         "Follow us for product updates, early access drops, and launch news 👇",
    emoji:           "📸",
    text:            "Follow @aurrallo on Instagram",
    url:             "https://www.instagram.com/aurrallo/",
    buttonColor:     "#6c63ff",
    buttonTextColor: "#ffffff",
  },

  closing: {
    emoji:     "🙏",
    text:      "Seriously, thank you for being here early. It means everything.",
    signature: "— The Aurrallo team",
  },

  footer: {
    tagline:         "Aurrallo · Automated invoice follow-ups, powered by QuickBooks.",
    website:         "https://aurrallo.com",
    email:           "hello@aurrallo.com",
    unsubscribeText: "You received this because you signed up at aurrallo.com. No spam, ever.",
  },
};
// ╚══════════════════════════════════════════════════════════╝

// ── Types ─────────────────────────────────────────────────
interface WaitlistRecord {
  id: number;
  email: string;
  source: string;
  created_at: string;
}
interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: WaitlistRecord;
  schema: string;
}

// ── HTML builder ──────────────────────────────────────────
function buildHtml(_recipientEmail: string): string {
  const accent = config.cta.buttonColor;

  const sectionsHtml = config.sections.map((s) => `
    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
      <tr>
        <td style="background-color:#f5f4ff;border-radius:14px;padding:22px 26px;border-left:4px solid ${accent};">
          <div style="font-size:28px;line-height:1;margin-bottom:10px;">${s.emoji}</div>
          <div style="font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;font-size:15px;font-weight:700;color:#1a1a2e;margin-bottom:7px;">${s.title}</div>
          <div style="font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;font-size:14px;color:#555555;line-height:1.7;">${s.body}</div>
        </td>
      </tr>
    </table>`).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>${config.subject}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#eeeef6;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;">

  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;color:#eeeef6;line-height:1px;">
    ${config.previewText}&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#eeeef6">
    <tr>
      <td align="center" style="padding:48px 16px;">
        <table width="600" border="0" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td bgcolor="#0a0920" style="border-radius:20px 20px 0 0;padding:52px 48px 44px;text-align:center;">
              <div style="font-size:58px;line-height:1;margin-bottom:14px;">${config.hero.topEmoji}</div>
              <div style="font-size:11px;color:#9aa0ff;letter-spacing:0.16em;text-transform:uppercase;font-weight:700;margin-bottom:22px;font-family:Arial,sans-serif;">${config.brand.name}</div>
              <h1 style="color:#ffffff;font-size:30px;font-weight:700;margin:0;line-height:1.25;font-family:Arial,sans-serif;">${config.hero.headline}</h1>
              <p style="color:rgba(230,230,240,0.70);font-size:15px;line-height:1.7;margin:18px 0 0;font-family:Arial,sans-serif;">${config.hero.subtext}</p>
              <div style="font-size:36px;margin-top:22px;">${config.hero.secondaryEmoji}</div>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td bgcolor="#ffffff" style="padding:44px 48px 36px;">
              ${sectionsHtml}

              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr><td style="border-top:1px solid #ebebf5;padding:10px 0;font-size:0;">&nbsp;</td></tr>
              </table>

              <p style="font-family:Arial,sans-serif;font-size:15px;color:#555555;line-height:1.65;margin:24px 0 20px;text-align:center;">${config.cta.preText}</p>

              <table border="0" cellpadding="0" cellspacing="0" align="center">
                <tr>
                  <td bgcolor="${config.cta.buttonColor}" style="border-radius:14px;">
                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${config.cta.url}" style="height:50px;v-text-anchor:middle;width:260px;" arcsize="28%" stroke="f" fillcolor="${config.cta.buttonColor}"><w:anchorlock/><center><![endif]-->
                    <a href="${config.cta.url}" target="_blank"
                       style="display:inline-block;padding:15px 34px;color:${config.cta.buttonTextColor};font-size:15px;font-weight:700;text-decoration:none;font-family:Arial,sans-serif;">
                      ${config.cta.emoji}&nbsp;&nbsp;${config.cta.text}
                    </a>
                    <!--[if mso]></center></v:roundrect><![endif]-->
                  </td>
                </tr>
              </table>

              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr><td style="border-top:1px solid #ebebf5;padding:18px 0 10px;font-size:0;">&nbsp;</td></tr>
              </table>

              <p style="font-family:Arial,sans-serif;font-size:15px;color:#333333;line-height:1.7;margin:0 0 10px;">
                ${config.closing.emoji}&nbsp; ${config.closing.text}
              </p>
              <p style="font-family:Arial,sans-serif;font-size:14px;color:#888888;margin:0;font-style:italic;">
                ${config.closing.signature}
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td bgcolor="#f7f7fb" style="border-radius:0 0 20px 20px;padding:28px 48px 32px;text-align:center;border-top:1px solid #ebebf5;">
              <p style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#555555;margin:0 0 10px;">
                ${config.footer.tagline}
              </p>
              <p style="font-family:Arial,sans-serif;font-size:12px;color:#aaaaaa;margin:0 0 6px;">
                <a href="${config.footer.website}" style="color:#9aa0ff;text-decoration:none;">${config.footer.website}</a>
                &nbsp;&middot;&nbsp;
                <a href="mailto:${config.footer.email}" style="color:#9aa0ff;text-decoration:none;">${config.footer.email}</a>
              </p>
              <p style="font-family:Arial,sans-serif;font-size:11px;color:#bbbbbb;margin:0;">
                ${config.footer.unsubscribeText}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Handler ───────────────────────────────────────────────
Deno.serve(async (req: Request) => {
  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY secret is not set");
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const payload: WebhookPayload = await req.json();

    if (payload.type !== "INSERT" || payload.table !== "waitlist") {
      return new Response(
        JSON.stringify({ skipped: true }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    const { email } = payload.record;
    if (!email) {
      return new Response(
        JSON.stringify({ error: "No email in record" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const html = buildHtml(email);

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from:     `${config.from.name} <${config.from.email}>`,
        to:       [email],
        reply_to: config.replyTo,
        subject:  config.subject,
        html,
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text();
      console.error("Resend error:", detail);
      return new Response(
        JSON.stringify({ error: "Resend rejected the request", detail }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const data = await resendRes.json();
    console.log(`Email sent → ${email} (id: ${data.id})`);
    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );

  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});
