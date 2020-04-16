import gql from 'graphql-tag';
import initialState from './initialState.json';
const typeDefs = gql`

    type Query {
        loggedIn: Boolean!
    }

    type Mutation {
        userState(value: Boolean!): Boolean!
    }
`;

const resolvers = {
    Query: {
        loggedIn: () => initialState.loggedIn
    },
    Mutation: {
        userState: (_: any, data: any) => {
            console.log(data);
            initialState.loggedIn = data.value
            return initialState.loggedIn;
        }
    }
}

export {
    typeDefs,
    resolvers
};
