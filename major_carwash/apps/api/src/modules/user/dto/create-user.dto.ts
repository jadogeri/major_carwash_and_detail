// src/modules/user/dto/create-user.dto.ts
import { UserEntity } from '@repo/database';
import type { RequiredEntityData } from '@mikro-orm/core';
import { IsEmail, IsString, IsOptional } from 'class-validator';

// 1. Define the specific fields the API endpoint actually accepts from the client
export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  image?: string;
}

// 2. Enforce structural integrity separately via a compile-time type check if desired
type ValidatedPayload = Omit<RequiredEntityData<UserEntity>, 'id' | 'createdAt' | 'updatedAt' | 'emailVerified' | 'role'>;

