import { Resolver, Mutation, Arg, Authorized } from 'type-graphql';
import { ResponseError, PriceResponseUnion } from '../../shared';
import { Price } from '../../../entities/price';

/*
 * File Created: Wednesday, 22nd April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class DeletePriceResolver {
   
    @Authorized(['admin'])
    @Mutation(() => PriceResponseUnion)
    async removePrice(@Arg('id') id: number) {
        try {
            return await Price.delete({ id });
        } catch (err) {
            throw new ResponseError(err.message, 'removePrice');
        }
    }
}