
import type { IRegisterDat, CreateRegisterDto, UpdateRegisterDto } from "../../../domain";
import { Register } from "../../../domain/entities/register";


export class RegisterFirebaseDatasource implements IRegisterDat{
    
    create(createRegisterDto: CreateRegisterDto): Promise<Register> {
        throw new Error("Method not implemented.");
    }
    update(updateRegisterDto: UpdateRegisterDto): Promise<Register> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<Register> {
        throw new Error("Method not implemented.");
    }
    getRegister(id: string): Promise<Register> {
        throw new Error("Method not implemented.");
    }
    getRegisters(): Promise<Register[]> {
        throw new Error("Method not implemented.");
    }

}