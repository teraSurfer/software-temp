import { AuthChecker } from 'type-graphql';
import { AppContext } from '../types/context';
import { User } from '../entities/user';

export const authCheck: AuthChecker<AppContext> = async (
    { context },
    roles
) => {
    if (roles.length === 0) {
        // just check if the user is logged in role doesn't matter.
        return (context.req.session!.userId) ? true : false;
    }
    else {
        // Check user role and determine
        const { req } = context;
        const authorized = await User
        .createQueryBuilder('user')
        .innerJoinAndSelect('user.roles', 'role', 'user.id = :userId AND role.role_name IN (:...roles)', {
            userId: req.session!.userId,
            roles
        }).getCount();
        console.log(authorized);
        return (authorized !== 0);
    }
};
