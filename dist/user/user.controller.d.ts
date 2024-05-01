import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(req: any): Promise<any>;
    createCertificate(req: any, payload: any): Promise<void>;
}
