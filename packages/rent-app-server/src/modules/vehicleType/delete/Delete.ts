import { Resolver, Authorized, Arg, Mutation } from 'type-graphql';
import { VehicleTypeResponseUnion, ResponseError } from '../../shared/';
import { VehicleType } from '../../../entities/vehicleTypes';

/*
 * File Created: Friday, 17th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class DeleteVehicleTypeResolver {

    @Authorized(['admin'])
    @Mutation(() => VehicleTypeResponseUnion)
    async removeVehicleType(@Arg('id') id: number) {
        try {
            const vehicleType = await VehicleType.findOne({
                id
            });

            if (!vehicleType) {
                throw new ResponseError(
                    'VehicleType with that id does not exist',
                    'removeVehicleType'
                );
            }

            await VehicleType.delete({
                id
            });

            return vehicleType;
        } catch (err) {
            throw new ResponseError(
                err.message,
                'findAllVehicleTypes'
            );
        }
    }
}