import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { AssignmentType } from "@prisma/client";
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
      });

      // Error : Assignment not found
      if (!assignment) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Assignment not found",
        });
      }

      const submission = await ctx.prisma.assignmentSubmission.findFirst({
        where: {
          studentId: ctx.session.user.id,
          assignmentId: input.assignmentId,
        },
      });

      let submissionStatus: SUBMISSION_STATUS;

      if (submission) {
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

      return { ...assignment, submissionStatus, submission };
    }),

  getAssignmentList: protectedProcedure
    .input(
      z.object({
        type: z.nativeEnum(AssignmentType).default("MANDATORY"),
      })
    )
    .query(async ({ input, ctx }) => {
      // Get all assignments
      const allAssignments = await ctx.prisma.assignment.findMany({
        where: {
          type:
            input.type === "SIDE_QUEST"
              ? "SIDE_QUEST"
              : { in: ["MANDATORY", "DAILY_QUEST"] },
        },
        include: {
          submission: {
            where: {
              studentId: ctx.session.user.id,
            },
          },
        },
      });

      return allAssignments.map((assignment) => {
        const submission = assignment.submission[0];

        // Get submission status
        let submissionStatus: SUBMISSION_STATUS;

        if (submission) {
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

        return {
          ...assignment,
          submissionStatus,
          score: submission ? submission.score : null,
        };
      });
    }),
  submitAssignment: protectedProcedure
    .input(
      z.object({
        assignmentId: z.string().uuid(),
        filePath: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const assignment = await ctx.prisma.assignment.findFirst({
        where: {
          id: input.assignmentId,
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
        const prevAssgnScore =
          await ctx.prisma.assignmentSubmission.findFirstOrThrow({
            where: {
              studentId: ctx.session.user.id,
              assignmentId: input.assignmentId,
            },
            select: {
              score: true,
            },
          });

        // Get latest user's point
        const prevUserPoint = await ctx.prisma.profile.findFirstOrThrow({
          where: {
            userId: ctx.session.user.id,
          },
          select: {
            point: true,
          },
        });

        if (prevAssgnScore.score) {
          const updatedPoint = prevUserPoint.point - prevAssgnScore.score;

          // Update user's point
          await ctx.prisma.profile.update({
            where: {
              userId: ctx.session.user.id,
            },
            data: {
              point: updatedPoint,
            },
          });
        }

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

        return "Tugas berhasil direvisi";
      } else {
        await ctx.prisma.assignmentSubmission.create({
          data: {
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
          },
        });

        return "Tugas berhasil dikumpulkan";
      }
    }),
});
