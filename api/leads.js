import { createClient } from '@supabase/supabase-js';

// Sanitize string to prevent XSS / script injection
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .trim();
}

// Simple email validation regex
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }

  try {
    const body = req.body || {};

    // 1. Spam protection: Honeypot field
    // If the hidden field is filled, silently succeed without saving spam
    if (body.honeypot && body.honeypot.trim().length > 0) {
      console.warn('[SPAM DETECTED] Honeypot field triggered.');
      return res.status(200).json({
        success: true,
        message: 'Your request has been received.',
      });
    }

    // 2. Validate required fields
    const name = sanitize(body.name);
    const email = sanitize(body.email).toLowerCase();
    const message = sanitize(body.message);

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Full name is required.',
      });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.',
      });
    }

    if (!message || message.length < 15) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least 15 characters describing your project.',
      });
    }

    // Sanitize optional fields
    const phone = sanitize(body.phone);
    const company = sanitize(body.company || body.business) || 'Undisclosed Client';
    const website = sanitize(body.website);
    const service = sanitize(body.service) || 'Website Design & Build';
    const budget = sanitize(body.budget) || '$1,000–$2,500';
    const timeline = sanitize(body.timeline) || 'Flexible';
    const source = sanitize(body.source) || 'website';

    // 3. Supabase Client Initialization
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.VITE_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('[DATABASE ERROR] Supabase credentials are not configured on server.');
      return res.status(500).json({
        success: false,
        message: 'Database configuration missing. Please contact the studio directly.',
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    // 4. Insert lead record into Supabase
    const { data: leadRecord, error: dbError } = await supabase
      .from('leads')
      .insert([
        {
          name,
          email,
          phone,
          company,
          website,
          service,
          budget,
          timeline,
          message,
          source,
          status: 'new',
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error('[DATABASE ERROR] Failed to insert lead into Supabase:', dbError);
      return res.status(500).json({
        success: false,
        message: 'Unable to submit your request. Please try again.',
      });
    }

    // 5. Send notification email via Resend (optional / non-blocking)
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || 'twispstudio@gmail.com';

    if (resendApiKey) {
      try {
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111827; line-height: 1.6;">
            <div style="background-color: #041B14; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: #10B981; margin: 0; font-size: 22px; letter-spacing: 0.05em;">TWISP STUDIO</h1>
              <p style="color: #A7F3D0; margin: 4px 0 0; font-size: 13px;">NEW PROJECT INQUIRY</p>
            </div>
            <div style="padding: 24px; border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="font-size: 16px; margin-top: 0;">You have received a new project inquiry from <strong>${name}</strong>:</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; width: 140px; font-weight: bold;">Client Name:</td>
                  <td style="padding: 8px 0; color: #111827;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: bold;">Business / Company:</td>
                  <td style="padding: 8px 0; color: #111827;">${company}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0; color: #10B981; font-weight: bold;"><a href="mailto:${email}" style="color: #10B981;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: bold;">Phone:</td>
                  <td style="padding: 8px 0; color: #111827;">${phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: bold;">Current Website:</td>
                  <td style="padding: 8px 0; color: #111827;">${website ? `<a href="${website}">${website}</a>` : 'None'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: bold;">Service Needed:</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: bold;">${service}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: bold;">Budget Range:</td>
                  <td style="padding: 8px 0; color: #111827;">${budget}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: bold;">Timeline:</td>
                  <td style="padding: 8px 0; color: #111827;">${timeline}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: bold;">Received:</td>
                  <td style="padding: 8px 0; color: #111827;">${new Date().toUTCString()}</td>
                </tr>
              </table>

              <div style="background-color: #F3F4F6; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                <div style="font-size: 12px; font-weight: bold; color: #4B5563; text-transform: uppercase; margin-bottom: 6px;">Project Description:</div>
                <div style="white-space: pre-wrap; font-size: 14px; color: #1F2937;">${message}</div>
              </div>

              <p style="font-size: 12px; color: #9CA3AF; margin-bottom: 0;">Reference ID: ${leadRecord.id} • Twisp Studio CRM</p>
            </div>
          </div>
        `;

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Twisp Inquiries <onboarding@resend.dev>',
            to: [adminEmail],
            subject: `New Twisp Website Inquiry — ${name} (${company})`,
            html: emailHtml,
            reply_to: email,
          }),
        });
      } catch (emailErr) {
        console.warn('[EMAIL WARNING] Notification email could not be delivered:', emailErr);
      }
    }

    // 6. Return standard success response
    return res.status(200).json({
      success: true,
      message: 'Your request has been received.',
      data: {
        id: leadRecord.id,
        name: leadRecord.name,
        company: leadRecord.company,
        business: leadRecord.company,
        service: leadRecord.service,
        budget: leadRecord.budget,
        timeline: leadRecord.timeline,
        created_at: leadRecord.created_at,
      },
    });
  } catch (err) {
    console.error('[SERVER ERROR] Unexpected error handling lead submission:', err);
    return res.status(500).json({
      success: false,
      message: 'Unable to submit your request. Please try again.',
    });
  }
}
