import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity } from 'typeorm';
import { User } from './user';

/*
 * File Created: Sunday, 29th March 2020
 * Author: Achalaesh Lanka (me@terasurfer.com)
 * -----
 * Copyright (c) 2020
 */

@ObjectType()
@Entity()
export class MembershipDetails extends BaseEntity {
    
    @Field(() => ID)
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({unique: true, nullable: false})
    license: string;

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

    @Field()
    @Column('varchar', {name: 'credit_card_number'})
    creditCardNumber: string;

    @Field()
    @Column('varchar', {name: 'name_on_card'})
    nameOnCard: string;

    @Field()
    @Column('date')
    expiry: Date;

    @Field()
    @Column('varchar')
    cvv: string;

    @Field()
    @Column('date', {name: 'membership_expiry'})
    membershipExpiry: Date;

    @Field(() => User)
    @OneToOne(() => User, user => user.membershipDetails)
    user: User;

}
