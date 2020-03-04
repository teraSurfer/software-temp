import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rights')
export class Right extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar',{name:'right_name', nullable:false, unique: true})
    rightName: string;

    @Column('text',{name: 'right_description'})
    rightDescription: string;
}
