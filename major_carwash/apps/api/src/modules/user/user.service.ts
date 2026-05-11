// src/modules/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
// 1. Use a namespace import for the shared package
import * as Db from '@repo/database'; 
// 2. Use a namespace import for MikroORM core types
import * as Mikro from '@mikro-orm/core';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

 async create(data: CreateUserDto) {
    return await this.userRepository.createEntity(data);
  }

  async findAll() {
    return await this.userRepository.search();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.userRepository.update(id, data);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async remove(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    
    await this.userRepository.deleteEntity(id);
    return { deleted: true };
  }
}
