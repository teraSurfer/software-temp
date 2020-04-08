import { Resolver, Query, Authorized, Arg } from 'type-graphql';
import { RoleResponseUnion, ResponseError } from '../../shared';
import { Role } from '../../../entities/roles';

/*
 * File Created: Sunday, 29th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Resolver()
export class FindRolesResolver {

    @Authorized(['admin'])
    @Query(() => RoleResponseUnion)
    async findAllRoles () {
        try {
            const roles = Role.find();
            return roles;
        } catch (err) {
            throw new ResponseError(
                'Could not query db, try again later.',
                'findAllRoles'
            );
        }

    }

    @Authorized(['admin'])
    @Query(() => RoleResponseUnion)
    async findOneRole(
        @Arg('roleName') roleName: string
    ) {
        try {
            const role = await Role.findOne({
                roleName
            });

            return role;
        } catch (err) {
            throw new ResponseError (
                'Could not query db, try again later.',
                'findOneRoles'
            );
        }
    }
}