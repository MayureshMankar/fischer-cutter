import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMIN_EMAIL || 'admin@srideviengineers.com';

export const sendDispatchAlert = async (type: 'ORDER' | 'INQUIRY', data: any) => {
  try {
    const subject = type === 'ORDER' ? '🚨 NEW INDUSTRIAL ORDER RECEIVED' : '📩 NEW TECHNICAL INQUIRY';
    
    // Industrial Template Logic
    const html = type === 'ORDER' ? `
      <div style="font-family: 'Inter', sans-serif; background-color: #0b0c0e; color: #f8fafc; padding: 40px; border: 1px solid #32cd32;">
        <h1 style="color: #32cd32; text-transform: uppercase;">New Service Request</h1>
        <p style="color: #94a3b8;">SRI DEVI ENGINEERS // OPERATIONAL DISPATCH</p>
        <hr style="border-color: #1e293b;" />
        <div style="margin-top: 30px;">
          <p><strong>Services:</strong> ${Array.isArray(data.services) ? data.services.join(', ') : data.services}</p>
          <p><strong>Client:</strong> ${data.user?.name || 'Guest Client'}</p>
          <p><strong>Contact:</strong> ${data.user?.email || 'External Contact'}</p>
          <div style="background-color: #141619; padding: 20px; border: 1px solid #1e293b; margin-top: 20px;">
            <p><strong>Specifications:</strong></p>
            <p style="white-space: pre-wrap;">${data.projectSpecifications}</p>
          </div>
        </div>
        <p style="margin-top: 40px; font-size: 10px; color: #475569;">CONFIDENTIAL INDUSTRIAL DATA // 2026</p>
      </div>
    ` : `
      <div style="font-family: 'Inter', sans-serif; background-color: #0b0c0e; color: #f8fafc; padding: 40px; border: 1px solid #32cd32;">
        <h1 style="color: #32cd32; text-transform: uppercase;">Inquiry Received</h1>
        <p style="color: #94a3b8;">Technical Review // SRI DEVI ENGINEERS</p>
        <hr style="border-color: #1e293b;" />
        <div style="margin-top: 30px;">
          <p><strong>From:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <div style="background-color: #141619; padding: 20px; border: 1px solid #1e293b; margin-top: 20px;">
            <p><strong>Project Details:</strong></p>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
        </div>
        <p style="margin-top: 40px; font-size: 10px; color: #475569;">LOGGED AT MANUFACTURING CENTER</p>
      </div>
    `;

    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    // Handle Attachments
    const attachments = data.files?.map((file: any) => {
      const parts = file.content.split(';base64,');
      const base64Data = parts.pop();
      return {
        filename: file.filename,
        content: Buffer.from(base64Data, 'base64'),
      };
    }) || [];

    const { data: resData, error } = await resend.emails.send({
      from: `Sri Devi Engineers <${fromEmail}>`,
      to: adminEmail,
      subject: subject,
      html: html,
      attachments: attachments,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error };
    }

    return { success: true, data: resData };
  } catch (error) {
    console.error('Dispatch Alert Failure:', error);
    return { success: false, error };
  }
};
