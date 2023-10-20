import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../dto/create-user.dto';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  confirmPassword: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  passwordShouldMatchConfirmPassword() {
    if (this.confirmPassword === this.password) {
      this.password = this.confirmPassword;
    }
  }
}
