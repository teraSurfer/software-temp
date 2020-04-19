import { InputType, Field, ID } from 'type-graphql';
import { Length } from 'class-validator';

/*
 * File Created: Friday, 17th April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@InputType()
export class UpdateVehicleTypeInput {

    @Field(() => ID)
    id: number;

    @Field(() => String)
    @Length(1, 255)
    vehicleType: string;

    @Field()
    vehicleTypeDescription: string;
    
}