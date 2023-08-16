import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  type AttendanceEvent,
  type AttendanceRecord,
  Status,
} from "@prisma/client";

export const absensiRouter = createTRPCRouter({
  viewAbsensi: protectedProcedure.query(async ({ ctx }) => {
    const absenStatus: {
      event: AttendanceEvent;
      record: AttendanceRecord | null;
      status: Status | null;
      day: string;
    }[] = [];
    const student = ctx.session.user;

    const getEventData = await ctx.prisma.attendanceEvent.findMany({
      include: {
        record: {
          where: {
            studentId: student.id,
          },
        },
      },
      orderBy: [{ startTime: "desc" }],
    });

    const getEventDayData = await ctx.prisma.attendanceDay.findMany({
      include: {},
    });

    for (const eventData of getEventData) {
      // Status
      let status;
      if (!eventData.record[0]) {
        status = Status.TIDAK_HADIR;
      } else {
        status = eventData.record[0].status;
      }
      if (!status) {
        status = null;
      }
      let day = "Day 0";
      for (const eventDay of getEventDayData) {
        if (eventData.dayId == eventDay.id) {
          day = eventDay.name;
          break;
        }
      }

      // Record
      let record;
      if (!eventData.record[0]) {
        record = null;
      } else {
        record = eventData.record[0];
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { record: r, ...rest } = eventData;

      absenStatus.push({ event: rest, record, status: status, day: day });
    }

    return absenStatus;
  }),
  submitAbsensi: protectedProcedure
    .input(z.object({ eventId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      // Error jika absen lebih dari 1 kali
      const student = ctx.session.user;

      const findRecord = await ctx.prisma.attendanceRecord.findFirst({
        where: {
          eventId: input.eventId,
          studentId: student.id,
        },
      });

      if (findRecord !== null && findRecord.status !== "TIDAK_HADIR") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Sudah Melakukan Absensi!",
        });
      }

      // Validasi waktu absen
      const currentTime = new Date();
      const getEventData = await ctx.prisma.attendanceEvent.findFirst({
        where: {
          id: input.eventId,
        },
      });

      if (getEventData) {
        if (currentTime > getEventData.endTime) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Waktu absensi telah berakhir!",
          });
        } else if (currentTime < getEventData.startTime) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Waktu absensi belum dimulai!",
          });
        }
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Event tidak ditemukan!",
        });
      }

      try {
        await ctx.prisma.attendanceRecord.create({
          data: {
            date: new Date(),
            status: Status.HADIR,
            student: {
              connect: {
                id: student?.id,
              },
            },
            event: {
              connect: {
                id: input.eventId,
              },
            },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Gagal melakukan absensi!",
        });
      }

      return "Absen Tercatat!";
    }),
});
