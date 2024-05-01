"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initiatePayment = void 0;
const config_1 = require("@nestjs/config");
const config = new config_1.ConfigService();
const initiatePayment = async (email, amount, reference) => {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: config.get('PAYSTACK_PUBLICKEY'),
        },
        body: JSON.stringify({
            email,
            amount: amount * 100,
            reference,
        }),
    };
    const response = await fetch('https://api.paystack.co/transaction/initialize', options);
    const responseData = await response.json();
    if (responseData.status !== true) {
        return false;
    }
    return responseData.data.authorization_url;
};
exports.initiatePayment = initiatePayment;
//# sourceMappingURL=paystack.js.map