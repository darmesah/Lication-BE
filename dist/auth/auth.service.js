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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const argon = require("argon2");
const email_service_1 = require("../email/email.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(jwt, emailService, userModel) {
        this.jwt = jwt;
        this.emailService = emailService;
        this.userModel = userModel;
    }
    async signup(payload) {
        try {
            const userExists = await this.userExists(payload.email);
            if (userExists) {
                throw new common_1.ForbiddenException('An account with this email address already exists');
            }
            const hashedPassword = await argon.hash(payload.password);
            const user = await this.userModel.create({
                ...payload,
                password: hashedPassword,
            });
            const { _id, email } = user;
            const accessToken = await this.signJWT(_id, email);
            return {
                message: 'Account created successfully! An email verification code has been sent to your email. Kindly check your inbox or spam folder',
                accessToken,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async signin(payload) {
        try {
            const userExists = await this.userExists(payload.email);
            if (!userExists) {
                throw new common_1.UnauthorizedException('Incorrect Login Information');
            }
            const checkPassword = await argon.verify(userExists.password, payload.password);
            if (!checkPassword) {
                throw new common_1.UnauthorizedException('Incorrect Login Information');
            }
            const { _id, email } = userExists;
            const accessToken = await this.signJWT(_id, email);
            return {
                message: 'Login Successful',
                accessToken,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async userExists(email) {
        const user = this.userModel.findOne({ email });
        return user;
    }
    async signJWT(_id, email) {
        const payload = { _id, email };
        const accessToken = await this.jwt.signAsync(payload);
        return accessToken;
    }
    async verifyJWT(userId) {
        try {
            const user = await this.userModel
                .findOne({
                _id: userId,
            })
                .select('-password');
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            return user;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        email_service_1.EmailService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map