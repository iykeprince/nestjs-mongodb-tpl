import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorator';
import { Public } from 'src/common/decorator/public.decorator';
import { Role } from 'src/common/enum';
import { JwtAuthGuard, RoleGuard } from 'src/common/guard';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getProfile(@Req() req) {
    const authUser = req.user;
    return this.userService.getUser(authUser.id);
  }

  @Public()
  @Get('all')
  getUsers() {
    return [{ username: 'john' }, { username: 'janet' }];
  }

  @Roles(Role.ADMIN)
  @Get('admin-users')
  getForAdmin() {
    return 'only admin should see this';
  }
}
