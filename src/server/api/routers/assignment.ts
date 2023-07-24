import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const assignmentRouter = createTRPCRouter({

    viewAssignment: protectedProcedure

        .input(
            z.object({
                assignmentId: z.string().uuid()
            })
        )

        .query(async ({ ctx, input }) => {
            
            const assignment = await ctx.prisma.assignment.find({
                where: {
                  id: input.assignmentId,
                },

                // Exclude id field
                select: {
                  id : true,
                  title: true,
                  filePath: true,
                  description: true,
                  startTime: true,
                  endTime: true,
                },

            });

            const isSubmissionExists = await ctx.prisma.assignmentsubmission.find({

                where: {
                    studentId_assignmentId: {
                        studentId: ctx.session.user.id, 
                        assignmentId: input.assignmentId,
                      },
                },

            });

            if (isSubmissionExists) { // if assignment has been submitted
                
                // add new field, 'submission' : boolean
                assignment.submission = true

            } else {

                assignment.submission = false

            }

            return assignment;
    
        }),


});
