import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { payloadDto } from '../users/dto/create-user.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(payload: payloadDto): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  async hashPassword(password: string): Promise<string> {
    try {
      const generatedSalt = await bcrypt.genSalt(Number(process.env.HASH_SALT));
      return await bcrypt.hash(password, generatedSalt);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error Creating Hashed Password',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
