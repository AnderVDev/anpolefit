import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendPasswordRestEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXTAUTH_URL}/new-password?token=${token}`;

  try {
    await resend.emails.send({
      from: "AnpoleFit <onboarding@resend.dev>",
      to: email,
      subject: "Reset you password",
      html: `
                <p>Click the link below to reset your password</p>
                <a href="${resetLink}">Reset password</a>
            `,
    });
  } catch (error) {
    console.log(error);
    return {
      error: true,
    };
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;
  try {
    await resend.emails.send({
      from: "AnpoleFit <onboarding@resend.dev>",
      to: email,
      subject: "verify your email",
      html: `
                <p>Click the link below to verify your email</p>
                <a href="${verificationLink}">Verify email</a>
            `,
    });
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
    };
  }
};
