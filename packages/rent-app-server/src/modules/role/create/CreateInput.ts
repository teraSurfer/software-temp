import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

/*
 * File Created: Sunday, 29th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@InputType()
export class CreateInput {

    @Field()
    @IsNotEmpty()
    roleName: string;

    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    roleDescription: string;
}