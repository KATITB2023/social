import { Lembaga, type UnitProfile } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const showcaseRouter = createTRPCRouter({
  getAllVisitedUnits: protectedProcedure.query(async ({ ctx }) => {
    // Quite a complex query, but it's the best I can do
    // Bisa diubah schema-nya, visitation diubah menjadi relasi antara user dengan unitProfile
    const unitVisitations = await ctx.prisma.unitVisit.findMany({
      where: {
        studentId: ctx.session.user.id,
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

  getAllVisitedUnitsGrouped: protectedProcedure.query(async ({ ctx }) => {
    // Quite a complex query, but it's the best I can do
    // Bisa diubah schema-nya, visitation diubah menjadi relasi antara user dengan unitProfile
    const unitVisitations = await ctx.prisma.unitVisit.findMany({
      where: {
        studentId: ctx.session.user.id,
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

  getVisitedUnitsByLembaga: protectedProcedure
    .input(
      z.object({
        lembaga: z.nativeEnum(Lembaga),
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
});
