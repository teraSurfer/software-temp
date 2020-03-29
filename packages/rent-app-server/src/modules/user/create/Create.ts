import { Resolver, Authorized, Mutation, Arg } from 'type-graphql';
import { UserResponseUnion, ResponseError } from '../Responses';
import { CreateInput } from './CreateInput';
import { User } from '../../../entities/user';
import { Role } from '../../../entities/roles';

/*
 * File Created: Sunday, 29th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class CreateUserResolver {


    @Authorized(['admin'])
    @Mutation(() => UserResponseUnion)
    async createUser(
        @Arg('input') input: CreateInput
    ) {
        try {
            const {email, firstName, lastName, password, roles} = input;

            const userExists = await User.findOne({email});

            if(userExists) return new ResponseError (
                'User with that email already exists.',
                'createUser'
            );

            const userRoles = await Role.find(
                {
                    where: roles.map(val => ({roleName: val}))
                }
            )

            if(!userRoles) return new ResponseError (
                'Sorry, that role doesn\'t exist',
                'createUser'
            )

            const user = await User.create({
                email,
                firstName,
                lastName,
                password,
                roles: [...userRoles]
            }).save();

            return user;

        } catch (err) {
            return new ResponseError(
                'Something went wrong, try again later.',
                'createUser'
            )
        }
    }
}
