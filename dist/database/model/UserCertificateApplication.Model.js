"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCertificateApplication = exports.UserCertificateApplicationSchema = void 0;
const mongoose_1 = require("mongoose");
const { Schema } = mongoose_1.default;
exports.UserCertificateApplicationSchema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User',
    },
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    stateOfOrigin: {
        type: String,
        required: true,
    },
    lgaOfOrigin: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    lga: {
        type: String,
        required: true,
    },
    passortNumber: {
        type: String,
        required: true,
    },
    dateOfIssue: {
        type: String,
        required: true,
    },
    dateOfExpiry: {
        type: String,
        required: true,
    },
    placeOfIssue: {
        type: String,
        required: true,
    },
    purposeOfTravel: {
        type: String,
        required: true,
    },
    destinationCountry: {
        type: String,
        required: true,
    },
    durationOfStay: {
        type: String,
        required: true,
    },
    addressInDestination: {
        type: String,
        required: true,
    },
    currentOccupation: {
        type: String,
        required: true,
    },
    employerName: {
        type: String,
        required: true,
    },
    employerAddress: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    preferredAppointmentTime: {
        type: String,
        required: true,
    },
    nearestCaptureCenter: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const UserCertificateApplication = mongoose_1.default.model('UserCertificateApplication', exports.UserCertificateApplicationSchema);
exports.UserCertificateApplication = UserCertificateApplication;
//# sourceMappingURL=UserCertificateApplication.Model.js.map