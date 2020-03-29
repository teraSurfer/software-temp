import { createUnionType, ObjectType, Field } from 'type-graphql';
import { User } from '../../entities/user';

/*
 * File Created: Saturday, 28th March 2020
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
    name: 'Response',
    description: 'Response type',
    types: () => [User, ResponseError]
})