import Joi from 'joi'

const registrationSchema = Joi.object({
    name: Joi.string().required().min(1).max(50),
    email: Joi.string().email({ tlds: false }).required(),
    password: Joi.string()
        .regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/) // at least one digit in any position
        .regex(/[0-9a-zA-Z]*[a-zA-Z][0-9a-zA-Z]*/) // at least one letter in any position
        .min(4)
        .required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: false }).required(),
    password: Joi.string()
        .regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/) // at least one digit in any position
        .regex(/[0-9a-zA-Z]*[a-zA-Z][0-9a-zA-Z]*/) // at least one letter in any position
        .min(4)
        .required(),
});

const TeamMemberFormSchema = Joi.object({
    name: Joi.string().required().min(1).max(50),
    position: Joi.string().required().min(1).max(50),
    department: Joi.string().required().min(1).max(50),
    specialisation: Joi.string().required().min(1).max(50),
    image: Joi.optional(),
    social_media: Joi.string().uri(),
    email: Joi.string().email({ tlds: false }).required(),
    about: Joi.string().required(),
    language: Joi.string().required(),
});
export { loginSchema, registrationSchema, TeamMemberFormSchema }