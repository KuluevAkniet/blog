import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Blog {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    blog:string;

    @Column()
    author:string;



    @ManyToOne(() => User,(user) => user.blog)
    users:User[]
}