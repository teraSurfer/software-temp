import {Right} from '../../../entities/rights';
import { ResolverMap } from '../../../types/graphql-utls';

export const resolvers: ResolverMap = {
    Mutation: {
        createRight: async (
            _,
            args: RentApp.ICreateRightOnMutationArguments
        ) => {
            const { rightName, rightDescription } = args;
            const rightExists = await Right.findOne({rightName});

            if (rightExists) {
                const error: RentApp.Response = {
                    __typename: 'Error',
                    message: 'A right with that name already exists.',
                    path: 'create right'
                };

                return [error];
            }


            const right = Right.create({
                rightName,
                rightDescription
            });

            await right.save();

            const response: RentApp.Response = {
                __typename: 'Success',
                message: 'Right created successfully.' 
            }

            return [response];
        }
    }   
}
