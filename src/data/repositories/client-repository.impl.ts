import type { IClientDat } from "../../domain/datasources/client-datasource";
import type { CreateClientDto } from "../../domain/dtos/client/create-client.dto";
import type { UpdateClientDto } from "../../domain/dtos/client/update-client.dto";
import type { Client } from "../../domain/entities/client";
import type { IClientRep } from "../../domain/repositories/client-Repository";



export class ClientRepository implements IClientRep{

    constructor( private readonly clientDatasource: IClientDat){}

    create(createClientDto: CreateClientDto): Promise<Client> {
         return this.clientDatasource.create(createClientDto);
    }
    update(updateClientDto: UpdateClientDto): Promise<Client> {
        return this.clientDatasource.update(updateClientDto);
    }
    delete(id: string): Promise<Client> {
        return this.clientDatasource.delete(id);
    }
    getClient(id: string): Promise<Client> {
        return this.clientDatasource.getClient(id);
    }
    getClients(): Promise<Client[]> {
        return this.clientDatasource.getClients();
    }
}