import { InputType, Field } from 'type-graphql';
import { IsEmail } from 'class-validator';
/*
 * File Created: Saturday, 28th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@InputType()
export class LoginInput {
    
    @Field()
    @IsEmail()
    email: string;

    @Field()
    password: string;
}
