import { Resolver, Mutation, Authorized, Arg } from 'type-graphql';
import { LocationResponseUnion, ResponseError } from '../../shared';
import { CreateLocationInput } from './CreateInput';
import { Location } from '../../../entities/location';

/*
 * File Created: Sunday, 19th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class CreateLocationResolver {

    @Authorized(['admin'])
    @Mutation(() => LocationResponseUnion)
    async createLocation(@Arg('data') { 
        locationName,
        addressFirstLine,
        addressSecondLine,
        addressThirdLine,
        addressZipCode,
        vehicleCapacity
     }: CreateLocationInput) {
        try {
            const locationExists = await Location.findOne({
                locationName
            });

            if (locationExists) {
                throw new ResponseError(
                    'A location with that name already exists',
                    'createLocation'
                );
            }

            return await Location.create({
                locationName,
                addressFirstLine,
                addressSecondLine,
                addressThirdLine,
                addressZipCode,
                vehicleCapacity
            }).save();
        } catch (err) {
            throw new ResponseError(
                err.message,
                'createLocation'
            );
        }
    }
}