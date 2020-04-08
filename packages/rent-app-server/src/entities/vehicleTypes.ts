import { ObjectType, Field, ID, Float } from 'type-graphql';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vehicle } from './vehicle';
import { Price } from './price';

/*
 * File Created: Sunday, 29th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@ObjectType()
@Entity({name: 'vehicle_types'})
export class VehicleType extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field(() => String)
    @Column('varchar', {length: 255, unique: true, nullable: false, name: 'vehicle_type'})
    vehicleType: string;

    @Field(() => String)
    @Column('text', {name: 'vehicle_type_description'})
    vehicleTypeDescription: string;

    @Field(() => Float)
    @Column('numeric', { name: 'hourly_rate' })
    hourlyRate: number;

    @Field(() => Vehicle)
    @OneToMany( () => Vehicle, v => v.vehicleType)
    vehicles: Vehicle[];

    @Field(() => Price, {nullable: true})
    @OneToMany(() => Price, p => p.vehicleType)
    prices: Price[];
}
