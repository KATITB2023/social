import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { compareHash, generateHash, generateResetToken } from "~/utils/auth";
import { TRPCError } from "@trpc/server";
import { env } from "~/env.cjs";
import { render } from "@react-email/components";
import ForgotPassword from "~/mail/ForgotPassword";

export const authRouter = createTRPCRouter({
  requestResetPassword: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const profile = await ctx.prisma.profile.findUnique({
        where: {
          email: input.email,
        },
        select: {
          userId: true,
          name: true,
        },
      });

      if (!profile) {
        throw new TRPCError({
          message: "Email anda tidak terdaftar di sistem!",
          code: "BAD_REQUEST",
        });
      }

      await ctx.prisma.resetToken.deleteMany({
        where: {
          userId: profile.userId,
        },
      });

      const { resetToken, hashedToken } = await generateResetToken();

      await ctx.prisma.resetToken.create({
        data: {
          token: hashedToken,
          userId: profile.userId,
        },
      });

      await ctx.transporter.sendMail({
        from: env.SMTP_USER,
        to: input.email,
        subject: "Reset your OSKM password",
        html: render(
          <ForgotPassword
            resetURL={encodeURI(
              `${env.NEXT_PUBLIC_API_URL}/reset-password?userId=${profile.userId}&token=${resetToken}`
            )}
            name={profile.name}
          />
        ),
      });
    }),

  resetPassword: publicProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        token: z.string(),
        newPassword: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Ambil token dari userId
      const getToken = await ctx.prisma.resetToken.findUnique({
        select: {
          token: true,
          createdAt: true,
          expireTime: true,
        },
        where: {
          userId: input.userId,
        },
      });

      // Error Message (User tidak ada di table "Reset Token")
      if (!getToken) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User tidak ditemukan!",
        });
      }

      // User ditemukan
      const createdAt = getToken.createdAt;
      const expiredTime = createdAt.getTime() / 1000 + getToken.expireTime;
      const currentTime = new Date().getTime() / 1000;

      // Error Message (Token Expired)
      if (expiredTime < currentTime) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Token sudah expired!",
        });
      }

      // Cek Token Valid atau Tidak Valid
      if (!(await compareHash(input.token, getToken.token))) {
        // Error Message (Token Tidak Valid)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Token tidak valid!",
        });
      }

      // Token Valid
      // Change Password
      await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          passwordHash: await generateHash(input.newPassword),
        },
      });

      // Hapus Token dari table "Reset Token"
      await ctx.prisma.resetToken.delete({
        where: {
          userId: input.userId,
        },
      });

      // Message Berhasil Ubah Password
      return "Password telah diubah!";
    }),

  editPassword: protectedProcedure
    .input(
      z.object({
        oldPassword: z.string(),
        newPassword: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User tidak ditemukan!",
        });
      }

      const isValid = await compareHash(input.oldPassword, user.passwordHash);
      if (isValid) {
        await ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            passwordHash: await generateHash(input.newPassword),
          },
        });

        return "Password berhasil diupdate!";
      }

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Password not right",
      });
    }),
});
