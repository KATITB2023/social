import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { type SUBMISSION_STATUS } from "~/server/types/assignment";

export const assignmentRouter = createTRPCRouter({
  viewAssignment: protectedProcedure

    .input(
      z.object({
        assignmentId: z.string().uuid(),
      })
    )

    .query(async ({ ctx, input }) => {
      const assignment = await ctx.prisma.assignment.findFirst({
        where: {
          id: input.assignmentId,
        },

        select: {
          id: true,
          title: true,
          filePath: true,
          description: true,
          startTime: true,
          endTime: true,
        },
      });

      // Error : Assignment not found
      if (!assignment) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Assignment not found",
        });
      }

      const isSubmissionExists =
        await ctx.prisma.assignmentSubmission.findFirst({
          where: {
            studentId: ctx.session.user.id,
            assignmentId: input.assignmentId,
          },
        });

      let submissionStatus: SUBMISSION_STATUS;

      if (isSubmissionExists) {
        // if assignment has been submitted
        submissionStatus = "SUBMITTED";
      } else {
        const currentTime = new Date();
        if (currentTime > assignment.endTime) {
          // if current time passed assignment's deadline
          submissionStatus = "PASSED_DEADLINE";
        } else {
          // if deadline has not been passed
          submissionStatus = "NOT_SUBMITTED";
        }
      }

      return { ...assignment, submissionStatus };
    }),

  submitAssignment: protectedProcedure

    .input(
      z.object({
        assignmentId: z.string().uuid(),
        filePath: z.string(),
      })
    )

    .query(async ({ ctx, input }) => {
      const assignment = await ctx.prisma.assignment.findFirst({
        where: {
          id: input.assignmentId,
        },

        select: {
          endTime: true,
        },
      });

      // Error : Assignment not found
      if (!assignment) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Assignment tidak ditemukan",
        });
      }

      // Error : Submission deadline has passed
      const currentTime = new Date();
      if (currentTime > assignment.endTime) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Submission sudah ditutup",
        });
      }

      // Check existing submission
      const isSubmissionExists =
        await ctx.prisma.assignmentSubmission.findFirst({
          where: {
            studentId: ctx.session.user.id,
            assignmentId: input.assignmentId,
          },
        });

      if (isSubmissionExists) {
        // Update existing submission

        // Get latest assignment submission score
        const prevAssgnScore = await ctx.prisma.assignmentSubmission.findFirst({
          where: {
            studentId: ctx.session.user.id,
            assignmentId: input.assignmentId,
          },
          select: {
            score: true,
          },
        });

        // Get latest user's point
        const prevUserPoint = await ctx.prisma.profile.findFirst({
          where: {
            userId: ctx.session.user.id,
          },
          select: {
            point: true,
          },
        });

        let updatedPoint = prevUserPoint.point - prevAssgnScore.score;

        // Update user's point
        await ctx.prisma.profile.update({
          where: {
            userId: ctx.session.user.id,
          },
          data: {
            point: updatedPoint,
          },
        });

        // Replace existing submission
        await ctx.prisma.assignmentSubmission.update({
          where: {
            id: isSubmissionExists.id,
          },
          data: {
            filePath: input.filePath,
            score: null,
          },
        });
      } else {
        // Create new submission

        let createNewSubmission: Prisma.AssignmentSubmissionCreateInput;

        createNewSubmission = {
          filePath: input.filePath,
          score: null,
          student: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          assignment: {
            connect: {
              id: input.assignmentId,
            },
          },
        };

        await ctx.prisma.assignmentSubmission.create({
          data: createNewSubmission,
        });

        return "Tugas berhasil dikumpulkan";
      }
    }),
});
