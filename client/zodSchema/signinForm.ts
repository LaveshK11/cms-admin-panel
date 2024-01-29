import * as z from "zod";

const emailSchema = z.string().email();
const passwordSchema = z
    .string()
    .refine((value) => /^(?=.*\d)(?=.*[a-zA-Z_])[0-9a-zA-Z_]*$/.test(value), {
        message: "Password must contain at least one digit and one letter",
    });

export const signinFromSchemaObj = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export type SigninForm = z.infer<typeof signinFromSchemaObj>;
