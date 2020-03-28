import { ResolverMap } from '../../../types/graphql-utls';
import {Role} from '../../../entities/roles';

export const resolvers: ResolverMap = {
    Query: {
        roles: async (_) => {
            try {
                const roles = await Role.find();
                return roles;
            } catch(err) {
                return [
                    {
                        __typename: 'Error',
                        message: 'Something went wrong try again.',
                        path: 'roles'
                    }
                ];
            }
        },
        role: async (_, args: any) => {
            try {
                const role = await Role.findOne({id: args.id});
                return role;
            } catch (err) {
                return {
                    __typename: 'Error',
                    message: 'Something went wrong try again.',
                    path: 'role'
                }
            }
        }
    },
    RoleResponse: {
        __resolveType: obj => {
            if(obj.path) return 'Error';
            else return 'Role';
          }
    }
}