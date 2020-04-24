import { Resolver, Query, Authorized, Arg } from 'type-graphql';
import { ReservationResponseUnion, ResponseError, CountResponse } from '../../shared';
import { Reservation } from '../../../entities/reservation';
import { Location } from '../../../entities/location';
import { Vehicle } from '../../../entities/vehicle';
import { MembershipDetails } from '../../../entities/membershipDetails';

/*
 * File Created: Sunday, 19th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class FindReservationResolver {

    @Authorized(['admin', 'user'])
    @Query(() => ReservationResponseUnion)
    async findReservation(@Arg('id') id: string) {
        try {
            if (id !== '') {
                return await Reservation.findOne({ id });
            }else {
                throw new ResponseError(
                    'Need id to find a reservation',
                    'findReservation'
                );
            }
        } catch (err) {
            throw new ResponseError(
                err.message,
                'findReservation'
            );
        }
    }

    @Authorized(['admin'])
    @Query(() => [ReservationResponseUnion])
    async findAllReservation(
        @Arg('skip', {defaultValue: 0}) skip: number = 0,
        @Arg('take', {defaultValue: 10}) take: number = 10
    ) {
        try {
            return Reservation.find({
                order: {
                    id: 'ASC'
                },
                skip,
                take
            });
        } catch (err) {
            throw new ResponseError(
                err.message,
                'findAllReservations'
            );
        }
    }

    @Authorized(['admin'])
    @Query(() => CountResponse)
    async getCounts() {
        try {
            const cr = new CountResponse();

            cr.reservationCount = await Reservation.count();
            cr.locationsCount = await Location.count();
            cr.vehiclesCount = await Vehicle.count();
            cr.membersCount = await MembershipDetails.count();

            return cr;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}