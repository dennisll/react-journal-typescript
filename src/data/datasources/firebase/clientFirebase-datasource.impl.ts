import type { IClientDat } from "../../../domain/datasources/client-datasource";
import type { CreateClientDto } from "../../../domain/dtos/client/create-client.dto";
import type { UpdateClientDto } from "../../../domain/dtos/client/update-client.dto";
import type { Client } from "../../../domain/entities/client";



export class ClientFirebaseDatasource implements IClientDat{
    
    create(createClientDto: CreateClientDto): Promise<Client> {
        throw new Error("Method not implemented.");
    }
    update(updateClientDto: UpdateClientDto): Promise<Client> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<Client> {
        throw new Error("Method not implemented.");
    }
    getClient(id: string): Promise<Client> {
        throw new Error("Method not implemented.");
    }
    getClients(): Promise<Client[]> {
        throw new Error("Method not implemented.");
    }

}