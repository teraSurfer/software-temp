import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ID, ObjectType,  } from 'type-graphql';

/*
 * File Created: Monday, 2nd March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@ObjectType()
@Entity('roles')
export class Role extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column('varchar',{name:'role_name', nullable:false, unique: true})
    roleName: string;

    @Field()
    @Column('text',{name: 'role_description'})
    roleDescription: string;
}
