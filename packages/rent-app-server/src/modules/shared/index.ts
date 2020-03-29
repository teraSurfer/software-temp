import { ObjectType, Field, createUnionType } from 'type-graphql';
import { User } from 'rent-app-server/src/entities/user';
import { Role } from 'rent-app-server/src/entities/roles';

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
        this.path = path
    }
}

export const UserResponseUnion = createUnionType({
    name: 'UserResponse',
    description: 'User response type',
    types: () => [User, ResponseError]
})


export const RoleResponseUnion = createUnionType({
    name: 'RoleResponse',
    description: 'Role response type',
    types: () => [Role, ResponseError]
})