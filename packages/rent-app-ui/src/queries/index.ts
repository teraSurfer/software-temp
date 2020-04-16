import gql from 'graphql-tag';
import { typeDefs, resolvers } from './resolvers';

const HELLO_QUERY = gql`
    query Hello {
        hello
    }
`;

const USER_LOGIN = gql`
    mutation Login($data: LoginInput!) {
        login(data: $data) {
            ... on User {
                id,
                email,
                firstName,
                lastName,
                roles {
                    id,
                    roleName
                }
            }
            ... on ResponseError {
                message,
                path
            }
        }
    }
`;

const LOGOUT = gql`
    mutation Logout {
        logout
    }
`;

const LOGGED_IN = gql`
    query loggedIn {
        loggedIn @client
    }
`;

const USER_STATE = gql`
    mutation UserState($value: Boolean!) {
        userState(value: $value) @client
    }
`;

const ME = gql`
    query Me {
        me {
            ... on User {
                id,
                email,
                firstName,
                lastName,
                roles {
                    id,
                    roleName
                }
            }
            ... on ResponseError {
                message,
                path
            }
        }
    }
`;

export {
    HELLO_QUERY,
    USER_LOGIN,
    ME,
    LOGGED_IN,
    LOGOUT,
    typeDefs,
    resolvers,
    USER_STATE
};
