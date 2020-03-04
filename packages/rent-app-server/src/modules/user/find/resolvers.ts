import { ResolverMap } from '../../../types/graphql-utls';
import {User} from '../../../entities/user';


export const resolvers: ResolverMap = {
    Query: {
        users: async (_) => {
            try {
                const users = await User.find();
                return users;
            } catch(err) {
                return [{
                    __typename: 'Error',
                    message: 'Could not query db. Check connection.',
                    path: 'users'
                }];
            }
        }
    },
    UserResponse: {
      __resolveType: obj => {
        if(obj.path) return "Error";
        else return "User";
      }
    }
}