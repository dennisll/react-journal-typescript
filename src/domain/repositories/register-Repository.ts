import type { Register } from "react-router-dom"
import type { CreateRegisterDto } from "../dtos/register/create-register.dto"
import type { UpdateRegisterDto } from "../dtos/register/update-register.dto"


export interface IRegisterRep{

    create (createRegisterDto: CreateRegisterDto): Promise<Register>
    update (updateRegisterDto: UpdateRegisterDto): Promise<Register>
    delete (id: string): Promise<Register>
    getRegister (id: string): Promise<Register>
    getRegisters (): Promise<Register []>
}