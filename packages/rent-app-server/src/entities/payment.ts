import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';
import { Reservation } from './reservation';

/*
 * File Created: Monday, 30th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@ObjectType()
@Entity()
export class Payment extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => User)
    @ManyToOne(() => User, usr => usr.payments)
    user: User;

    @Field(() => Reservation, {nullable: true})
    @OneToOne(() => Reservation, r => r.payment)
    @JoinColumn()
    reservation: Reservation;

}

