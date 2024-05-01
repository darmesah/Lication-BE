import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/database/model';
import { EmailService } from 'src/email/email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

const config = new ConfigService();

// @Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: config.get('JWT_SECRET'),
      signOptions: {
        expiresIn: '100d',
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    // MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
  ],
  providers: [AuthService, EmailService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
