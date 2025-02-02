import { ObjectType, Field, ID, Int } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { VehicleType } from './vehicleTypes';
import { Location } from './location';
import { Reservation } from './reservation';

/*
 * File Created: Sunday, 29th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@ObjectType()
@Entity()
export class Vehicle extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column('varchar')
    make: string;

    @Field(() => String)
    @Column('varchar')
    model: string;

    @Field(() => Int)
    @Column('int')
    year: number;

    @Field(() => String)
    @Column('varchar', {name: 'registration_tag'})
    registrationTag: string;

    @Field(() => Int)
    @Column('int', {name: 'current_mileage'})
    currentMileage: number;

    @Field(() => String)
    @Column('date', {name: 'last_serviced'})
    lastServiced: Date | string;

    @Field(() => String)
    @Column('varchar')
    condition: string;

    @Field(() => VehicleType, {nullable: true})
    @ManyToOne(() => VehicleType, vt => vt.vehicles)
    vehicleType: VehicleType;

    @Field(() => Location, {nullable: true})
    @ManyToOne(() => Location, l => l.vehicles)
    location: Location;

    @Field(() => Reservation, {nullable: true})
    @OneToMany(() => Reservation, r => r.vehicle)
    reservations: Reservation[];
}
