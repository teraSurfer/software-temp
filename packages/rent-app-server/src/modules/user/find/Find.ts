import { Resolver, Query, Ctx, Authorized, Arg } from 'type-graphql';
import { UserResponseUnion, ResponseError } from '../../shared';
import { AppContext } from '../../../types/context';
import { User } from '../../../entities/user';


/*
 * File Created: Sunday, 29th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */



@Resolver()
export class UserResolver {

    @Authorized()
    @Query(() => UserResponseUnion)
    async me(@Ctx() ctx: AppContext) {
        const currentUser = await User.findOne({ id: ctx.req.session!.userId }, {
            relations: ['roles']
        });

        return currentUser;
    }

    @Authorized(['admin'])
    @Query(() => [UserResponseUnion]!)
    async findAllUsers() {
        try {
            const users = await User.find({
                relations: ['roles']
            });
            return users;
        } catch (err) {
            throw new ResponseError(
                'Cannot query db, try again later.',
                'findAllUsers'
            );
        }
    }

    @Authorized(['admin'])
    @Query(() => UserResponseUnion)
    async findOneUser(@Arg('id') id?: string, @Arg('email') email?: string) {
        try {
            if (id !== '') {
                const user = await User.findOne({id}, {
                    relations: ['roles']
                });
                return user;
            } else if (email !== '') {
                const user = await User.findOne({email}, {
                    relations: ['roles']
                });
                return user;
            } else {
                throw new ResponseError(
                    'Need email or id.',
                    'findOneUser'
                );
            }
        } catch (err) {
            throw new ResponseError(
                'Cannot query db, try again later.',
                'findOneUser'
            );
        }
    }

}
