import Joi from 'joi';

const registrationSchema = Joi.object({
    user_name: Joi.string().required().min(1).max(50).messages({
        'string.base': 'User name must be a string',
        'string.empty': 'User name is required',
        'string.min': 'User name should have a minimum length of 1',
        'string.max': 'User name should have a maximum length of 50',
    }),
    user_email: Joi.string().email({ tlds: false }).required().messages({
        'string.base': 'User email must be a string',
        'string.empty': 'User email is required',
        'string.email': 'User email must be a valid email address',
        'any.required': 'User email is required',
    }),
    user_password: Joi.string()
        .regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/) // at least one digit in any position
        .regex(/[0-9a-zA-Z]*[a-zA-Z][0-9a-zA-Z]*/) // at least one letter in any position
        .min(4)
        .required().messages({
            'string.base': 'User password must be a string',
            'string.empty': 'User password is required',
            'string.pattern.base': 'User password must contain at least one letter and one digit',
            'string.min': 'User password should have a minimum length of 4',
            'any.required': 'User password is required',
        }),
});

const loginSchema = Joi.object({
    user_email: Joi.string().email({ tlds: false }).required().messages({
        'string.base': 'User email must be a string',
        'string.empty': 'User email is required',
        'string.email': 'User email must be a valid email address',
        'any.required': 'User email is required',
    }),
    user_password: Joi.string()
        .regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/) // at least one digit in any position
        .regex(/[0-9a-zA-Z]*[a-zA-Z][0-9a-zA-Z]*/) // at least one letter in any position
        .min(4)
        .required().messages({
            'string.base': 'User password must be a string',
            'string.empty': 'User password is required',
            'string.pattern.base': 'User password must contain at least one letter and one digit',
            'string.min': 'User password should have a minimum length of 4',
            'any.required': 'User password is required',
        }),
});

const TeamMemberFormSchema = Joi.object({
    name: Joi.string().required().min(1).max(50).messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name is required',
        'string.min': 'Name should have a minimum length of 1',
        'string.max': 'Name should have a maximum length of 50',
    }),
    position: Joi.string().required().min(1).max(50).messages({
        'string.base': 'Position must be a string',
        'string.empty': 'Position is required',
        'string.min': 'Position should have a minimum length of 1',
        'string.max': 'Position should have a maximum length of 50',
    }),
    department: Joi.string().required().min(1).max(50).messages({
        'string.base': 'Department must be a string',
        'string.empty': 'Department is required',
        'string.min': 'Department should have a minimum length of 1',
        'string.max': 'Department should have a maximum length of 50',
    }),
    specialisation: Joi.string().required().min(1).max(50).messages({
        'string.base': 'Specialisation must be a string',
        'string.empty': 'Specialisation is required',
        'string.min': 'Specialisation should have a minimum length of 1',
        'string.max': 'Specialisation should have a maximum length of 50',
    }),
    image: Joi.optional(),
    social_media: Joi.string().uri().messages({
        'string.base': 'Social media URL must be a string',
        'string.uri': 'Social media URL must be a valid URI',
    }),
    email: Joi.string().email({ tlds: false }).required().messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required',
    }),
    about: Joi.string().required().messages({
        'string.base': 'About must be a string',
        'string.empty': 'About is required',
    }),
    language: Joi.string().required().messages({
        'string.base': 'Language must be a string',
        'string.empty': 'Language is required',
    }),
});

const RoleFormSchema = Joi.object({
    role_name: Joi.string().required().min(1).messages({
        'string.base': 'Role name must be a string',
        'string.empty': 'Role name is required',
        'any.required': 'Role name is required',
        'string.min': 'Role name should have a minimum length of 1',
    }),
    permission_set: Joi.string().required().min(1).messages({
        'string.base': 'Permission set must be a string',
        'string.empty': 'Permission set is required',
        'any.required': 'Permission set is required',
        'string.min': 'Permission set should have a minimum length of 1',
    }),
});



const PermissionFormSchema = Joi.object({
    permission_setName: Joi.string().required().min(1).messages({
        'string.base': 'permission name must be a string',
        'string.empty': 'permission name is required',
        'any.required': 'permission name is required',
        'string.min': 'permission name should have a minimum length of 1',
    }),
    create_user: Joi.boolean().default(false),
    delete_user: Joi.boolean().default(false),
    createRoles: Joi.boolean().default(false),
    getAllPermission: Joi.boolean().default(false),
    createPermission: Joi.boolean().default(false),

})

export { loginSchema, registrationSchema, TeamMemberFormSchema, RoleFormSchema , PermissionFormSchema };
