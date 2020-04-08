import gql from 'graphql-tag';

const USER_LOGIN = gql`
    mutation Login($data: LoginInput!) {
        login(data: $data) {
            id,
            email,
            firstName,
            lastName,
            roles {
                id,
                roleName
            }
        }
    }
`;

const USER_LOGOUT = gql`
    mutation Logout {
        logout
    }
`;

export {
    USER_LOGIN,
    USER_LOGOUT
};
