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
      const UNIT_VISIT_REWARD_POINTS = 100;

      await ctx.prisma.$transaction(async (client) => {
        const unitVisit = await client.unitVisit.findUnique({
          where: {
            studentId_unitId: {
              studentId: ctx.session.user.id,
              unitId: input.unitId,
            },
          },
        });

        if (unitVisit === null) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User already visited this unit",
          });
        }

        const unit = await client.unitProfile.findFirst({
          where: { userId: input.unitId, pin: input.pin },
        });

        if (unit === null) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid or expired code",
          });
        }

        await client.unitVisit.create({
          data: {
            studentId: ctx.session.user.id,
            unitId: input.unitId,
          },
        });

        await client.unitReward.create({
          data: {
            studentId: ctx.session.user.id,
            unitId: input.unitId,
            reward: UNIT_VISIT_REWARD_POINTS,
          },
        });

        await client.profile.update({
          where: {
            userId: ctx.session.user.id,
          },
          data: {
            coin: {
              increment: UNIT_VISIT_REWARD_POINTS,
            },
          },
        });

        await client.unitProfile.update({
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
        message: `Visit success. You got ${UNIT_VISIT_REWARD_POINTS} coins`,
        reward: UNIT_VISIT_REWARD_POINTS,
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
      await ctx.prisma.$transaction(async (client) => {
        const ids = input.items.map((i) => i.merchandiseId);
        // check stock enough
        const merch = await client.merchandise.findMany({
          where: {
            id: {
              in: ids,
            },
            isPublished: true,
          },
        });

        if (merch.length !== ids.length) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Some item are not found",
          });
        }

        const merchMap = new Map<string, Merchandise>();

        merch.forEach((m) => {
          merchMap.set(m.id, m);
        });

        let pointsNeeded = 0;

        // check stock
        input.items.forEach((i) => {
          const m = merchMap.get(i.merchandiseId);

          // this is guaranteed
          if (m) {
            if (m.stock < i.amount) {
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Some merchandise are out of stock",
              });
            }
            pointsNeeded = pointsNeeded + m.price * i.amount;
          } else {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Merch not found",
            });
          }
        });

        const userProfile = await client.profile.findUniqueOrThrow({
          where: { userId: ctx.session.user.id },
        });

        // check coint
        if (userProfile.coin < pointsNeeded) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User coin is not enough",
          });
        }

        // checkout every item
        for (const i of input.items) {
          const m = merchMap.get(i.merchandiseId);

          // this is guaranteed
          if (m) {
            await client.merchandise.update({
              where: { id: m.id },
              data: { stock: { decrement: i.amount } },
            });

            const merchCheckout = await client.merchandiseCheckout.create({
              data: {
                studentId: ctx.session.user.id,
                amount: i.amount * m.price,
              },
            });

            await client.merchandiseRequest.create({
              data: {
                studentId: ctx.session.user.id,
                merchId: m.id,
                merchCheckoutId: merchCheckout.id,
                quantity: i.amount,
              },
            });
          } else {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Merch not found",
            });
          }
        }

        await client.profile.update({
          where: {
            userId: ctx.session.user.id,
          },
          data: {
            coin: {
              decrement: pointsNeeded,
            },
          },
        });
      });
    }),
  // Menampilkan seluruh unit sebagai array biasa
  getAllUnits: publicProcedure
    .input(
      z.object({
        searchValue: z.string().default(""),
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
        const lembaga = unit[input.by];

        if (lembaga === null) {
          return groups;
        }

        if (!groups[lembaga]) {
          groups[lembaga] = [unit];
        } else {
          groups[lembaga]?.push(unit);
        }

        return groups;
      }, {} as Record<string, UnitProfile[]>);
    }),
  // Menampilkan seluruh unit yang telah dikunjungi sebagai array biasa
  getAllVisitedUnits: protectedProcedure
    .input(
      z.object({
        lembaga: z.nativeEnum(Lembaga).optional(),
        searchValue: z.string().default(""),
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
        searchValue: z.string().default(""),
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
      const result = await ctx.prisma.unitProfile.findFirst({
        where: { userId: input.id },
      });

      if (result === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Unit profile not found",
        });
      }

      const visitation = await ctx.prisma.unitVisit.findFirst({
        where: {
          unitId: result.userId,
          studentId: ctx.session.user.id,
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
      return (
        await ctx.prisma.unitProfile.findMany({
          distinct: ["group"],
          where: {
            lembaga: input.lembaga,
            group: {
              not: null,
            },
          },
        })
      ).map((e) => e.group) as string[];
    }),
});
