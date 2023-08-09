import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { render } from "@react-email/components";
import ForgotPassword from "~/mail/ForgotPassword";

// TODO: ILANGIN INI YA SOALNYA DIPAKE NGETEST DOANG - Kinan
export const emailRouter = createTRPCRouter({
  sendEmail: publicProcedure
    .input(
      z.object({
        from: z.string().email(),
        to: z.string().email(),
        subject: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const info = await ctx.transporter.sendMail({
        from: input.from,
        to: input.to,
        subject: input.subject,
        html: render(<ForgotPassword />),
      });

      return info.messageId;
    }),
});
