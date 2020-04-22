import { Resolver, Mutation, Authorized, Arg } from 'type-graphql';
import { ReservationResponseUnion, ResponseError } from '../../shared';
import { Reservation } from '../../../entities/reservation';

/*
 * File Created: Sunday, 19th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class DeleteReservationResolver {

    @Authorized(['admin'])
    @Mutation(() => ReservationResponseUnion)
    async removeReservation(@Arg('id') id: string) {
        try {
            const reservationExists = await Reservation.findOne({ id });
            if (!reservationExists) {
                throw new ResponseError('Reservation with that id does not exist', 'removeReservation');
            }
            return await Reservation.delete({ id });
        } catch (err) {
            throw new ResponseError(err.message, 'removeReservation');
        }
    }
}
