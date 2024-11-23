import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    await resend.emails.send({
      from: "AnpoleFit <onboarding@resend.dev>",
      to: email,
      subject: "verify your email",
      html: `
                <p>Click the link below to verify your email</p>
                <a href="${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}">Verify email</a>
            `,
    })
    return{
        success: true
    }
  } catch (error) {
    console.log(error);
    return {
      error: true,
    };
  }
};
