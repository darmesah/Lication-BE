import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cloudinaryUploader } from 'src/common/service/fileUpload';
import { idVerification } from 'src/common/service/idVerification';
import { IUser, IUserCertificateApplication } from 'src/database/interface';
import { CreateCertificateDTO, ScheduleBiometricAppointmentDTO } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    @InjectModel('UserCertificateApplication')
    private userCertificateApplicationModel: Model<IUserCertificateApplication>,
  ) {}

  async createCertificateApplication(
    userId: string,
    payload: CreateCertificateDTO,
  ) {
    try {
      const newCertificate = await this.userCertificateApplicationModel.create({
        ...payload,
        userId,
      });

      return {
        message: 'Certifacate application created successfully',
        newCertificate,
      };
    } catch (error) {
      throw error;
    }
  }

  async getCertificateApplications(userId: string) {
    try {
      const certificateApplications =
        await this.userCertificateApplicationModel.find({
          userId,
        });

      return {
        message: 'Certifacate applications',
        certificateApplications,
      };
    } catch (error) {
      throw error;
    }
  }

  async getCertificateApplication(
    userId: string,
    certificateApplicationId: string,
  ) {
    try {
      const certificateApplication =
        await this.userCertificateApplicationModel.findOne({
          userId,
          _id: certificateApplicationId,
        });

      return {
        message: 'Certifacate application',
        certificateApplication,
      };
    } catch (error) {
      throw error;
    }
  }

  async payForCertificateApplication(
    userId: string,
    certificateApplicationId: string,
  ) {
    try {
      await this.userCertificateApplicationModel.findOneAndUpdate(
        {
          userId,
          _id: certificateApplicationId,
        },
        { paymentStatus: 'paid' },
      );

      return {
        message: 'Certifacate application paid successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async scheduleBiometricAppointment(
    userId: string,
    certificateApplicationId: string,
    payload: ScheduleBiometricAppointmentDTO,
  ) {
    try {
      await this.userCertificateApplicationModel.findOneAndUpdate(
        {
          userId,
          _id: certificateApplicationId,
        },
        { preferredAppointmentTime: payload.preferredAppointmentTime },
      );

      return {
        message: 'Certifacate application paid successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  // async hideVerificationAlert(userId) {
  //   try {
  //     await this.userModel.findByIdAndUpdate(userId, {
  //       showVerificationAlert: false,
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async getUserVerificationUrl(user: IUser) {
  //   try {
  //     const idVerificationData = await idVerification(
  //       user._id,
  //       `${user.firstName} ${user.lastName}`,
  //     );

  //     if (!idVerificationData) {
  //       throw new InternalServerErrorException(
  //         'An error occurred, please try again later',
  //       );
  //     }

  //     return {
  //       message: 'Verification link generated successfully',
  //       verificationLink: idVerificationData.generatedLink,
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async updateProfilePicture(userId: string, file) {
  //   try {
  //     const profilePicture = await this.handleCloudinaryUpload(file);

  //     await this.userModel.findByIdAndUpdate(userId, { profilePicture });

  //     return {
  //       message: 'Profile photo updated successfully',
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async updatePersonalInfo(userId: string, payload: UpdatePersonalInfoDTO) {
  //   const verifiedPayload = {
  //     phone: payload.phone,
  //     address: payload.address,
  //   };

  //   try {
  //     const user = await this.userModel.findById(userId);

  //     if (user.idVerification === 'verified') {
  //       await this.userModel.findByIdAndUpdate(userId, { ...verifiedPayload });
  //     } else {
  //       await this.userModel.findByIdAndUpdate(userId, { ...payload });
  //     }

  //     return {
  //       message: 'Personal details updated successfully',
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // // UTILS
  // async handleCloudinaryUpload(file) {
  //   try {
  //     // Upload files to Cloudinary
  //     const profilePicture = await cloudinaryUploader(file);

  //     return profilePicture;
  //   } catch (error) {
  //     throw new Error('Error uploading files to Cloudinary.');
  //   }
  // }
}
