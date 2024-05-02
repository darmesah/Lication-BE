"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserService = class UserService {
    constructor(userModel, userCertificateApplicationModel) {
        this.userModel = userModel;
        this.userCertificateApplicationModel = userCertificateApplicationModel;
    }
    async createCertificateApplication(userId, payload) {
        try {
            const newCertificate = await this.userCertificateApplicationModel.create({
                ...payload,
                userId,
            });
            return {
                message: 'Certifacate application created successfully',
                newCertificate,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getCertificateApplications(userId) {
        try {
            const certificateApplications = await this.userCertificateApplicationModel.find({
                userId,
            });
            return {
                message: 'Certifacate applications',
                certificateApplications,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getCertificateApplication(userId, certificateApplicationId) {
        try {
            const certificateApplication = await this.userCertificateApplicationModel.findOne({
                userId,
                _id: certificateApplicationId,
            });
            return {
                message: 'Certifacate application',
                certificateApplication,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async payForCertificateApplication(userId, certificateApplicationId) {
        try {
            await this.userCertificateApplicationModel.findOneAndUpdate({
                userId,
                _id: certificateApplicationId,
            }, { paymentStatus: 'paid' });
            return {
                message: 'Certifacate application paid successfully',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async scheduleBiometricAppointment(userId, certificateApplicationId, payload) {
        try {
            await this.userCertificateApplicationModel.findOneAndUpdate({
                userId,
                _id: certificateApplicationId,
            }, { preferredAppointmentTime: payload.preferredAppointmentTime });
            return {
                message: 'Certifacate application paid successfully',
            };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('UserCertificateApplication')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map