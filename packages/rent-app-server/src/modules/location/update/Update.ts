import { Resolver, Mutation, Authorized, Arg } from 'type-graphql';
import { LocationResponseUnion, ResponseError } from '../../shared';
import { UpdateLocationInput } from './UpdateInput';
import { Location } from '../../../entities/location';

/*
 * File Created: Sunday, 19th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class UpdateLocationResolver {

    @Authorized(['admin', 'user'])
    @Mutation(() => LocationResponseUnion)
    async updateLocation(@Arg('data') {
        id,
        locationName,
        addressFirstLine,
        addressSecondLine,
        addressThirdLine,
        addressZipCode,
        vehicleCapacity
    }: UpdateLocationInput) {
        try {
            const locationExists = await Location.findOne({ id });

            if (!locationExists) {
                throw new ResponseError('No location with that id exists', 'updateLocation');
            }

            await Location.update({ id }, {
                id,
                locationName,
                addressFirstLine,
                addressSecondLine,
                addressThirdLine,
                addressZipCode,
                vehicleCapacity
            });

            return locationExists;
        } catch (err) {
            throw new ResponseError(err.message, 'updateLocation');
        }
    }

}
