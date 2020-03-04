import * as bcrypt from 'bcryptjs';

import {
    Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany, JoinTable
} from 'typeorm';
import { Role } from './roles';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid') id: string;

    @Column('varchar', {length: 255})
    email: string;

    @Column('varchar', {length: 20})
    firstName: string;

    @Column('varchar', {length: 20})
    lastName: string;

    @Column('text')
    password: string;

    @ManyToMany(() => Role)
    @JoinTable({name: 'user_roles'})
    roles: Role[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }
}