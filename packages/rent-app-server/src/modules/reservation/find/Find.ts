import { Resolver, Query, Authorized, Arg } from 'type-graphql';
import { ReservationResponseUnion, ResponseError, CountResponse } from '../../shared';
import { Reservation } from '../../../entities/reservation';
import { Location } from '../../../entities/location';
import { Vehicle } from '../../../entities/vehicle';
import { MembershipDetails } from '../../../entities/membershipDetails';
import { Payment } from '../../../entities/payment';
import { User } from '../../../entities/user';

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

    @Authorized(['admin'])
    @Query(() => [Payment])
    async getPayments(@Arg('skip', {defaultValue: 0}) skip: number, @Arg('take', {defaultValue: 5}) take: number) {
        try {
            return await Payment.find({
                order: {
                    paymentDate: "DESC"
                },
                take,
                skip
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    @Authorized(['admin', 'user'])
    @Query(() => [Payment])
    async getPaymentsForUser(@Arg('skip', { defaultValue: 0 }) skip: number, @Arg('take', { defaultValue: 5 }) take: number, @Arg('userId') userId: string) {
        try {
            const userExists = await User.findOne({ id: userId });

            if (!userExists) {
                throw new Error('No user with that ID exists');
            }

            return await Payment.find({
                where: {
                    user: userExists
                },
                order: {
                    paymentDate: "DESC"
                },
                take,
                skip
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    @Authorized(['admin', 'user'])
    @Query(() => [Reservation])
    async getReservationsForUser(@Arg('userId') userId: string, @Arg('take', { defaultValue: 5 }) take: number, @Arg('skip', {defaultValue: 0}) skip: number) {
        try {
            const userExists = await User.findOne({ id: userId }, { relations: ['reservations'] });
            if (!userExists) {
                throw new Error('No user with that ID exists');
            }

            return await Reservation.find({
                where: {
                    user: userExists
                },
                order: {
                    reservationStart: "DESC"
                },
                skip,
                take
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    @Authorized(['admin', 'user'])
    @Query(() => Payment)
    async getPayment(@Arg('id') id: string) {
        try {
            return await Payment.findOne({ id });
        } catch (err) {
            throw new Error(err.message);
        }
    }
}