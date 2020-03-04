import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Right } from './rights';

@Entity('roles')
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar',{name:'role_name', nullable:false, unique: true})
    roleName: string;

    @Column('text',{name: 'role_description'})
    roleDescription: string;

    @ManyToMany(() => Right)
    @JoinTable({name: 'roles_rights'})
    rights: Right[];
}
