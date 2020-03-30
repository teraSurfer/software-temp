import { InputType, Field } from 'type-graphql';
import { Length, IsEmail, IsNotEmpty } from 'class-validator';
// import { Role } from '../../../entities/roles';

/*
 * File Created: Saturday, 28th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */


@InputType()
export class CreateUserInput {

    @Field()
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty({message: 'Password doesn\'t meet requirements'})
    @Length(8, 30, {message: 'Password doesn\'t meet requirements'})
    password: string;

    @Field(() => [String])
    roles: string[];
}