import { Resolver, Query, Authorized, Arg } from 'type-graphql';
import { VehicleTypeResponseUnion, ResponseError } from '../../shared/';
import { VehicleType } from '../../../entities/vehicleTypes';

/*
 * File Created: Friday, 17th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class FindVehicleTypeResolver {

    @Authorized(['admin', 'user'])
    @Query(() => [VehicleTypeResponseUnion]!)
    async findAllVehicleTypes(@Arg('take') take: number=10, @Arg('skip') skip: number=0) {
        try {
            const vehiclesTypes = await VehicleType.find({
                order: {
                    id: 'ASC'
                },
                take,
                skip
            });
            return vehiclesTypes;
        } catch (err) {
            throw new ResponseError(
                err.message,
                'findAllVehicleTypes'
            );
        }
    }

    @Authorized(['admin', 'user'])
    @Query(() => [VehicleTypeResponseUnion]!)
    async findOneVehicleType(@Arg('id') id: number=NaN, @Arg('vehicleType') vehicleType: string='') {
        try {
            if (!isNaN(id)) {
                return await VehicleType.findOne({id});
            } else if (vehicleType !== '') {
                return await VehicleType.findOne({ vehicleType });
            } else {
                throw new ResponseError(
                    'Need id or vehicle type',
                    'findOneVehicleType'
                );
            }
        } catch (err) {
            throw new ResponseError(
                err.message,
                'findOneVehicleType'
            );
        }
    }

    @Authorized(['admin', 'user'])
    @Query(() => VehicleTypeResponseUnion)
    async findVehiclesForVehicleType(@Arg('vehicleType') vehicleType: string) {
        try {
            return VehicleType.findOne({
                vehicleType
            }, {
                relations: ['vehicles']
            });
        } catch (err) {
            throw new ResponseError(
                err.message,
                'findVehiclesForVehicleType'
            );
        }
    }
}