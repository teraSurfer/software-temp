import * as bcrypt from 'bcryptjs';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { UserResponseUnion, ResponseError } from '../../shared';
import { LoginInput } from './LoginInput';
import { User } from '../../../entities/user';
import { AppContext } from '../../../types/context';
/*
 * File Created: Saturday, 28th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class LoginResolver {

    @Mutation(() => UserResponseUnion)
    async login(@Arg('data') {
        email,
        password
    }: LoginInput,
        @Ctx() ctx: AppContext) {
        const user = await User.findOne({ email }, {
            relations: ['roles']
        });
        
        if (!user) {
            throw new ResponseError(
                'Invalid email, try again.',
                'login'
            );
        }

        if(!user.membershipDetails) {
            user.membershipDetails = undefined;
        }

        const valid = await bcrypt.compare(
            password,
            user.password
        );

        if (!valid) {
            throw new ResponseError(
                'Invalid password, try again.',
                'login'
            );
        }

        ctx.req.session!.userId = user.id;
        console.log(user);
        return user;
    }
}