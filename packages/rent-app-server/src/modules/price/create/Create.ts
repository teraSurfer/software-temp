import { Resolver, Mutation, Authorized, Arg } from 'type-graphql';
import { PriceResponseUnion, ResponseError } from '../../shared';
import { CreatePriceInput } from './CreateInput';
import { VehicleType } from '../../../entities/vehicleTypes';
import { Price } from '../../../entities/price';

/*
 * File Created: Wednesday, 22nd April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class CreatePriceResolver {

    @Authorized(['admin'])
    @Mutation(() => PriceResponseUnion)
    async createPrice(@Arg('data') { vehicleTypeId, name, cost, numberOfHours }: CreatePriceInput) {
        try {
            const priceExists = await Price.findOne({ name }); 

            const vehicleType = await VehicleType.findOne({ id: vehicleTypeId });

            if (priceExists || !vehicleType) {
                throw new ResponseError('Check your input and try again.', 'createPrice');
            }

            return await Price.create({
                cost,
                name,
                numberOfHours,
                vehicleType
            }).save();
            
        } catch (err) {
            throw new ResponseError(err.message, 'createPrice');
        }
    }
}