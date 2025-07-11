import type { LoginDto } from "../../dtos/auth/login.dto";
import type { User } from "../../entities/user";
import type { IAuthRep } from "../../repositories/auth-repository";


interface LoginUseCase{
    execute(dto: LoginDto):Promise<User>
}

export class Login implements LoginUseCase{
    constructor(
        private readonly authRepository: IAuthRep
    ) {}

    execute(dto: LoginDto):Promise<User>{
        return this.authRepository.login(dto);
    }
}