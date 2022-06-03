import { SetMetadata } from '@nestjs/common';
import { Role } from '../enum';

export const ROLE_KEY = 'ROLE';
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
