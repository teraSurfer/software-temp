import { ObjectType, Field, ID, Float, Int } from 'type-graphql';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { VehicleType } from './vehicleTypes';
import { Payment } from './payment';

/*
 * File Created: Wednesday, 1st April 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@ObjectType() 
@Entity()
export class Price extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field(() => String)
    @Column('varchar')
    name: string;

    @Field(() => Float)
    @Column('float')
    cost: number;

    @Field(() => Int)
    @Column('int', {name: 'number_of_hours'})
    numberOfHours: number;
    

    @Field(() => VehicleType, {nullable: true})
    @ManyToOne(() => VehicleType, vt => vt.prices)
    vehicleType: VehicleType;

    @Field(() => Payment)
    @OneToMany(() => Payment, p => p.price)
    payments: Payment[];
}
