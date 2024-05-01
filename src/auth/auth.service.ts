import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  PersonalInfoDTO,
  SigninDTO,
  SignupDTO,
  TokenDTO,
  UpdatePasswordDTO,
} from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/database/interface';
import * as argon from 'argon2';
import { expiration, onlyNum } from 'src/common/service/otpGenerator';
import { EmailService } from 'src/email/email.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private readonly emailService: EmailService,
    @InjectModel('User') private userModel: Model<IUser>,
    // @InjectModel('Token') private tokenModel: Model<IToken>,
  ) {}

  async signup(payload: SignupDTO) {
    try {
      const userExists = await this.userExists(payload.email);

      if (userExists) {
        throw new ForbiddenException(
          'An account with this email address already exists',
        );
      }

      const hashedPassword = await argon.hash(payload.password);

      const user = await this.userModel.create({
        ...payload,
        password: hashedPassword,
      });

      const { _id, email } = user;
      // await this.createAndSendEmailToken(_id, email, '', 'signup');

      const accessToken = await this.signJWT(_id, email);
      return {
        message:
          'Account created successfully! An email verification code has been sent to your email. Kindly check your inbox or spam folder',
        accessToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async signin(payload: SigninDTO) {
    try {
      const userExists = await this.userExists(payload.email);

      if (!userExists) {
        throw new UnauthorizedException('Incorrect Login Information');
      }

      const checkPassword = await argon.verify(
        userExists.password,
        payload.password,
      );

      if (!checkPassword) {
        throw new UnauthorizedException('Incorrect Login Information');
      }

      const { _id, email } = userExists;
      const accessToken = await this.signJWT(_id, email);

      return {
        message: 'Login Successful',
        accessToken,
      };
    } catch (error) {
      throw error;
    }
  }

  // async resendEmailVerification(user: {
  //   _id: string;
  //   email: string;
  //   emailVerified: boolean;
  // }) {
  //   try {
  //     if (user.emailVerified) {
  //       throw new UnauthorizedException(
  //         'You are not allowed to perform this request',
  //       );
  //     }

  //     await this.createAndSendEmailToken(user._id, user.email, '', 'signup');

  //     return {
  //       message: 'Verification code resent successfully',
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async verifyEmailToken(userId: string, payload: TokenDTO) {
  //   try {
  //     await this.verifyTokenUtil(userId, payload.token);
  //     await this.userModel.findByIdAndUpdate(userId, {
  //       emailVerified: true,
  //     });

  //     return {
  //       message: 'Email verified successfully',
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async personalInfo(
  //   user: { _id: string; personalInfoComplete: boolean },
  //   payload: PersonalInfoDTO,
  // ) {
  //   try {
  //     if (user.personalInfoComplete) {
  //       throw new UnauthorizedException(
  //         'You are not allowed to perform this request',
  //       );
  //     }

  //     await this.userModel.findByIdAndUpdate(user._id, {
  //       ...payload,
  //       personalInfoComplete: true,
  //     });

  //     return {
  //       message: 'User personal infomation has been updated successfully',
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async passwordReset(email: string) {
  //   try {
  //     const userExists = await this.userExists(email);

  //     if (!userExists) {
  //       throw new NotFoundException(
  //         'An account with this email does not exist',
  //       );
  //     }

  //     await this.createAndSendEmailToken(
  //       userExists._id,
  //       email,
  //       userExists.firstName,
  //       'passwordReset',
  //     );

  //     return {
  //       message: 'Password reset code resent successfully',
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async verifyPasswordToken(payload: TokenDTO) {
  //   try {
  //     const userExists = await this.userExists(payload.email);

  //     if (!userExists) {
  //       throw new ForbiddenException(
  //         'An account with this email does not exist',
  //       );
  //     }

  //     await this.verifyTokenUtil(userExists._id, payload.token);
  //     await this.userModel.findByIdAndUpdate(userExists._id, {
  //       emailVerified: true,
  //     });

  //     const { _id, email, role } = userExists;
  //     const accessToken = await this.signJWT(_id, email, role);

  //     return {
  //       message: 'Password reset successful',
  //       accessToken,
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async updatePassword(userId: string, password: string) {
  //   try {
  //     const hashedPassword = await argon.hash(password);

  //     await this.userModel.findByIdAndUpdate(userId, {
  //       password: hashedPassword,
  //     });

  //     return {
  //       message: 'Password has been updated successfully',
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  //   UTILS
  async userExists(email: string) {
    const user = this.userModel.findOne({ email });
    return user;
  }

  // async removeExistingToken(userId: string) {
  //   await this.tokenModel.findOneAndDelete({ userId });
  // }

  // async createAndSendEmailToken(
  //   userId: string,
  //   email: string,
  //   firstName: string,
  //   useCase: 'signup' | 'passwordReset',
  // ) {
  //   await this.removeExistingToken(userId);
  //   const tokenData = {
  //     userId,
  //     token: onlyNum(6),
  //     expiresAt: expiration().toISOString(),
  //   };

  //   const token = await this.tokenModel.create(tokenData);

  //   if (useCase === 'signup') {
  //     await this.emailService.sendSignupToken(email, token.token);
  //   } else if (useCase === 'passwordReset') {
  //     await this.emailService.sendpasswordResetToken(
  //       email,
  //       firstName,
  //       token.token,
  //     );
  //   }
  // }

  // async verifyTokenUtil(userId: string, token: string) {
  //   const isToken = await this.tokenModel.findOne({
  //     userId,
  //     token,
  //   });

  //   if (!isToken) {
  //     throw new ForbiddenException('Token supplied is incorrect');
  //   }

  //   if (new Date().toISOString() > new Date(isToken.expiresAt).toISOString()) {
  //     throw new ForbiddenException(
  //       'This token is expired, kindly request a new token',
  //     );
  //   }

  //   await this.tokenModel.findByIdAndDelete(isToken._id);

  //   return true;
  // }

  async signJWT(_id: string, email: string): Promise<string> {
    const payload = { _id, email };

    const accessToken = await this.jwt.signAsync(payload);

    return accessToken;
  }

  async verifyJWT(userId: string): Promise<any> {
    try {
      const user = await this.userModel
        .findOne({
          _id: userId,
        })
        .select('-password');

      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
