// tslint:disable
// graphql typescript definitions

declare namespace RentApp {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
roles: Array<RoleResponse> | null;
role: RoleResponse;
users: Array<UserResponse> | null;
}

interface IRoleOnQueryArguments {
id?: number | null;
name?: string | null;
}

type RoleResponse = IRole | IError;



interface IRole {
__typename: "Role";
id: number;
roleName: string;
roleDescription: string;
}

interface IError {
__typename: "Error";
message: string;
path: string;
}

type UserResponse = IUser | IError;



interface IUser {
__typename: "User";
id: string;
email: string;
firstName: string;
lastName: string;
}

interface IMutation {
__typename: "Mutation";
createRole: Array<Response> | null;
register: Array<Response> | null;
}

interface ICreateRoleOnMutationArguments {
roleName: string;
roleDescription: string;
}

interface IRegisterOnMutationArguments {
email: string;
firstName: string;
lastName: string;
password: string;
roleId: Array<number>;
}

type Response = IError | ISuccess;



interface ISuccess {
__typename: "Success";
message: string;
}
}

// tslint:enable
