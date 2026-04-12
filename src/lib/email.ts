// E-posta bildirim servisi
// SMTP ile e-posta gönderim

interface SendEmailOptions {
    to: string
    subject: string
    html: string
}

export async function sendEmail({ to, subject, html }: SendEmailOptions): Promise<boolean> {
    try {
        // Dynamically import nodemailer to avoid build issues if not installed
        const nodemailer = await import('nodemailer')

        const transporter = nodemailer.default.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })

        await transporter.sendMail({
            from: `"New Social Agency" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        })

        console.log(`[EMAIL] Mail gönderildi: ${to} - ${subject}`)
        return true
    } catch (error) {
        console.error('[EMAIL] Mail gönderilemedi:', error)
        return false
    }
}

export async function sendTaskCompletedEmail(taskTitle: string, employeeName: string, taskId: string) {
    const adminEmail = process.env.ADMIN_EMAIL

    if (!adminEmail) {
        console.warn('[EMAIL] ADMIN_EMAIL tanımlanmamış, mail gönderilemiyor.')
        return false
    }

    const siteUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

    return sendEmail({
        to: adminEmail,
        subject: `✅ Görev Tamamlandı: ${taskTitle}`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #18181b; color: #fff; border-radius: 12px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 24px 32px;">
                    <h1 style="margin: 0; font-size: 20px; font-weight: 600;">New Social Agency</h1>
                    <p style="margin: 4px 0 0; opacity: 0.9; font-size: 14px;">Görev Bildirimi</p>
                </div>
                <div style="padding: 32px;">
                    <div style="background: #27272a; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 20px;">
                        <h2 style="margin: 0 0 8px; font-size: 18px; color: #fff;">${taskTitle}</h2>
                        <p style="margin: 0; color: #a1a1aa; font-size: 14px;">
                            <strong style="color: #3b82f6;">${employeeName}</strong> bu görevi tamamladı.
                        </p>
                    </div>
                    <p style="color: #a1a1aa; font-size: 14px;">Görev ödeme aşamasına geçti. Detayları incelemek için aşağıdaki butona tıklayın.</p>
                    <a href="${siteUrl}/admin/gorevler/${taskId}" 
                       style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; margin-top: 16px;">
                        Görevi İncele →
                    </a>
                </div>
                <div style="padding: 16px 32px; background: #09090b; text-align: center;">
                    <p style="margin: 0; color: #52525b; font-size: 12px;">New Social Agency Briefing Sistemi</p>
                </div>
            </div>
        `,
    })
}
