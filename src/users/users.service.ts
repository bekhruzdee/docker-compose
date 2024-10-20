import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return {
      message: 'User successfully created',
      user,
    };
  }

  // Find all users
  async findAll() {
    const users = await this.userRepository.find();
    if (users.length === 0) {
      return { message: 'No users found' };
    }
    return {
      message: 'Users successfully retrieved',
      users,
    };
  }

  // Find a specific user by ID
  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return {
      message: `User with ID ${id} successfully found`,
      user,
    };
  }

  // Update a user by ID
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.save(user);
    return {
      message: `User with ID ${id} successfully updated`,
      user,
    };
  }

  // Remove a user by ID
  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.remove(user);
    return {
      message: `User with ID ${id} successfully removed`,
    };
  }
}
