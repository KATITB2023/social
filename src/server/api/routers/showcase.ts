import { Lembaga, type UnitProfile } from "@prisma/client";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const showcaseRouter = createTRPCRouter({
  // Menampilkan seluruh unit sebagai array biasa
  getAllUnits: publicProcedure
    .input(
      z.object({
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
      });

      return units;
    }),

  // Menampilan seluruh unit sebagai key-value pair dengan key lembaga dan value array unit
  getAllUnitsGrouped: publicProcedure
    .input(
      z.object({
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
      });

      const groupedUnits = units.reduce((groups, unit) => {
        const lembaga = unit.lembaga;

        if (!groups[lembaga]) {
          groups[lembaga] = [unit];
        } else {
          groups[lembaga].push(unit);
        }

        return groups;
      }, {} as Record<Lembaga, UnitProfile[]>);

      return groupedUnits;
    }),

  // Menampilkan seluruh unit sebagai array biasa yang difilter berdasarkan lembaga
  getUnitsByLembaga: publicProcedure
    .input(
      z.object({
        lembaga: z.nativeEnum(Lembaga),
        searchValue: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const units = await ctx.prisma.unitProfile.findMany({
        where: {
          lembaga: input.lembaga,
          name: {
            contains: input.searchValue,
            mode: "insensitive",
          },
        },
      });

      return units;
    }),

  // Menampilkan seluruh unit yang telah dikunjungi sebagai array biasa
  getAllVisitedUnits: protectedProcedure
    .input(
      z.object({
        searchValue: z.string(),
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
      });

      const units = unitVisitations
        .map((unitVisitation) => {
          return unitVisitation.unit.unitProfile;
        })
        .filter((unitProfile): unitProfile is UnitProfile => {
          return unitProfile !== null;
        });

      return units;
    }),

  // Menampilan seluruh unit yang telah dikunjungi sebagai key-value pair dengan key lembaga dan value array unit
  getAllVisitedUnitsGrouped: protectedProcedure
    .input(
      z.object({
        searchValue: z.string(),
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
      });

      const units = unitVisitations
        .map((unitVisitation) => {
          return unitVisitation.unit.unitProfile;
        })
        .filter((unitProfile): unitProfile is UnitProfile => {
          return unitProfile !== null;
        })
        .reduce((groups, unit) => {
          const lembaga = unit.lembaga;

          if (!groups[lembaga]) {
            groups[lembaga] = [unit];
          } else {
            groups[lembaga].push(unit);
          }

          return groups;
        }, {} as Record<Lembaga, UnitProfile[]>);

      return units;
    }),

  // Menampilkan seluruh unit yang telah dikunjungi sebagai array biasa yang difilter berdasarkan lembaga
  getVisitedUnitsByLembaga: protectedProcedure
    .input(
      z.object({
        lembaga: z.nativeEnum(Lembaga),
        searchValue: z.string(),
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
              lembaga: input.lembaga,
              name: {
                contains: input.searchValue,
                mode: "insensitive",
              },
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
      });

      const units = unitVisitations
        .map((unitVisitation) => {
          return unitVisitation.unit.unitProfile;
        })
        .filter((unitProfile): unitProfile is UnitProfile => {
          return unitProfile !== null;
        });

      return units;
    }),

  // Menampilkan seluruh merchandise sebagai array biasa
  getAllMerchandise: publicProcedure
    .input(
      z.object({
        searchValue: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const merchandise = await ctx.prisma.merchandise.findMany({
        where: {
          name: {
            contains: input.searchValue,
            mode: "insensitive",
          },
        },
      });

      return merchandise;
    }),

  // Menampilkan seluruh merchandise yang telah dibeli sebagai array biasa
  getMerchandiseCheckoutHistory: protectedProcedure.query(async ({ ctx }) => {
    const merchandiseCheckoutHistory =
      await ctx.prisma.merchandiseCheckout.findMany({
        where: {
          studentId: ctx.session.user.id,
        },
        include: {
          MerchandiseRequest: true,
        },
      });

    return merchandiseCheckoutHistory;
  }),
});
