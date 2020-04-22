import { Resolver, Query, Authorized, Arg } from 'type-graphql';
import { ReservationResponseUnion, ResponseError } from '../../shared';
import { Reservation } from '../../../entities/reservation';

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
    @Query(() => ReservationResponseUnion)
    async findAllReservation(
        @Arg('skip') skip: number = 0,
        @Arg('take') take: number = 10
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
}