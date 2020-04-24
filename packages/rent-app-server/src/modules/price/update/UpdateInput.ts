import { InputType, Field, Float, Int, ID } from 'type-graphql';

/*
 * File Created: Wednesday, 22nd April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@InputType()
export class UpdatePriceInput {

    @Field(() => ID)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => Float)
    cost: number;

    @Field(() => String)
    duration: string;

    @Field(() => Int, {nullable: true})
    vehicleTypeId: number;
}