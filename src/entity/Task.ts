import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEnum,
  IsOptional,
} from "class-validator";
import { Board } from "./Board";

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @IsNotEmpty({ message: "Title is required" })
  @IsString({ message: "Title must be a string" })
  @MaxLength(200, { message: "Title must be less than 200 characters" })
  title!: string;

  @Column({ nullable: true })
  @IsString({ message: "Description must be a string" })
  @MaxLength(1000, { message: "Description must be less than 1000 characters" })
  description!: string;

  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  @IsEnum(TaskStatus, { message: "Invalid status" })
  status!: TaskStatus;

  @Column({ nullable: true })
  @IsOptional()
  @IsString({ message: "Priority must be a string" })
  priority!: string;

  @Column({ type: "date", nullable: true })
  @IsOptional()
  dueDate!: Date;

  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "boardId" })
  board!: Board;

  @Column()
  boardId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
