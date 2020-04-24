import { ObjectType, Field, createUnionType, Int } from 'type-graphql';
import { User } from '../../entities/user';
import { Role } from '../../entities/roles';
import { VehicleType } from '../../entities/vehicleTypes';
import { Vehicle } from '../../entities/vehicle';
import { Location } from '../../entities/location';
import { Reservation } from '../../entities/reservation';
import { Payment } from '../../entities/payment';
import { Price } from '../../entities/price';

/*
 * File Created: Sunday, 29th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@ObjectType()
export class ResponseError {
    @Field()
    message: string;

    @Field()
    path: string;

    constructor(message: string, path: string) {
        this.message = message;
        this.path = path;
    }
}

// tslint:disable-next-line: max-classes-per-file
@ObjectType()
export class CountResponse {
    @Field(() => Int)
    reservationCount: number;

    @Field(() => Int)
    locationsCount: number;

    @Field(() => Int)
    membersCount: number;

    @Field(() => Int)
    vehiclesCount: number;
}

const UserResponseUnion = createUnionType({
    name: 'UserResponse',
    description: 'User response type',
    types: () => [User, ResponseError]
});


const RoleResponseUnion = createUnionType({
    name: 'RoleResponse',
    description: 'Role response type',
    types: () => [Role, ResponseError]
});

const VehicleTypeResponseUnion = createUnionType({
    name: 'VehicleTypeResponse',
    description: 'Vehicle type response',
    types: () => [VehicleType, ResponseError]
});

const VehicleResponseUnion = createUnionType({
    name: 'VehicleResponse',
    description: 'Vehicle response type',
    types: () => [Vehicle, ResponseError]
});

const LocationResponseUnion = createUnionType({
    name: 'LocationResponse',
    description: 'Location response type',
    types: () => [Location, ResponseError]
});

const ReservationResponseUnion = createUnionType({
    name: 'ReservationResponse',
    description: 'Reservation response type',
    types: () => [Reservation, ResponseError]
});

const PaymentResponseUnion = createUnionType({
    name: 'PaymentResponse',
    description: 'Payment response type',
    types: () => [Payment, ResponseError]
});

const PriceResponseUnion = createUnionType({
    name: 'PriceResponse',
    description: 'Price response type',
    types: () => [Price, ResponseError]
});




export {
    UserResponseUnion,
    RoleResponseUnion,
    VehicleTypeResponseUnion,
    VehicleResponseUnion,
    LocationResponseUnion,
    ReservationResponseUnion,
    PaymentResponseUnion,
    PriceResponseUnion
};
