import { Resolver, Mutation, Arg, Authorized } from 'type-graphql';
import { RoleResponseUnion, ResponseError } from '../../shared';
import { CreateInput } from './CreateInput';
import { Role } from 'rent-app-server/src/entities/roles';

/*
 * File Created: Sunday, 29th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class CreateRoleResolver {

    @Authorized(['admin'])
    @Mutation(() => RoleResponseUnion)
    async createRole(
        @Arg('input') input: CreateInput
    ) {
        try {
            const {roleName, roleDescription} = input;

            const isRolePresent = await Role.findOne({
                roleName
            });

            if(isRolePresent) {
                return new ResponseError(
                    'A role with that name is already present.',
                    'createRole'
                )
            }

            const role = await Role.create({
                roleName,
                roleDescription
            }).save();

            return role;

        } catch (err) {
            return new ResponseError(
                'Something went wrong, try again later.',
                'createRole'
            )
        }
    }

}
