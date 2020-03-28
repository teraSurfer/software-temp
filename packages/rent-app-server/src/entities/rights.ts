import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

/*
 * File Created: Tuesday, 3rd March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@Entity('rights')
export class Right extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', {name:'right_name', nullable:false, unique: true})
    rightName: string;

    @Column('varchar', {length: 255 , name: 'right_description'})
    rightDescription: string;

    @Column('varchar', {length: 255, name: 'controller'})
    controller: string;

    @Column('varchar', {length: 255, name: 'action'})
    action: string;
}
