import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";

export const absensiRouter = createTRPCRouter({
  viewAbsensi: publicProcedure
    .input(z.object({ studentId: z.string().uuid(),
                      eventId: z.string().uuid()}))
    .query(async ({ctx, input}) => {

    const getAttendanceRecord = await ctx.prisma.attendanceRecord.findFirst({
      where:{
        studentId: input.studentId,
        eventId: input.eventId
      },
      select:{
        status: true
      }
    })

    const getEventData = await ctx.prisma.attendanceEvent.findFirst({
      where:{
        id: input.eventId
      },
    })

    // Validasi event
    if (!getEventData) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Event tidak ditemukan"
      })
    }

    // Validasi waktu
    if (!getAttendanceRecord) {
      // const endTime = getEventData.endTime.getTime() / 1000;
      // const startTime = getEventData.startTime.getTime() / 1000;
      // const currentTime = new Date().getTime() / 1000;

      // if (endTime < currentTime) {
      //   return "Tidak Absen"
      // } else if (startTime > currentTime) {
      //   return "Absensi belum dimulai"
      // } else {
      //   return "Belum Absen"
      // }

      const currentTime = new Date()
      if (getEventData.endTime < currentTime) {
        return "Tidak Absen" // Sudah lewat batas waktu
      } else if (getEventData.startTime > currentTime) {
        return "Absensi belum dimulai" // Belum masuk batas waktu
      } else {
        return "Belum Absen" // Dalam batas waktu
      }
    }
  
    return "Sudah Absen"   
  }),
    
  submitAbsensi: publicProcedure
    .input(z.object({ studentId: z.string().uuid(),
                      eventId: z.string().uuid()}))
    .query(async ({ctx, input}) => {
      
    // Error jika absen lebih dari 1 kali
    const findRecord = await ctx.prisma.attendanceRecord.findFirst({
      where:{
        eventId: input.eventId,
        studentId: input.studentId
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
      status: "HADIR",
      reason: "tidak ada",
      student:{
        connect:{
          id: input.studentId
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
