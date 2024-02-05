import * as z from "zod"

const nameSchema = z.string().min(1);
const emailSchema = z.string().email();
const passwordSchema = z
    .string()
    .refine((value) => /^(?=.*\d)(?=.*[a-zA-Z_])[0-9a-zA-Z_]*$/.test(value), {
        message: "Password must contain at least one digit and one letter",
    });

const confirmPasswordSchema = z
    .string()
    .refine((value) => /^(?=.*\d)(?=.*[a-zA-Z_])[0-9a-zA-Z_]*$/.test(value), {
        message: "Password must contain at least one digit and one letter",
    });


export const signupFromSchemaObj = z.object({
    user_name: nameSchema,
    user_email: emailSchema,
    user_password: passwordSchema,
    confirmPassword: confirmPasswordSchema
}).refine((data) => data.user_password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});



type FormData = z.infer<typeof signupFromSchemaObj>;
export type SignupForm = Omit<FormData, 'confirmPassword'> & { confirmPassword?: string };
