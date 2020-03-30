import { ObjectType, Field, ID, Int } from 'type-graphql';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vehicle } from './vehicle';

/*
 * File Created: Sunday, 29th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@ObjectType()
@Entity()
export class Location extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Field(() => String)
    @Column('varchar', {name: 'location_name'})
    locationName: string;

    @Field()
    @Column('text', {name: 'address_first_line'})
    addressFirstLine: string;

    @Field({nullable: true})
    @Column('text', {name: 'address_second_line'})
    addressSecondLine: string;

    @Field()
    @Column('text', {name: 'address_third_line'})
    addressThirdLine: string;

    @Field()
    @Column('varchar', {name: 'address_zip_code'})
    addressZipCode: string;

    @Field(() => Int, {
        defaultValue: 0
    })
    @Column('int', {name: 'vehicle_capacity'})
    vehicleCapacity: number;

    @Field(() => Vehicle)
    @OneToMany(() => Vehicle, v => v.location)
    vehicles: Vehicle[];

}