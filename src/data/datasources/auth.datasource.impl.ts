import type { IAuthDat } from "../../domain/datasources/auth/auth-datasource";
import type { CreateUserDto } from "../../domain/dtos/auth/create-user.dto";
import type { LoginDto } from "../../domain/dtos/auth/login.dto";
import type { User } from "../../domain/entities/user";

export class AuthDatasource implements IAuthDat{

    createUser(createUserDto: CreateUserDto): Promise<User> {
        throw new Error("Method not implemented.");
    }

    login(loginDto: LoginDto): Promise<User> {
        throw new Error("Method not implemented.");
    }

    logout(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}