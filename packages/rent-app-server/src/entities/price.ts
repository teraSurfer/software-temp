import { ObjectType, Field, ID, Float } from 'type-graphql';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { VehicleType } from './vehicleTypes';

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
    @Column('cost')
    cost: number;

    @Field(() => VehicleType, {nullable: true})
    @ManyToOne(() => VehicleType, vt => vt.prices)
    vehicleType: VehicleType;
}
