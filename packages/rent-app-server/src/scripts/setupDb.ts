import { getConnectionOptions, createConnection } from 'typeorm';
import { Role } from '../entities/roles';
import { User } from '../entities/user';
import { Price } from '../entities/price';

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

        const adminRole = Role.create({
            roleName: 'admin',
            roleDescription: 'Application admin'
        });

        await adminRole.save();

        const userRole = Role.create({
            roleName: 'user',
            roleDescription: 'Application user'
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

        const membershipPrice = Price.create({
            cost: 49.99,
            name: 'membership',
            duration: '6 months'
        });

        await membershipPrice.save();
        console.info({ admin, membershipPrice });

    } catch (err) {
        console.error(err);
    }
};

setupDatabase();
