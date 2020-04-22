import { InputType, Field, Float, Int } from 'type-graphql';

/*
 * File Created: Wednesday, 22nd April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@InputType()
export class CreatePriceInput {


    @Field(() => String)
    name: string;

    @Field(() => Float)
    cost: number;

    @Field(() => Int)
    numberOfHours: number;

    @Field(() => Int)
    vehicleTypeId: number;
}