import { Resolver, Authorized, Mutation, Arg } from 'type-graphql';
import { VehicleResponseUnion, ResponseError } from '../../shared';
import { Vehicle } from '../../../entities/vehicle';

/*
 * File Created: Saturday, 18th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class DeleteVehicleResolver {

    @Authorized(['admin'])
    @Mutation(() => VehicleResponseUnion)
    async removeVehicle(@Arg('id') id: string) {
        try {
            const vehicleExists = Vehicle.findOne({ id });
            if (!vehicleExists) {
                throw new ResponseError('Vehicle with given id does not exist', 'removeVehicle');
            }
            await Vehicle.delete({ id });
            
            return vehicleExists;
            
        } catch (err) {
            throw new ResponseError(err.message, 'removeVehicle');
        }
    }
}