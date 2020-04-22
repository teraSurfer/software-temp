import { Resolver, Mutation, Arg, Authorized, Ctx } from 'type-graphql';
import { ReservationResponseUnion, ResponseError } from '../../shared';
import { CreateReservationInput } from './CreateInput';
import { Reservation } from '../../../entities/reservation';
import { AppContext } from '../../../types/context';
import { User } from '../../../entities/user';
import { Price } from '../../../entities/price';
import { Vehicle } from '../../../entities/vehicle';
import { Payment } from '../../../entities/payment';

/*
 * File Created: Sunday, 19th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class CreateReservationResolver {

    @Authorized(['admin', 'user'])
    @Mutation(() => ReservationResponseUnion)
    async createReservation(@Arg('data') {
        priceId,
        vehicleId,
        reservationEnd,
        reservationStart,
    }: CreateReservationInput, @Ctx() ctx: AppContext) {
        try {
            const user = await User.findOne({
                id: ctx.req.session!.userId
            });

            const price = await Price.findOne({
                id: priceId
            });

            const vehicle = await Vehicle.findOne({
                id: vehicleId
            });

            if (!user || !price || !vehicle) {
                throw new ResponseError('Valid user, price and vehicle are required to make a reservation', 'createReservation');
            }

            const payment = await Payment.create({
                user,
                price
            }).save();

            const reservation = await Reservation.create({
                status,
                reservationEnd: new Date(reservationEnd),
                reservationStart: new Date(reservationStart),
                vehicle,
                payment,
                user
            }).save();

            return reservation;

        } catch (err) {
            throw new ResponseError(err.message, 'createReservation');
        }
    }
}