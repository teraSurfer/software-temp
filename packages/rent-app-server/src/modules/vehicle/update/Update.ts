import { Resolver, Mutation, Authorized, Arg } from 'type-graphql';
import { VehicleResponseUnion } from '../../shared';
import { UpdateVehicleInput } from './UpdateInput';
import { Vehicle } from '../../../entities/vehicle';
import { Location } from '../../../entities/location';
import { VehicleType } from '../../../entities/vehicleTypes';

/*
 * File Created: Saturday, 18th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class UpdateVehicleResolver {

    @Authorized(['admin'])
    @Mutation(() => VehicleResponseUnion)
    async updateVehicle(@Arg('data') {
        id,
        make,
        model,
        location,
        lastServiced,
        registrationTag,
        condition,
        currentMileage,
        vehicleType,
        year
    }: UpdateVehicleInput) {
        try {
            const vehicleExists = await Vehicle.findOne({ id });

            if (!vehicleExists) {
                throw new Error('A vechicle with given id does not exist');
            }
            let l: Location | undefined;
            if (location !== '') {
                l = await Location.findOne({
                    locationName: location
                }, { relations: ['vehicles'] });
                
                if (l?.vehicles === l?.vehicleCapacity) {
                    throw new Error('Vehicle capacity full at location.');
                }
            }

            const vt = await VehicleType.findOne({ vehicleType });

            const ls = new Date(lastServiced);

            await Vehicle.update({ id }, {
                make,
                model,
                location: l,
                lastServiced: ls,
                registrationTag,
                condition,
                currentMileage,
                vehicleType: vt,
                year
            });

            return vehicleExists;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}