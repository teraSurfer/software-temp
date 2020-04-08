import * as bcrypt from 'bcryptjs';

import {
    Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany, JoinTable, OneToOne, OneToMany, JoinColumn
} from 'typeorm';
import { Role } from './roles';
import { ObjectType, Field, ID } from 'type-graphql';
import { MembershipDetails } from './membershipDetails';
import { Reservation } from './reservation';
import {Payment} from './payment';

/*
 * File Created: Sunday, 1st March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@ObjectType()
@Entity('users')
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @Field()
    @Column('varchar', {length: 255})
    email: string;

    @Column('varchar', {length: 255})
    @Field()
    firstName: string;

    @Column('varchar', {length: 255})
    @Field()
    lastName: string;

    @Column('text')
    password: string;

    @Field(() => Role)
    @ManyToMany(() => Role)
    @JoinTable({name: 'user_roles'})
    roles: Role[];

    @Field(() => MembershipDetails, {nullable: true})
    @OneToOne(() => MembershipDetails, mdetails => mdetails.user)
    @JoinColumn({name: 'membership_details'})
    membershipDetails?: MembershipDetails;

    @Field(() => Reservation, {nullable: true})
    @OneToMany(() => Reservation, r => r.user)
    reservations: Reservation[];

    @Field(() => Payment, {nullable: true})
    @OneToMany(() => Payment, p => p.user)
    payments: Payment[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }
}
