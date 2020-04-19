import { Resolver, Query, Authorized, Arg } from 'type-graphql';
import { LocationResponseUnion, ResponseError } from '../../shared';
import { Location } from '../../../entities/location';

/*
 * File Created: Sunday, 19th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class FindLocationResolver {

    @Authorized(['admin', 'user'])
    @Query(() => LocationResponseUnion)
    async findLocation(@Arg('id') id: number=NaN, @Arg('locationName') locationName: string) {
        try {
            if (!isNaN(id)) {
                return await Location.findOne({ id }, {relations: ['vehicles']});
            } else if (locationName !== '') {
                return await Location.findOne(locationName);
            } else {
                throw new ResponseError('Need either id or locationName', 'findLocation');
            }
        } catch (err) {
            throw new ResponseError(err.message, 'findLocation');
        }
    }

    @Authorized(['admin', 'user'])
    @Query(() => [LocationResponseUnion])
    async findAllLocations(@Arg('take') take: number = 10, @Arg('skip') skip: number = 0) {
        try {
            return await Location.find({
                order: {
                    id: 'ASC'
                },
                take,
                skip
            });
        } catch (err) {
            throw new ResponseError(err.message, 'findAllLocations');
        }
    }
}