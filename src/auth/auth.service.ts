import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AuthSignUpDto,
  AuthLoginDto,
  AuthForgotPasswordDto,
  AuthResetPasswordDto,
} from 'src/common/dto';
import * as argon2 from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/common/schemas';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(body: AuthSignUpDto) {
    const hashedPassword = await argon2.hash(body.password);
    const user = await this.userModel.findOne({
      email: body.email,
    });
    //check if the user already exist
    if (user) {
      throw new ForbiddenException(
        `User with this email address already exist!`,
      );
    }

    //hash the password
    //create aa new user
    const newUser = new this.userModel({
      ...body,
      password: hashedPassword,
    });
    await newUser.save();
    //sign the jwt
    const access_token = this.jwtService.sign({
      username: body.username,
      sub: newUser._id,
      role: newUser.role,
    });
    //send out a mail
    //return user
    delete newUser.password;
    return {
      access_token,
      email: newUser.email,
      username: newUser.username,
      id: newUser._id,
    };
  }

  async login(body: AuthLoginDto) {
    const user = await this.userModel.findOne({
      email: body.email,
    });

    if (!user) {
      throw new NotFoundException(`Invalid email or password!`);
    }

    const pwMatch = await argon2.verify(user.password, body.password);
    if (!pwMatch) {
      throw new NotFoundException(`Invalid email/password entered!`);
    }

    //sign the jwt
    const access_token = this.jwtService.sign({
      username: user.username,
      sub: user.id,
      role: user.role,
    });

    return {
      access_token,
      email: user.email,
      id: user.id,
    };
  }

  async forgotPassword(
    dto: AuthForgotPasswordDto,
  ): Promise<{ message: string }> {
    const user = await this.userModel.findOne({
      email: dto.email,
    });
    if (!user) {
      throw new NotFoundException('Email not recognised!');
    }

    //send user an email
    return {
      message: `Instructions for resetting your password has been sent to your mailbox`,
    };
  }

  //tooken is email address for now
  async resetPassword(dto: AuthResetPasswordDto, token: string): Promise<any> {
    if (!token) {
      throw new ForbiddenException('Operation not allowed');
    }
    const user = await this.userModel.findOne({
      email: token,
    });

    if (dto.newPassword !== dto.confirmPassword) {
      throw new ForbiddenException(`Password entered mismatch`);
    }

    if (!user) {
      throw new ForbiddenException('User is not valid');
    }

    //hash a new password
    const hash = await argon2.hash(dto.newPassword);
    //and update the db
    const filter = { _id: user._id };
    const update = { password: hash };
    const updatedUser = await this.userModel.findOneAndUpdate(filter, update, {
      new: true,
    });
    const { id, email } = updatedUser;

    //send user an email of reset password confirmation
    return {
      id,
      email,
      message: 'password was successfully changed!',
      status: 'success',
    };
  }
}
