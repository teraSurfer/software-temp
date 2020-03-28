import { ResolverMap } from '../../../types/graphql-utls';
import { User } from '../../../entities/user';
import * as bcrypt from 'bcryptjs';

export const resolvers: ResolverMap = {
    Mutation: {
        login: async (
            _,
            { email, password }: RentApp.ILoginOnMutationArguments,
            { session, req }
        ) => {
            try {
                const user = await User.findOne({
                    email
                }, {relations: ['roles']});

                if (!user) return {
                    __typename: 'Error',
                    message: 'Account with that email does not exist.',
                    path: 'login'
                }

                const valid = await bcrypt.compare(password, user.password);

                if (!valid) return {
                    __typename: 'Error',
                    message: 'Invalid password, please try again.',
                    path: 'login'
                }

                session.userId = user.id;
                session.userRole = user.roles[0].id;

                // if (req.sessionID) {
                //     await redis.set(user.id, 'sess:'+req.sessionID);
                // }

                return { __typename: 'UserSession', sessionId: req.sessionID };

            } catch (err) {
                console.log(err);
                return {
                    __typename: 'Error',
                    message: 'Something went wrong try again.',
                    path: 'login'
                };
            }
        }
    }
}
