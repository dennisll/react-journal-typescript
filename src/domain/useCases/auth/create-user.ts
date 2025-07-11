import { CreateUserDto } from "../../dtos/auth/create-user.dto";
import type { User } from "../../entities/user";
import type { IAuthRep } from "../../repositories/auth-repository";

interface CreateUserUseCase{
    execute(dto: CreateUserDto): Promise<User>
}

export class CreateUser implements CreateUserUseCase{

    constructor(
        private readonly authRepository: IAuthRep
    ) {}

    execute(dto: CreateUserDto): Promise<User>{
       return this.authRepository.createUser(dto);
    }
    
}