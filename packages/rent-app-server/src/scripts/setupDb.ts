import { getConnectionOptions, createConnection } from 'typeorm';
import { Right } from '../entities/rights';
import { Role } from '../entities/roles';
import { User } from '../entities/user';

/*
 * File Created: Wednesday, 4th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

const setupDatabase = async () => {

    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    const connection = await createConnection({...connectionOptions, name: 'default'});

    await connection.synchronize();

    try {
        console.info('Setting up database...');

        const createUser = Right.create({
            rightName: 'create-user',
            rightDescription: 'Allow user to create other users.',
            controller: 'users',
            action: 'create'
        });

        await createUser.save();
    
        const createRight = Right.create({
            rightName: 'create-right',
            rightDescription: 'Allow user to create a new right',
            controller: 'rights',
            action: 'create'
        });
        
        await createRight.save();
    
        const createRole = Right.create({
            rightName: 'create-role',
            rightDescription: 'Allow user to create a new role',
            controller: 'roles',
            action: 'create'
        });

        await createRole.save();

        const findUser = Right.create({
            rightName: 'find-user',
            rightDescription: 'Allow user to find other users',
            controller: 'users',
            action: 'find'
        });

        await findUser.save();

        const findRight = Right.create({
            rightName: 'find-right',
            rightDescription: 'Allow user to find rights',
            controller: 'rights',
            action: 'find'
        });

        await findRight.save();

        const findRole = Right.create({
            rightName: 'find-role',
            rightDescription: 'Allow user to find roles',
            controller: 'roles',
            action: 'find'
        });

        await findRole.save();

        const updateUser = Right.create({
            rightName: 'update-user',
            rightDescription: 'Allow user to update users',
            controller: 'users',
            action: 'update'
        });

        await updateUser.save();

        const updateRight = Right.create({
            rightName: 'update-right',
            rightDescription: 'Allow user to update right',
            controller: 'rights',
            action: 'update'
        });

        await updateRight.save();

        const updateRole = Right.create({
            rightName: 'update-role',
            rightDescription: 'Allow user to update role',
            controller: 'roles',
            action: 'update'
        });

        await updateRole.save();

        const deleteUser = Right.create({
            rightName: 'delete-user',
            rightDescription: 'Allow user to delete user',
            controller: 'users',
            action: 'delete'
        });

        await deleteUser.save();

        const deleteRight = Right.create({
            rightName: 'delete-right',
            rightDescription: 'Allow user to delete right',
            controller: 'rights',
            action: 'delete'
        });

        await deleteRight.save();

        const deleteRole = Right.create({
            rightName: 'delete-role',
            rightDescription: 'Allow user to delete role',
            controller: 'role',
            action: 'delete'
        });

        await deleteRole.save();

        const adminRole = Role.create({
            roleName: 'admin',
            roleDescription: 'Application admin',
            rights: [
                createRight,
                createRole,
                createUser,
                findRight,
                findRole,
                findUser,
                updateRight,
                updateRole,
                updateUser,
                deleteRight,
                deleteRole,
                deleteUser
            ]
        });

        await adminRole.save();

        const userRole = Role.create({
            roleName: 'user',
            roleDescription: 'Application user',
            rights: []
        });

        userRole.save();

        const admin = {
            email: 'achalaesh@live.com',
            password: 'admin@123',
            firstName: 'Achalaesh',
            lastName: 'Lanka',
        };

        const adminUser = User.create({
            email: admin.email,
            firstName: admin.firstName,
            lastName: admin.lastName,
            password: admin.password,
            roles: [
                adminRole
            ]
        });

        await adminUser.save();

        console.info(admin);

    } catch (err) {
        console.error(err);
    }
}

setupDatabase();
