import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { Student } from "./Student";
import { Instructor } from "./Instructor";

export type UserRole = "student" | "instructor";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 50 })
  name!: string;

  @Column({ length: 320, unique: true })
  email!: string;

  @Column({ length: 72 })
  password!: string;

  @Column({ type: "varchar", length: 10 })
  role!: UserRole;

  @Column({ name: "profile_url", length: 2048, nullable: true })
  profileUrl?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  // 依照 role 不同，User 可能有 Student 或 Instructor
  @OneToOne(() => Student, (student) => student.user)
  student?: Student;

  @OneToOne(() => Instructor, (instructor) => instructor.user)
  instructor?: Instructor;
}
