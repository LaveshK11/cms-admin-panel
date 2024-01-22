import z from "zod";

export const addMemberSchema = z.object({
    name: z.string().min(1),

    position: z.string().min(1),

    department: z.string().min(1),

    specialisation: z.string().min(1),

    email: z.string().email(),

    linkedin: z.string().url(),

    about: z.string().min(1),

    attachFile: z.object({
    }),
});
