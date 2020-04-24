import { InputType, Field, Int } from 'type-graphql';
import { Length, IsDateString } from 'class-validator';

/*
 * File Created: Saturday, 18th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@InputType()
export class CreateVehicleInput {
    @Field(() => String)
    @Length(1, 255)
    make: string;

    @Field(() => String)
    @Length(1, 255)
    model: string;

    @Field(() => Int)
    year: number;

    @Field(() => String)
    @Length(1, 255)
    registrationTag: string;

    @Field(() => Int)
    currentMileage: number;

    @Field(() => String)
    @IsDateString()
    lastServiced: Date | string;

    @Field(() => String)
    @Length(1, 255)
    condition: string;

    @Field(() => String)
    vehicleType: string;

    @Field(() => String, { nullable: true })
    location: string;

}