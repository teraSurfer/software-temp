import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import { User } from './user';
import { Vehicle } from './vehicle';

/*
 * File Created: Sunday, 29th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@ObjectType()
@Entity()
export class Reservation extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('varchar')
    status: string;

    @Field(() => User)
    @ManyToOne(() => User, u => u.reservations)
    user: User;

    @Field(() => Vehicle)
    @ManyToOne(() => Vehicle, v => v.reservations)
    vehicle: Vehicle;

    @Field()
    @Column('timestamptz', {name: 'reservation_start'})
    reservationStart: Date;

    @Field()
    @Column('timestamptz', {name: 'reservation_end'})
    reservationEnd: Date;

}