import { Resolver, Query, Authorized, Arg } from 'type-graphql';
import { VehicleResponseUnion, ResponseError } from '../../shared';
import { Vehicle } from '../../../entities/vehicle';

/*
 * File Created: Saturday, 18th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class FindVehicleResolver {

    @Authorized(['admin', 'user'])
    @Query(() => VehicleResponseUnion)
    async findVehicle(@Arg('id') id: string, @Arg('registrationTag') registrationTag: string) {
        try {
            if (id !== '') {
                return await Vehicle.findOne({ id });
            } else if (registrationTag !== '') {
                return await Vehicle.findOne({ registrationTag });
            } else {
                throw new ResponseError('Need id or registration tag', 'findVehicle');
            }
        } catch (err) {
            throw new ResponseError(err.message, 'findVehicle');
        }
    }

    @Authorized(['admin', 'user'])
    @Query(() => VehicleResponseUnion)
    async findAllVehicles(@Arg('skip') skip: number = 0, @Arg('take') take: number = 10) {
        try {
            return await Vehicle.find({
                order: {
                    registrationTag: 'ASC'
                },
                take,
                skip
            });
        } catch (err) {
            throw new ResponseError(err.message, 'findAllVehicles');
        }
    }

}
