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
                return await Vehicle.findOne({ id }, { relations: ['vehicleType', 'location'] });
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
    @Query(() => [VehicleResponseUnion])
    async findAllVehicles(@Arg('skip', {defaultValue: 0}) skip: number, @Arg('take', {defaultValue: 10}) take: number) {
        try {
            return await Vehicle.find({
                relations: ['vehicleType', 'location'],
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

    @Authorized(['admin', 'user'])
    @Query(() => [VehicleResponseUnion])
    async findAvailableVehicles(
        @Arg('startTime') startTime: string,
        @Arg('endTime') endTime: string,
        @Arg('vehicleType', { defaultValue: '' }) vehicleType: string,
        @Arg('location', { defaultValue: '' }) location: string) {
        try {
            const vehicles = await Vehicle.createQueryBuilder('v')
                .innerJoin('v.vehicleType', 'vt', 'vt.vehicleType = :vehicleType', { vehicleType })
                .innerJoin('v.location', 'l', 'l.locationName = :location', { location })
                .leftJoin('v.reservations',
                    'r',
                    'r.status NOT IN (:...statuses) AND (r.reservationStart > :endTime OR r.reservationEnd < :startTime)',
                    { statuses: ['accepted', 'started'], endTime, startTime })
                .getMany();
            return vehicles;
        } catch (err) {
            throw new ResponseError(err.message, 'findAvailableVehicles');
        }
    }

}
