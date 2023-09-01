import { Lembaga, type Merchandise, type UnitProfile } from "@prisma/client";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const showcaseRouter = createTRPCRouter({
  visitUnit: protectedProcedure
    .input(
      z.object({
        unitId: z.string().uuid(),
        pin: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {

      await ctx.prisma.$transaction(async (tx) => {
        const unitVisit = await tx.unitVisit.findUnique({
          where: {
            studentId_unitId: {
              studentId: ctx.session.user.id,
              unitId: input.unitId,
            },
          },
        });

        if (unitVisit)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User already visited this unit",
          });

        const unit = await tx.unitProfile.findUnique({
          where: { userId: input.unitId, pin: input.pin },
        });

        if (!unit)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid or expired code",
          });

        await tx.unitVisit.create({
          data: {
            studentId: ctx.session.user.id,
            unitId: input.unitId,
          },
        });

        await tx.unitProfile.update({
          where: {
            userId: unit.userId,
          },
          data: {
            visitedCount: {
              increment: 1,
            },
          },
        });
      });

      return {
        message: `Visit success`,
      };
    }),

  checkoutMerchandise: protectedProcedure
    .input(
      z.object({
        items: z
          .object({
            merchandiseId: z.string().uuid(),
            amount: z.number().int().gt(0),
          })
          .array()
          .min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.$transaction(async (tx) => {
        const ids = input.items.map((i) => i.merchandiseId);
        // Check stock enough
        const merch = await tx.merchandise.findMany({
          where: {
            id: {
              in: ids,
            },
            isPublished: true,
          },
        });

        if (merch.length !== ids.length)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Some item are not found",
          });

        const merchMap = new Map<string, Merchandise>();

        merch.forEach((m) => {
          merchMap.set(m.id, m);
        });

        let coinsNeeded = 0;

        // check stock
        input.items.forEach((item) => {
          const merch = merchMap.get(item.merchandiseId);

          // this is guaranteed
          if (merch) {
            if (merch.stock < item.amount)
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Some merchandise are out of stock",
              });
            coinsNeeded += merch.price * item.amount;
          } else {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Merch not found",
            });
          }
        });

        const userProfile = await tx.profile.findUniqueOrThrow({
          where: { userId: ctx.session.user.id },
        });

        // check coin
        if (userProfile.coin < coinsNeeded)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User coin is not enough",
          });

        // checkout every item
        for (const item of input.items) {
          const merch = merchMap.get(item.merchandiseId);

          // this is guaranteed
          if (merch) {
            await tx.merchandise.update({
              where: { id: merch.id },
              data: { stock: { decrement: item.amount } },
            });

            const merchCheckout = await tx.merchandiseCheckout.create({
              data: {
                studentId: ctx.session.user.id,
                amount: item.amount * merch.price,
              },
            });

            await tx.merchandiseRequest.create({
              data: {
                studentId: ctx.session.user.id,
                merchId: merch.id,
                merchCheckoutId: merchCheckout.id,
                quantity: item.amount,
              },
            });
          } else {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Merch not found",
            });
          }
        }

        await tx.profile.update({
          where: {
            userId: ctx.session.user.id,
          },
          data: {
            coin: {
              decrement: coinsNeeded,
            },
          },
        });
      });

      return {
        message: "Checkout success",
      };
    }),

  // Menampilkan seluruh unit sebagai array biasa
  getAllUnits: publicProcedure
    .input(
      z.object({
        searchValue: z.string().optional(),
        lembaga: z.nativeEnum(Lembaga).optional(),
        group: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.unitProfile.findMany({
        where: {
          name: {
            contains: input.searchValue,
            mode: "insensitive",
          },
          group: input.group,
          lembaga: input.lembaga,
        },
        orderBy: {
          name: "asc",
        },
      });
    }),
  getUnitsByGroup: publicProcedure
    .input(
      z.object({
        group: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const units = await ctx.prisma.unitProfile.findMany({
        where: {
          lembaga: "UKM",
          group: input.group,
        },
      });
      return units;
    }),
  // Menampilan seluruh unit sebagai key-value pair dengan key lembaga dan value array unit
  getAllUnitsGrouped: publicProcedure
    .input(
      z.object({
        by: z.enum(["lembaga", "group"]),
        searchValue: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const units = await ctx.prisma.unitProfile.findMany({
        where: {
          name: {
            contains: input.searchValue,
            mode: "insensitive",
          },
        },
        orderBy: {
          name: "asc",
        },
      });

      return units.reduce((groups, unit) => {
        const value = unit[input.by];

        if (!value) {
          return groups;
        }

        if ("lembaga" in groups) {
          groups.lembaga.push(unit);
        } else {
          groups.lembaga = [unit];
        }

        return groups;
      }, {} as Record<string, UnitProfile[]>);
    }),

  // Menampilkan seluruh unit yang telah dikunjungi sebagai array biasa
  getAllVisitedUnits: protectedProcedure
    .input(
      z.object({
        lembaga: z.nativeEnum(Lembaga).optional(),
        searchValue: z.string().optional(),
        limit: z.number().int().gt(0).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      // Quite a complex query, but it's the best I can do
      // Bisa diubah schema-nya, visitation diubah menjadi relasi antara user dengan unitProfile
      const unitVisitations = await ctx.prisma.unitVisit.findMany({
        where: {
          studentId: ctx.session.user.id,
          unit: {
            unitProfile: {
              name: {
                contains: input.searchValue,
                mode: "insensitive",
              },
              lembaga: input.lembaga,
            },
          },
        },
        include: {
          unit: {
            include: {
              unitProfile: true,
            },
          },
        },
        take: input.limit,
      });

      return unitVisitations
        .map((unitVisitation) => {
          return unitVisitation.unit.unitProfile;
        })
        .filter((unitProfile): unitProfile is UnitProfile => {
          return unitProfile !== null;
        });
    }),

  // Menampilkan seluruh merchandise sebagai array biasa
  getAllMerchandise: publicProcedure
    .input(
      z.object({
        searchValue: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.merchandise.findMany({
        where: {
          name: {
            contains: input.searchValue,
            mode: "insensitive",
          },
          isPublished: true,
        },
        orderBy: [{ name: "desc" }],
      });
    }),

  // Menampilkan seluruh merchandise yang telah dibeli sebagai array biasa
  getMerchandiseCheckoutHistory: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.merchandiseRequest.findMany({
      where: {
        studentId: ctx.session.user.id,
      },
      include: {
        merchCheckout: true,
        merch: true,
      },
      orderBy: [{ createdAt: "desc" }],
    });
  }),

  getUnitById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.unitProfile.findUnique({
        where: { userId: input.id },
      });

      if (!result) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Unit profile not found",
        });
      }

      const visitation = await ctx.prisma.unitVisit.findUnique({
        where: {
          studentId_unitId: {
            studentId: ctx.session.user.id,
            unitId: input.id,
          },
        },
      });

      return {
        visited: visitation !== null,
        ...result,
      };
    }),

  getGroups: publicProcedure
    .input(z.object({ lembaga: z.nativeEnum(Lembaga) }))
    .query(async ({ ctx, input }) => {
      const unitProfiles = await ctx.prisma.unitProfile.findMany({
        distinct: ["group"],
        where: {
          lembaga: input.lembaga,
          group: {
            not: null,
          },
        },
      });

      return unitProfiles
        .map((e) => e.group)
        .filter((e): e is string => {
          return e !== null;
        });
    }),
});
