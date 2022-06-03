import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/common/schemas';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}

  async getUser(userId: string) {
    const { _id, username, email, role } = await this.user.findById(userId);

    return {
      id: _id,
      username,
      email,
      role,
    };
  }
}
