import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ClientRequest } from 'http';

// Entity 用于装饰整个类，使其变成一个数据库模型
@Entity()
export class User {
    // PrimaryGeneratedColumn 则是装饰主列，它的值将自动生成
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // select: false ，使得这个字段在查询时默认不被选中
    @Column({ select: false })
    password: string;

    @Column()
    email: string;

}