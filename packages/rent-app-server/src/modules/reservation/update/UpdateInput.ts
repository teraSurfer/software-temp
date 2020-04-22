import { InputType, Field, ID } from 'type-graphql';
import { IsDateString} from 'class-validator';

/*
 * File Created: Sunday, 19th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@InputType()
export class UpdateReservationInput {

    @Field(() => ID)
    id: string;

    @Field(() => String)
    status: string;

    @Field(() => String)
    vehicleId: string;

    @Field(() => String)
    @IsDateString()
    reservationStart: string;

    @Field(() => String)
    @IsDateString()
    reservationEnd: string;
}