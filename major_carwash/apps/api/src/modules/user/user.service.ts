// src/modules/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@repo/database'; // Import from your shared package
import { RequiredEntityData } from '@mikro-orm/core';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: RequiredEntityData<User>) {
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

  async update(id: number, data: Partial<User>) {
    const user = await this.userRepository.update(id, data);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async remove(id: number) {
    // Check existence first if you want to throw 404, 
    // otherwise deleteEntity handles it silently.
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    
    await this.userRepository.deleteEntity(id);
    return { deleted: true };
  }
}
