import z from "zod";

export const addMemberSchema = z.object({
    name: z.string().min(1),

    position: z.string().min(1),

    department: z.string().min(1),

    specialisation: z.string().min(1),

    email: z.string().email(),

    social_media: z.string().url(),

    language: z.string().min(1),

    about: z.string().min(1),

    image: z.optional(z.any()), 
});
