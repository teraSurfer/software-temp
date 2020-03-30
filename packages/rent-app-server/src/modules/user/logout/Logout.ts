import { Resolver, Mutation, Ctx } from 'type-graphql';
import { AppContext } from '../../../types/context';

/*
 * File Created: Saturday, 28th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class LogoutResolver {

    @Mutation(() => Boolean)
    async logout(
        @Ctx() ctx: AppContext): Promise<boolean> {
            return new Promise((res, rej) => {
                ctx.req.session!.destroy(err => {
                    if (err) {
                        console.log(err);
                        return rej(false);
                    }

                    ctx.res.clearCookie('sid');
                    return res(true);
                });
            });
        }
}
