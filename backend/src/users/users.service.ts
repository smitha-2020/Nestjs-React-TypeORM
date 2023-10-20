import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  roleDto,
  SignupDto,
  UserDtos,
  UserLoginDto,
} from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private authService: AuthService,
  ) {}
  async createUser(newUser: SignupDto) {
    const hashedPassword = await this.authService.hashPassword(
      newUser.password,
    );
    if (!hashedPassword) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Password could not be hashed.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    try {
      const updatedUser = new User();
      updatedUser.name = newUser.name;
      updatedUser.password = hashedPassword;
      updatedUser.confirmPassword = hashedPassword;
      updatedUser.email = newUser.email;
      updatedUser.username = newUser.username;
      updatedUser.role = newUser.role;

      const updatedDataInDb = await this.userRepository.save(updatedUser);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, confirmPassword, ...result } = updatedDataInDb;
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            'Error Creating Record in DB, Email Address or Username already exists!',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getByEmail(user: UserLoginDto): Promise<User> {
    const email = user.email;
    return this.userRepository.findOne({ where: { email } });
  }

  async changeRoleOfUser(id: string, user: roleDto) {
    const userToBeUpdated = this.findUserById(id);
    const newUpdatedUser = { ...userToBeUpdated, role: user.role };
    return this.userRepository.update(id, newUpdatedUser);
  }

  async login(user: UserLoginDto) {
    try {
      const hashedPassword = await this.getByEmail(user);
      if (
        await this.authService.comparePassword(
          user.password,
          hashedPassword.password,
        )
      ) {
        const { id, password, confirmPassword, ...payload } =
          await this.getByEmail(user);
        return {
          access_token: await this.authService.generateJwtToken(payload),
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error Logging In',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllUsers() {
    const userRecords = await this.userRepository.find();
    if (!userRecords) {
      throw new HttpException('Record does not exist', HttpStatus.NOT_FOUND);
    }
    try {
      const userData: UserDtos[] = userRecords.map((user) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      }));
      return userData;
      //return await this.userRepository.find();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error Listing users',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserById(id: string): Promise<UserDtos> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, confirmPassword, ...result } = user;
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Could not find the record',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeUser(id: string) {
    const recordFound = await this.userRepository.findOneBy({ id });
    if (!recordFound) {
      throw new HttpException('Record does not exist', HttpStatus.NOT_FOUND);
    }
    try {
      const deletedData: { raw: any[]; affected?: number } =
        await this.userRepository.delete(id);
      if ('affected' in deletedData && deletedData.affected > 0) {
        return `Record with ID ${id} deleted successfully`;
      }
    } catch (error) {
      throw new HttpException(
        'Error Removing Record from DB',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
