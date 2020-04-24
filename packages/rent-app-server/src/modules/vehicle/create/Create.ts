import { Resolver, Arg, Mutation, Authorized } from 'type-graphql';
import { VehicleResponseUnion, ResponseError } from '../../shared';
import { CreateVehicleInput } from './CreateInput';
import { Vehicle } from '../../../entities/vehicle';
import { VehicleType } from '../../../entities/vehicleTypes';
import { Location } from '../../../entities/location';

/*
 * File Created: Saturday, 18th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class CreateVehicleResolver {

    @Authorized(['admin'])
    @Mutation(() => VehicleResponseUnion)
    async createVehicle(@Arg('data') {
        make,
        model,
        year,
        vehicleType,
        condition,
        currentMileage,
        lastServiced,
        location,
        registrationTag
    }: CreateVehicleInput) {
        try {
            const vehicleExists = await Vehicle.findOne({ registrationTag });
            if (vehicleExists) {
                throw new ResponseError(
                    'A vehicle with that registration tag already exists',
                    'createVehicle'
                );
            }

            const vt = await VehicleType.findOne({
                vehicleType
            });
            let l: Location | undefined;
            if (location !== '')
                l = await Location.findOne({
                    locationName: location
                });

            const ls = new Date(lastServiced);

            const v = await Vehicle.create({
                make,
                model,
                year,
                vehicleType: vt,
                condition,
                registrationTag,
                currentMileage,
                lastServiced: ls,
                location: l
            }).save();

            return v;
        } catch (err) {
            throw new ResponseError(
                err.message,
                'createVehicle'
            );
        }
    }
}