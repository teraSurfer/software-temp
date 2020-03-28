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
rights: Array<RightsResponse>;
roles: Array<RoleResponse>;
role: RoleResponse;
users: Array<UserResponse>;
user: UserResponse;
}

interface IRoleOnQueryArguments {
id?: number | null;
name?: string | null;
}

interface IUserOnQueryArguments {
id?: string | null;
}

type RightsResponse = IRight | IError;



interface IRight {
__typename: "Right";
id: number;
rightName: string;
rightDescription: string;
}

interface IError {
__typename: "Error";
message: string;
path: string;
}

type RoleResponse = IRole | IError;



interface IRole {
__typename: "Role";
id: number;
roleName: string;
roleDescription: string;
rights: Array<IRight> | null;
}

type UserResponse = IUser | IError;



interface IUser {
__typename: "User";
id: string;
email: string;
firstName: string;
lastName: string;
roles: Array<IRole> | null;
}

interface IMutation {
__typename: "Mutation";
createRight: Array<Response> | null;
createRole: Array<Response> | null;
login: LoginResponse;
register: Array<Response> | null;
}

interface ICreateRightOnMutationArguments {
rightName: string;
rightDescription: string;
}

interface ICreateRoleOnMutationArguments {
roleName: string;
roleDescription: string;
rightIds: Array<number>;
}

interface ILoginOnMutationArguments {
email: string;
password: string;
}

interface IRegisterOnMutationArguments {
email: string;
firstName: string;
lastName: string;
password: string;
}

type Response = IError | ISuccess;



interface ISuccess {
__typename: "Success";
message: string;
}

type LoginResponse = IUserSession | IError;



interface IUserSession {
__typename: "UserSession";
sessionId: string;
}
}

// tslint:enable
