import { AuthService } from './auth.service';
import { SigninDTO, SignupDTO } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(payload: SignupDTO): Promise<{
        message: string;
        accessToken: string;
    }>;
    signin(payload: SigninDTO): Promise<{
        message: string;
        accessToken: string;
    }>;
}
