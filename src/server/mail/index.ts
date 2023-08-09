import { createTransport, type Transporter } from "nodemailer";
import type SMTPPool from "nodemailer/lib/smtp-pool";
import { env } from "~/env.cjs";

const instantiateTransporter = () => {
  return createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    pool: true,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
};

const globalForTransporter = globalThis as unknown as {
  transporter?: Transporter<SMTPPool.SentMessageInfo>;
};

export const transporter =
  globalForTransporter.transporter ?? instantiateTransporter();

if (process.env.NODE_ENV !== "production")
  globalForTransporter.transporter = transporter;
