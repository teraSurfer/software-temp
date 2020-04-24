import { Resolver, Query, Authorized, Arg } from 'type-graphql';
import { PriceResponseUnion, ResponseError } from '../../shared';
import { Price } from '../../../entities/price';
import { VehicleType } from '../../../entities/vehicleTypes';

/*
 * File Created: Tuesday, 21st April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class FindPriceResolver {

    @Authorized(['user', 'admin'])
    @Query(() => PriceResponseUnion)
    async findOnePrice(@Arg('id', { defaultValue: NaN }) id: number, @Arg('name', { defaultValue: '' }) name: string) {
        try {
            if (!isNaN(id))
                return await Price.findOneOrFail({
                    id
                }, {relations: ['vehicleType', 'payments']});
            else if (name !== '') {
                return await Price.findOneOrFail({ name },{relations: ['vehicleType', 'payments']});
            } else {
                throw new ResponseError('Need either id or name', 'findOnePrice');
            }
        } catch (err) {
            throw new ResponseError(err.message, 'findOnePrice');
        }
    }

    @Authorized(['admin'])
    @Query(() => [PriceResponseUnion])
    async findAllPrices(@Arg('skip', { defaultValue: 0 }) skip: number, @Arg('take', { defaultValue: 10 }) take: number) {
        try {
            return await Price.find({ relations: ['vehicleType'], order: { id: 'ASC' }, take, skip });
        } catch (err) {
            throw new ResponseError(err.message, 'findAllPrices');
        }
    }

    @Authorized(['user', 'admin'])
    @Query(() => PriceResponseUnion)
    async findPriceForVehicleType(@Arg('vehicleType') vt: string, @Arg('duration') duration: string) {
        try {
            const vehicleType = await VehicleType.findOneOrFail({ vehicleType: vt });
            return await Price.findOne({ vehicleType, duration });
        } catch (err) {
            throw new ResponseError(err.message, 'findPriceForVehicleType');
        }
    }

}
