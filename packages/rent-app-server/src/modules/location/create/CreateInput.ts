import { InputType, Field, Int } from 'type-graphql';
import { Length } from 'class-validator';
/*
 * File Created: Sunday, 19th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@InputType()
export class CreateLocationInput {

    @Field(() => String)
    @Length(1, 255)
    locationName: string;

    @Field(() => String)
    addressFirstLine: string;

    @Field(() => String, { nullable: true })
    addressSecondLine: string;

    @Field(() => String)
    addressThirdLine: string;

    @Field(() => String)
    addressZipCode: string;

    @Field(() => Int)
    vehicleCapacity: number;
}