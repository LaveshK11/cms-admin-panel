import * as z from "zod";

const roleNameSchema = z.string().min(1);

const permissionSet = z.string().min(1);

export const roleFromSchemaObj = z.object({
    role_name: roleNameSchema,
    permission_set: permissionSet

});

export type AddRoleForm = z.infer<typeof roleFromSchemaObj>;
