import type { CreateUserDto } from "../dtos/auth/create-user.dto";
import type { LoginDto } from "../dtos/auth/login.dto";
import type { User } from "../entities/user";

export interface IAuthDat{
    createUser ( createUserDto: CreateUserDto): Promise<User>;
    login ( loginDto: LoginDto): Promise<User>;
    loginWithGoogle (): Promise<User>;
    logout (): Promise<void>;
}