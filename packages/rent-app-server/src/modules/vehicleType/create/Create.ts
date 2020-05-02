import { Resolver, Authorized, Mutation, Arg } from 'type-graphql';
import { VehicleTypeResponseUnion, ResponseError } from '../../shared';
import { CreateVehicleTypeInput } from './CreateInput';
import { VehicleType } from '../../../entities/vehicleTypes';

/*
 * File Created: Sunday, 29th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class CreateVehicleTypeResolver {

    @Authorized(['admin'])
    @Mutation(() => VehicleTypeResponseUnion)
    async createVehicleType(
        @Arg('input') {
            vehicleType,
            vehicleDescription,
        }: CreateVehicleTypeInput
    ) {
        try {
            const vehicleTypeExists = await VehicleType.findOne({
                vehicleType
            });

            if(vehicleTypeExists) {
                throw new Error(
                    'A similar vehicle type already exits.'
                );
            }

            const vt = await VehicleType.create({
                vehicleType,
                vehicleTypeDescription: vehicleDescription,
            }).save();

            return vt;
        } catch(err) {
            throw new ResponseError(
                err.message,
                'createVehicleType'
            );
        }
    }
}
