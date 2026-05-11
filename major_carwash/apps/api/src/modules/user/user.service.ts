// apps/api/src/modules/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import * as Db from '@repo/database'; 
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    // This token must match the one provided in UserModule
    @InjectRepository(Db.UserEntity)
    private readonly userRepository: UserRepository
  ) {}

  async create(data: CreateUserDto) {
    // .createEntity() comes from your BaseRepository
    return await this.userRepository.createEntity(data);
  }

  async findAll() {
    // .search() comes from your BaseRepository
    return await this.userRepository.search();
  }

  async findOne(id: number) {
    // id: any is accepted by MikroORM findOne/findById
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
