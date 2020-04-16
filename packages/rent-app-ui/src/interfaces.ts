export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    roles?: Roles[];
}

export interface Roles {
    id: number;
    roleName: string;
    roleDescription?: string;
}