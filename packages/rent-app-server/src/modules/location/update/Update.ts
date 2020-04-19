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
            const locationExists = await Location.findOne({ id }, {relations: ['vehicles']});

            if (!!locationExists) {
                throw new ResponseError('No location with that id exists', 'updateLocation');
            }

            const vehicles = locationExists!.vehicles;

            return await Location.update({ id }, {
                id,
                locationName,
                addressFirstLine,
                addressSecondLine,
                addressThirdLine,
                addressZipCode,
                vehicleCapacity,
                vehicles: [...vehicles]
            });
        } catch (err) {
            throw new ResponseError(err.message, 'updateLocation');
        }
    }

}