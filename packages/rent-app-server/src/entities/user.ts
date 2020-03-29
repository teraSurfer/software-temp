import * as bcrypt from 'bcryptjs';

import {
    Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany, JoinTable, OneToOne, JoinColumn
} from 'typeorm';
import { Role } from './roles';
import { ObjectType, Field, ID } from 'type-graphql';
import { Billing } from './billing';

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

    @Field(() => Billing, {nullable: true})
    @OneToOne(() => Billing, billing => billing.user)
    @JoinColumn()
    billing?: Billing;

    constructor(email: string, fn: string, ln: string, id?: string, roles?: Role[]) {
        super();
        if(id)
            this.id = id;
        this.email = email;
        this.firstName = fn;
        this.lastName = ln;
        if(roles) 
            this.roles = roles;
    }

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }
}
