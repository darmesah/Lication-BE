import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards';
import {} from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/common/service/fileUpload';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUser(@Req() req) {
    return req.user;
  }

  @Post('create-certificate')
  @HttpCode(HttpStatus.OK)
  async createCertificate(@Req() req, @Body() payload) {
    return await this.userService.createCertificate(req.user._id, payload);
  }

  // @Get('generate-user-verification-url')
  // @HttpCode(HttpStatus.OK)
  // async getUserVerificationUrl(@Req() req) {
  //   return await this.userService.getUserVerificationUrl(req.user);
  // }

  // @Patch('update-profile-picture')
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({ type: UpdateProfilePictureDTO })
  // @HttpCode(HttpStatus.OK)
  // @UseInterceptors(FileInterceptor('profilePicture', { fileFilter }))
  // async updateProfilePicture(
  //   @UploadedFile() file: UpdateProfilePictureDTO,
  //   @Req() req,
  // ) {
  //   return await this.userService.updateProfilePicture(req.user._id, file);
  // }

  // @Patch('update-personal-info')
  // @HttpCode(HttpStatus.OK)
  // async updatePersonalInfo(@Body() payload: UpdatePersonalInfoDTO, @Req() req) {
  //   return await this.userService.updatePersonalInfo(req.user._id, payload);
  // }
}
