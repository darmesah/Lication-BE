"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = void 0;
const config_1 = require("@nestjs/config");
const config = new config_1.ConfigService();
exports.jwtConstants = {
    secret: config.get('JWT_SECRET'),
};
//# sourceMappingURL=constants.js.map