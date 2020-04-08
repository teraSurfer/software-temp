import { Resolver, Authorized, Mutation, Arg } from 'type-graphql';
import { VehicleTypeResponseUnion } from '../../shared';
import { CreateVehicleTypeInput } from './CreateInput';

/*
 * File Created: Sunday, 29th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class CreateVehicleType {

    @Authorized(['admin'])
    @Mutation(() => VehicleTypeResponseUnion)
    async createVehicleType(
        @Arg('input') input: CreateVehicleTypeInput
    ) {
        console.log(input);
        return;
    }
}