import type { IAuthDat } from "../../domain/datasources/auth-datasource";
import type { CreateUserDto } from "../../domain/dtos/auth/create-user.dto";
import type { LoginDto } from "../../domain/dtos/auth/login.dto";
import type { User } from "../../domain/entities/user";
import type { IAuthRep } from "../../domain/repositories/auth-repository";


export class AuthRepository implements IAuthRep{


    constructor(
        private readonly authDatasource: IAuthDat
    ){}

    loginWithGoogle(): Promise<User> {
        return this.authDatasource.loginWithGoogle();
    }
    createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.authDatasource.createUser(createUserDto);
    }

    login(loginDto: LoginDto): Promise<User> {
        return this.authDatasource.login(loginDto);
    }

    logout(): Promise<void> {
        return this.authDatasource.logout();
    }
}