import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { date, z } from "zod";
import { TRPCError } from "@trpc/server";
import { compareHash, generateHash, generateResetToken } from "~/utils/auth";

export const authRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "hello world";
  }),

  resetPassword: publicProcedure
    .input(z.object({ userId: z.string().uuid(),
                      token: z.string(),
                      newPassword: z.string() }))
    .query(async ({ctx, input}) => {

      // Ambil token dari userId
      const getToken = await ctx.prisma.resetToken.findFirst({
        select:{
          token: true,
          createdAt: true,
          expireTime: true
        },
        where:{
          userId: input.userId
        }
      })

      // Error Message (User tidak ada di table "Reset Token")
      if (!getToken){

        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User Tidak Ditemukan!"
        })

      } else { // User ditemukan
      
        const createdAt = getToken.createdAt 
        const expiredTime = (createdAt.getTime() / 1000) + getToken.expireTime
        const currentTime = new Date().getTime() / 1000

        // Error Message (Token Expired)
        if (expiredTime < currentTime) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Token Expired!"
          })
        }

        // Cek Token Valid atau Tidak Valid
        if (!await compareHash(input.token, getToken.token)){
          // Error Message (Token Tidak Valid)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Token Tidak Valid!"
          })

        } else { // Token Valid

          // Change Password
          await ctx.prisma.user.update({
            where:{
              id: input.userId
            },
            data :{
              passwordHash: await generateHash(input.newPassword)
            }
          })

          // Hapus Token dari table "Reset Token"
          await ctx.prisma.resetToken.delete({
            where:{
              userId: input.userId
            }
          })
          
          // Message Berhasil Ubah Password
          return "Password telah diubah!"
        }
      }
    }),
});

