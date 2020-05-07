import { Resolver, Query, Authorized, Arg } from 'type-graphql';
import { VehicleResponseUnion, ResponseError } from '../../shared';
import { Vehicle } from '../../../entities/vehicle';
import { Reservation } from '../../../entities/reservation';
import moment = require('moment');
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
    async findVehicle(@Arg('id', { defaultValue: '' }) id: string, @Arg('registrationTag', { defaultValue: '' }) registrationTag: string) {
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
    async findAllVehicles(@Arg('skip', { defaultValue: 0 }) skip: number, @Arg('take', { defaultValue: 10 }) take: number) {
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

    @Authorized(['admin', 'user'])
    @Query(() => [VehicleResponseUnion])
    async findAvailableVehicles(
        @Arg('startTime') startTime: string,
        @Arg('endTime') endTime: string,
        @Arg('vehicleType', { defaultValue: '' }) vehicleType: string,
        @Arg('location', { defaultValue: '' }) location: string) {
        try {
            const st = moment(startTime);
            const et = moment(endTime);

            const reservations = await Reservation.find({ relations: ['vehicle'] });
            let vehicles: Vehicle[] = [];

            if (vehicleType === '' && location === '') {
                vehicles = await Vehicle.find({
                    relations: ['vehicleType', 'location']
                });
            } else if (vehicleType !== '' && location === '') {
                vehicles = await Vehicle.createQueryBuilder('v')
                    .innerJoinAndSelect('v.vehicleType', 'vt', 'vt.vehicleType = :vt', { vt: vehicleType })
                    .innerJoinAndSelect('v.location', 'l')
                    .getMany();
            } else if (vehicleType === '' && location !== '') {
                vehicles = await Vehicle.createQueryBuilder('v')
                    .innerJoinAndSelect('v.vehicleType', 'vt')
                    .innerJoinAndSelect('v.location', 'l', 'l.locationName = :l', { l: location })
                    .getMany();
            } else {
                vehicles = await Vehicle.createQueryBuilder('v')
                    .innerJoinAndSelect('v.vehicleType', 'vt', 'vt.vehicleType = :vt', { vt: vehicleType })
                    .innerJoinAndSelect('v.location', 'l', 'l.locationName = :l', { l: location })
                    .getMany();
            }

            const invalidReservations: Reservation[] = reservations.filter(r => {
                const rst = moment(r.reservationStart);
                const ret = moment(r.reservationEnd);
                if ((!(rst.isAfter(et) && ret.isAfter(et)) || !(ret.isBefore(st) && rst.isBefore(st))) && r.status==='accepted') {
                    return r;
                }
            });

            const rv = vehicles.filter(v => {
                if (invalidReservations.findIndex(r => r.vehicle.id === v.id) === -1) {
                    return v;
                }
            });

            invalidReservations.forEach(r => console.log(r.id, r.vehicle.id));

            return rv;

        } catch (err) {
            throw new ResponseError(err.message, 'findAvailableVehicles');
        }
    }

}
