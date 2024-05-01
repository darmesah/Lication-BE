import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  PersonalInfoDTO,
  SigninDTO,
  SignupDTO,
  TokenDTO,
  TokenRequestDTO,
  UpdatePasswordDTO,
} from './dto';
import { AuthGuard } from './guards';

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  signup(@Body() payload: SignupDTO) {
    return this.authService.signup(payload);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() payload: SigninDTO) {
    return this.authService.signin(payload);
  }

  // @UseGuards(AuthGuard)
  // @Post('resend-email-verification')
  // @HttpCode(HttpStatus.OK)
  // resendEmailVerification(@Req() req) {
  //   return this.authService.resendEmailVerification(req.user);
  // }

  // @UseGuards(AuthGuard)
  // @Post('verify-email')
  // @HttpCode(HttpStatus.OK)
  // verifyEmailToken(@Body() payload: TokenDTO, @Req() req) {
  //   return this.authService.verifyEmailToken(req.user._id, payload);
  // }

  // @UseGuards(AuthGuard)
  // @Post('personal-info')
  // @HttpCode(HttpStatus.OK)
  // personalInfo(@Body() payload: PersonalInfoDTO, @Req() req) {
  //   return this.authService.personalInfo(req.user, payload);
  // }

  // @Post('password-reset')
  // @HttpCode(HttpStatus.OK)
  // passwordReset(@Body() payload: TokenRequestDTO) {
  //   return this.authService.passwordReset(payload.email);
  // }

  // @Post('verify-password-reset')
  // @HttpCode(HttpStatus.OK)
  // verifyPasswordToken(@Body() payload: TokenDTO) {
  //   return this.authService.verifyPasswordToken(payload);
  // }

  // @UseGuards(AuthGuard)
  // @Patch('update-password')
  // @HttpCode(HttpStatus.OK)
  // updatePassword(@Body() payload: UpdatePasswordDTO, @Req() req) {
  //   return this.authService.updatePassword(req.user._id, payload.password);
  // }
}
