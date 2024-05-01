"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expiration = exports.onlyNum = void 0;
const onlyNum = (length) => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let index = 0; index < length; index++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.onlyNum = onlyNum;
const expiration = () => {
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 2);
    return expirationTime;
};
exports.expiration = expiration;
//# sourceMappingURL=otpGenerator.js.map