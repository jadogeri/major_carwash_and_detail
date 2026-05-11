// src/modules/user/dto/create-user.dto.ts
import { UserEntity } from '@repo/database';
import type { RawQueryFragment, RequiredEntityData } from '@mikro-orm/core';

// This is a class, so it works as a runtime value!
export class CreateUserDto implements RequiredEntityData<UserEntity> {
  createdAt!: string | Date | RawQueryFragment<string>;
  id?: number | RawQueryFragment<string> | null | undefined;
  email!: string;
  name?: string;
  // Add other required fields from your User entity here
}
