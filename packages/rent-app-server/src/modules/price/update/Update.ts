import { Resolver, Mutation, Authorized, Arg } from 'type-graphql';
import { PriceResponseUnion, ResponseError } from '../../shared';
import { UpdatePriceInput }  from './UpdateInput';
import { Price } from '../../../entities/price';
import { VehicleType } from '../../../entities/vehicleTypes';
/*
 * File Created: Wednesday, 22nd April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class UpdatePriceResolver {

    @Authorized(['admin'])
    @Mutation(() => PriceResponseUnion)
    async updatePrice(@Arg('data') { id, vehicleTypeId, name, cost, duration }: UpdatePriceInput) {
        try {
            const priceExists = await Price.findOne({ id });
            const vehicleType = await VehicleType.findOne({ id: vehicleTypeId });
            
            if (!priceExists) {
                throw new ResponseError('Check your input and try again.', 'createPrice');
            }

            await Price.update({ id }, {
                vehicleType,
                name,
                cost,
                duration
            });

            return priceExists;
        } catch (err) {
            throw new ResponseError(err.message, 'updatePrice');
        }
    }

}