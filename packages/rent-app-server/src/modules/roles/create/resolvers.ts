import { ResolverMap } from '../../../types/graphql-utls';
import { Role } from '../../../entities/roles';
import { Right } from '../../../entities/rights';

export const resolvers: ResolverMap = {
    Mutation: {
        createRole: async (
            _,
            args: RentApp.ICreateRoleOnMutationArguments
        ) => {
            const { roleName, roleDescription, rightIds } = args;
            
            const roleExists = await Role.findOne({roleName});

            if (roleExists) {
                return [{
                    __typename: 'Error',
                    message: 'Role with that name already exists.',
                    path: 'createRole'
                }]
            }

            const rights = await Right.findByIds(rightIds);
            
            const role = Role.create({
                roleName,
                roleDescription,
                rights
            });

            await role.save();

            return [{
                __typename: 'Success',
                message: 'Role created successfully.'
            }];
        }
    }
}
