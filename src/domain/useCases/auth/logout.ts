import type { IAuthRep } from "../../repositories/auth-repository";

interface LogoutUseCase{
    execute(): Promise<void>
}

export class Logout implements LogoutUseCase{

    constructor(
        private readonly authRepository: IAuthRep
    ) {}

    execute(): Promise<void>{
        return this.authRepository.logout()
    }
}