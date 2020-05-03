import { Resolver, Mutation, Authorized, Arg, Ctx } from 'type-graphql';
import { ReservationResponseUnion, ResponseError } from '../../shared';
import { AppContext } from '../../../types/context';
import { Reservation } from '../../../entities/reservation';
import { UpdateReservationInput } from './UpdateInput';
import { Vehicle } from '../../../entities/vehicle';

/*
 * File Created: Sunday, 19th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class UpdateReservationResolver {

    @Authorized(['user'])
    @Mutation(() => ReservationResponseUnion)
    async cancelReservation(@Arg('reservationId') reservationId: string, @Ctx() ctx: AppContext) {
        try {
            const reservation = await Reservation.findOne({ id: reservationId }, {relations: ['user']});

            if (!reservation || reservation.user.id !== ctx.req.session!.userId) {
                throw new ResponseError('You do not have a reservation with that id.', 'cancelReservation');
            }
            console.log(reservation);
            await Reservation.update({ id: reservationId }, {
                status: 'cancelled'
            });

            return reservation;

        } catch (err) {
            throw new ResponseError(err.message, 'cancelReservation');
        }
    }


    @Authorized(['admin'])
    @Mutation(() => ReservationResponseUnion)
    async updateReservation(@Arg('data') { id, vehicleId, reservationEnd, reservationStart, status }: UpdateReservationInput) {
        try {
            const reservationExists = await Reservation.findOne({ id });
            if (!reservationExists) {
                throw new ResponseError('A reservation with that id does not exist.', 'updateReservation');
            }

            if (reservationExists.vehicle.id !== vehicleId) {
                const vehicle = await Vehicle.findOne({ id: vehicleId }, {relations: ['vehicleType']});

                return await Reservation.update({ id }, {
                    ...reservationExists,
                    vehicle,
                    reservationEnd: new Date(reservationEnd),
                    reservationStart: new Date(reservationStart),
                    status
                });
            }

            return await Reservation.update({ id }, {
                ...reservationExists,
                reservationEnd: new Date(reservationEnd),
                reservationStart: new Date(reservationStart),
                status
            });
        } catch (err) {
            throw new ResponseError(err.message, 'updateReservation');
        }
    }
}
