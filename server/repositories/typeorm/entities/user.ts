// 2. Interface and Adapters (TypeORM の Entitiy)
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'users' })
export class TypeormUserEntity {
    @PrimaryGeneratedColumn()
    id!: string
    @Column()
    name!: string
    @Column()
    point!: number
}
