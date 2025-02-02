import { Resolver, Mutation, Arg, Authorized } from 'type-graphql';
import { RoleResponseUnion, ResponseError } from '../../shared';
import { CreateRoleInput } from './CreateInput';
import { Role } from '../../../entities/roles';

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
        @Arg('input') input: CreateRoleInput
    ) {
        try {
            const {roleName, roleDescription} = input;

            const isRolePresent = await Role.findOne({
                roleName
            });

            if(isRolePresent) {
                throw new ResponseError(
                    'A role with that name is already present.',
                    'createRole'
                );
            }

            const role = await Role.create({
                roleName,
                roleDescription
            }).save();

            return role;

        } catch (err) {
            throw new ResponseError(
                'Something went wrong, try again later.',
                'createRole'
            );
        }
    }

}
