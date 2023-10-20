import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  roleDto,
  SignupDto,
  UserLoginDto,
  UserRole,
} from './dto/create-user.dto';
import { hasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  signUp(@Body() createUserDto: SignupDto) {
    return this.usersService.createUser(createUserDto);
  }
  @Post('login')
  login(@Body() user: UserLoginDto) {
    return this.usersService.login(user);
  }

  @Put(':id/role')
  changeRoleOfUser(@Param('id') id: string, @Body() user: roleDto) {
    return this.usersService.changeRoleOfUser(id, user);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
