import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { compareHash, generateHash, generateResetToken } from "~/utils/auth";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  requestResetPassword: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .query(async ({ ctx, input }) => {
      const profile = await ctx.prisma.profile.findUnique({
        where: {
          email: input.email,
        },
        select: {
          userId: true,
        },
      });

      if (!profile) {
        throw new TRPCError({
          message: "User not found",
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

      return `https://BASE_URL/reset-password/${profile.userId}/${resetToken}`;
    }),
  resetPassword: publicProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        token: z.string(),
        newPassword: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      // Ambil token dari userId
      const getToken = await ctx.prisma.resetToken.findFirst({
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
          message: "User Tidak Ditemukan!",
        });
      } else {
        // User ditemukan

        const createdAt = getToken.createdAt;
        const expiredTime = createdAt.getTime() / 1000 + getToken.expireTime;
        const currentTime = new Date().getTime() / 1000;

        // Error Message (Token Expired)
        if (expiredTime < currentTime) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Token Expired!",
          });
        }

        // Cek Token Valid atau Tidak Valid
        if (!(await compareHash(input.token, getToken.token))) {
          // Error Message (Token Tidak Valid)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Token Tidak Valid!",
          });
        } else {
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
        }
      }
    }),
  editPassword : protectedProcedure
    .input(
      z.object({
        oldPassword : z.string(),
        newPassword : z.string(),
      })
    )
    .query(async({ctx,input}) =>{
      const user = await ctx.prisma.user.findFirst({
        where :{
          id : ctx.session.user.id
        }
      })
      if(!user){
        throw new TRPCError({
          code : "BAD_REQUEST",
          message : "User not found!"
        })
      }
      if(!(await compareHash(input.oldPassword,user.passwordHash))){
        throw new TRPCError({
          code : "BAD_REQUEST",
          message : "Password not right"
        })
      }

      await ctx.prisma.user.update({
        where:{
          id : ctx.session.user.id
        },
        data:{
          passwordHash : await generateHash(input.newPassword)
        }
      })
      return "Password has been updated succesfully!"
    })
});
