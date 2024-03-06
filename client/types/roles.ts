export type RoleAttributes = {
    role_name: string;
    permission_set: string;
    createdAt: string
}

export type RoleResponseObject = {
    data: RoleAttributes[]; // Array of objects with Attributes interface
}
