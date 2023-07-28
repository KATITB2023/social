import { record, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Prisma, Status } from "@prisma/client";

export const absensiRouter = createTRPCRouter({
  viewAbsensi: publicProcedure
    .query(async ({ctx}) => {
      
    let absenStatus = []
    const student = await ctx.session?.user
    if (!student){
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User tidak ada!"
      })
    }

    let getEventData = await ctx.prisma.attendanceEvent.findMany({
      include:{
        record:{
          where:{
            studentId: student.id 
          }
        }
      }
    })
    
    for (let eventData of getEventData) {
      // Status
      let status
      if (!eventData.record[0]) {
        status = Status.TIDAK_HADIR
      } else {
        status = eventData.record[0].status
      }
      if (!status) {
        status = null
      }

      // Record
      let record
      if (!eventData.record[0]) {
        record = null
      } else {
        record = eventData.record[0] 
      }
      
      // Event
      let event
      var {record:r, ...rest} = eventData;
      event = rest;

      absenStatus.push({event, record, "status": status})
    }

    return absenStatus
  }),
    
  submitAbsensi: publicProcedure
  .input(z.object({eventId: z.string().uuid()}))
  .query(async ({ctx, input}) => {
    
    // Error jika absen lebih dari 1 kali
    const student = await ctx.session?.user
    if (!student){
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User tidak ada!"
      })
    }

    const findRecord = await ctx.prisma.attendanceRecord.findFirst({
      where:{
        eventId: input.eventId,
        studentId: student.id,
      }
    })
    if (findRecord){
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Sudah Melakukan Absensi!"
      })
    }
    
    // Validasi waktu absen
    const currentTime = new Date()
    const getEventData = await ctx.prisma.attendanceEvent.findFirst({
      where:{
        id: input.eventId
      }
    })

    if (getEventData) {
      if (currentTime > getEventData.endTime){
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message:'Waktu absensi telah berakhir!'
        })
      } else if (currentTime < getEventData.startTime){
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message:'Waktu absensi belum dimulai!'
        })
      }
    } else {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Event tidak ditemukan!"
      })
    }


    // Create new record
    let createNewRecord : Prisma.AttendanceRecordCreateInput

    createNewRecord = {
      date: new Date(),
      status: Status.HADIR,
      reason: "tidak ada",
      student:{
        connect:{
          id: student?.id,
        } 
      },
      event:{
        connect:{
          id: input.eventId
        }
      }
    }

    await ctx.prisma.attendanceRecord.create({
      data: createNewRecord, 
    })

    return "Absen Tercatat!"
  }),

});
