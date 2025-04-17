import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Task } from "./Task";

@Entity("boards")
export class Board {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a string" })
  @MaxLength(100, { message: "Name must be less than 100 characters" })
  name!: string;

  @Column({ nullable: true })
  @IsString({ message: "Description must be a string" })
  @MaxLength(500, { message: "Description must be less than 500 characters" })
  description!: string;

  @OneToMany(() => Task, (task) => task.board)
  tasks!: Task[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
