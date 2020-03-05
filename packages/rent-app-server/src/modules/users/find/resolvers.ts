import { ResolverMap } from '../../../types/graphql-utls';
import {User} from '../../../entities/user';
// import {Right} from '../../../entities/rights';
// import {Role} from '../../../entities/roles';


export const resolvers: ResolverMap = {
    Query: {
        users: async (_) => {
            try {
                
                const users = await User.find({relations: ['roles']});
                console.log(users[0].roles[0].rights);
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