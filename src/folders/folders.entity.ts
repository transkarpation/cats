import { User } from 'src/auth/user.entity';
import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Folder extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.folders, {eager: false})
    user: User;
} 