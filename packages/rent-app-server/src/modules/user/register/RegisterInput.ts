import { InputType, Field } from 'type-graphql';
import { Length, IsEmail, IsNotEmpty, IsDateString } from 'class-validator';

/*
 * File Created: Saturday, 28th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */


@InputType()
export class RegisterInput {

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

    @Field()
    @IsNotEmpty({message: 'License cannot be empty'})
    license: string;

    @Field()
    @IsNotEmpty({message: 'Address cannot be empty'})
    addressFirstLine: string;

    @Field()
    addressSecondLine: string;

    @Field()
    @IsNotEmpty({message: 'Address cannot be empty'})
    addressThirdLine: string;

    @Field()
    @Length(5, 5, {message: 'Enter a valid zip code'})
    addressZipCode: string;

    @Field()
    @Length(16, 19, {message: 'Enter a valid credit card'})
    creditCardNumber: string;

    @Field()
    @IsNotEmpty()
    nameOnCard: string;

    @Field()
    @IsDateString()
    expiry: string;

    @Field()
    @Length(3, 3)
    cvv: string;

}
