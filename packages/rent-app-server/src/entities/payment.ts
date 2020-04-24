import { ObjectType, Field, ID, Float } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToOne, Column } from 'typeorm';
import { User } from './user';
import { Reservation } from './reservation';
import { Price } from './price';

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
    reservation: Reservation;

    @Field(() => Price)
    @ManyToOne(() => Price, p => p.payments)
    price: Price;

    @Field(() => Float)
    @Column('float', {name: 'total_cost'})
    totalCost: number;

    @Field(() => String)
    @Column('date')
    paymentDate: Date | string;

}

