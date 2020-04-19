import { Resolver, Mutation, Authorized, Arg } from 'type-graphql';
import { LocationResponseUnion, ResponseError } from '../../shared';
import { Location } from '../../../entities/location';

/*
 * File Created: Sunday, 19th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class DeleteLocationResolver {

    @Authorized(['admin'])
    @Mutation(() => LocationResponseUnion)
    async removeLocation(@Arg('id') id: number) {
        try {
            const locationExists = await Location.findOne({ id });

            if (!!locationExists) {
                throw new ResponseError(
                    'A location with that id does not exist',
                    'removeLocation'
                );
            }

            await Location.delete({ id });

            return locationExists;

        } catch (err) {
            throw new ResponseError(err.message, 'removeLocation');
        }
    }
}
