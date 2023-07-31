import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import {type SUBMISSION_STATUS} from "~/server/types/assignment";
import { ASSIGNMENT_TYPE} from "~/server/types/assignment";

export const assignmentRouter = createTRPCRouter({

    viewAssignment: protectedProcedure

        .input(
            z.object({
                assignmentId: z.string().uuid()
            })
        )

        .query(async ({ ctx, input }) => {
            
            const assignment = await ctx.prisma.assignment.findFirst({
                where: {
                  id: input.assignmentId,
                },

                select: {
                  id : true,
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

            const isSubmissionExists = await ctx.prisma.assignmentSubmission.findFirst({
                where: {
                    studentId: ctx.session.user.id, 
                    assignmentId: input.assignmentId,
                },
            });
            
            let submissionStatus: SUBMISSION_STATUS;
            
            if (isSubmissionExists) { // if assignment has been submitted
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

        getAssignmentList: protectedProcedure
        .input(z.object({
            type : z.nativeEnum(ASSIGNMENT_TYPE).optional(),
        }))
    
        .query(async ({input, ctx}) => {
            
            // Get all assignments
            const allAssignments = await ctx.prisma.assignment.findMany({
                where: {
                    type: input.type,
                },
                select: {
                    id : true,
                    title: true,
                    filePath: true,
                    description: true,
                    startTime: true,
                    endTime: true,
                    type: true,
                }
            });
    
            // Iterate over every assignment
            const assignmentsList = await Promise.all(allAssignments.map(async (assignment) => {
                const isSubmissionExists = await ctx.prisma.assignmentSubmission.findFirst({
                    where: {
                        studentId: ctx.session.user.id, 
                        assignmentId: assignment.id,
                    },
                });
    
                // Get score
                let score : number | null = null;
                if (isSubmissionExists) {
                    score = isSubmissionExists.score;
                } else {
                    score = null;
                }
                
                // Get submission status
                let submissionStatus: SUBMISSION_STATUS;
    
                if (isSubmissionExists) { // if assignment has been submitted
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
    
                return { ...assignment, submissionStatus, score };
            }));
    
            return assignmentsList;
    
        })
    

})