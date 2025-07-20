import type { CreateRegisterDto, UpdateRegisterDto } from ".."
import type { Register } from "../entities/register"


export interface IRegisterDat{

    create (createRegisterDto: CreateRegisterDto): Promise<Register>
    update (updateRegisterDto: UpdateRegisterDto): Promise<Register>
    delete (id: string): Promise<Register>
    getRegister (id: string): Promise<Register>
    getRegisters (object: { [key: string]: string}): Promise<Register []>
}