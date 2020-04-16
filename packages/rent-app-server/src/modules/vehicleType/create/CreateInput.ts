import { InputType, Field, Float } from 'type-graphql';
import { Length } from 'class-validator';
/*
 * File Created: Sunday, 29th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@InputType()
export class CreateVehicleTypeInput {

    @Field(() => String)
    @Length(1, 255)
    vehicleType: string;

    @Field()
    vehicleDescription: string;
    
}
