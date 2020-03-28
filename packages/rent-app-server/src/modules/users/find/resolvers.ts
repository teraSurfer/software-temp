import { ResolverMap } from '../../../types/graphql-utls';
import { User } from '../../../entities/user';
// import { checkPermissions } from 'rent-app-server/src/middleware/auth';

/*
 * File Created: Monday, 2nd March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

// const controller = 'users';
// const action = 'find'; 

export const resolvers: ResolverMap = {
    Query: {
        users: async (_, { }, { session }) => {
            try {
                console.log(session);
                const users = await User.find({ relations: ['roles'] });
                return users;
            } catch (err) {
                return [{
                    __typename: 'Error',
                    message: 'Could not query db. Check connection.',
                    path: 'users'
                }];
            }
        },
        user: async (_, id: string) => {
            try {
                const user = await User.findOne(id, { relations: ['roles'] });
                return user;
            } catch (err) {
                return {
                    __typename: 'Error',
                    message: 'Something went wrong, try again.',
                    path: 'user'
                }
            }
        }
    },
    UserResponse: {
        __resolveType: obj => {
            if (obj.path) return 'Error';
            else return 'User';
        }
    }
}