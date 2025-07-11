import type { CreateRegisterDto, IRegisterDat, IRegisterRep, UpdateRegisterDto } from "../../domain";
import type { Register } from "../../domain/entities/register";


export class RegisterRepository implements IRegisterRep{

    constructor( private readonly registerDatasource: IRegisterDat){}

    create(createRegisterDto: CreateRegisterDto): Promise<Register> {
        return this.registerDatasource.create(createRegisterDto);
    }
    update(updateRegisterDto: UpdateRegisterDto): Promise<Register> {
        return this.registerDatasource.update(updateRegisterDto);
    }
    delete(id: string): Promise<Register> {
        return this.registerDatasource.delete(id);
    }
    getRegister(id: string): Promise<Register> {
        return this.registerDatasource.getRegister(id);
    }
    getRegisters(): Promise<Register[]> {
        return this.registerDatasource.getRegisters();
    }
}