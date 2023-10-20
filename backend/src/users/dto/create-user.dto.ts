import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Match } from '../../core/customDecorator/match.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  username: string;
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  role: string;
}

export class SignupDto {
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  name: string;
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  username: string;
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
  @IsNotEmpty()
  password: string;
  @Match('password', {
    message: 'Password does not match the confirm Password',
  })
  @IsNotEmpty()
  confirmPassword: string;

  role?: UserRole;
}

export interface UserDtos {
  username: string;
  email: string;
}

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface payloadDto {
  username: string;
  name: string;
  email: string;
}

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user',
}

export interface roleDto {
  role: UserRole;
}
