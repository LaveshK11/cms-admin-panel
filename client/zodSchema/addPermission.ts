import * as z from "zod";

const permissionNameSchema = z.string().min(1);

const getAllPermission = z.boolean().default(false);

const delete_user = z.boolean().default(false);

const create_user = z.boolean().default(false);

const createRoles = z.boolean().default(false);

const createPermissions = z.boolean().default(false);

export const permissionFromSchemaObj = z.object({
    permission_setName: permissionNameSchema,
    delete_user: delete_user,
    create_user: create_user,
    createRoles: createRoles,
    createPermission: createPermissions,
    getAllPermission: getAllPermission
});

export type AddPermissionForm = z.infer<typeof permissionFromSchemaObj>;
