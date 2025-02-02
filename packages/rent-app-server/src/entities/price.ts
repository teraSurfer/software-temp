import { ObjectType, Field, ID, Float } from 'type-graphql';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { VehicleType } from './vehicleTypes';
import { Payment } from './payment';


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

    @Field(() => String, {nullable: true})
    @Column('varchar', {nullable: true})
    duration: string;
    

    @Field(() => VehicleType, {nullable: true})
    @ManyToOne(() => VehicleType, vt => vt.prices)
    vehicleType: VehicleType;

    @Field(() => Payment)
    @OneToMany(() => Payment, p => p.price)
    payments: Payment[];
}
