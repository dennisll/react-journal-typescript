import type { CreateClientDto } from "../dtos/client/create-client.dto";
import type { UpdateClientDto } from "../dtos/client/update-client.dto";
import type { Client } from "../entities/client";


export interface IClientRep{

    create (createClientDto: CreateClientDto): Promise<Client>
    update (updateClientDto: UpdateClientDto): Promise<Client>
    delete (id: string): Promise<Client>
    getClient (id: string): Promise<Client>
    getClients (): Promise<Client []>
}