import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create a new user
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.usersService.create(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: result.message,
        data: result.user,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Find all users
  @Get()
  async findAll() {
    try {
      const result = await this.usersService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: result.message,
        data: result.users,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Find one user by ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const result = await this.usersService.findOne(+id);
      return {
        statusCode: HttpStatus.OK,
        message: result.message,
        data: result.user,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // Update a user by ID
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      const result = await this.usersService.update(+id, updateUserDto);
      return {
        statusCode: HttpStatus.OK,
        message: result.message,
        data: result.user,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // Remove a user by ID
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const result = await this.usersService.remove(+id);
      return {
        statusCode: HttpStatus.OK,
        message: result.message,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
