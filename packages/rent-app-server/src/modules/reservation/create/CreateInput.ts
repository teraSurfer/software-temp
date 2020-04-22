import { InputType, Field, Int, Float } from 'type-graphql';
import { IsDateString, IsUUID } from 'class-validator';
/*
 * File Created: Sunday, 19th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@InputType()
export class CreateReservationInput {

    @Field(() => String)
    @IsUUID()
    vehicleId: string;

    @Field(() => String)
    @IsDateString()
    reservationStart: string;

    @Field(() => String)
    @IsDateString()
    reservationEnd: string;

    @Field(() => Int)
    priceId: number;
}