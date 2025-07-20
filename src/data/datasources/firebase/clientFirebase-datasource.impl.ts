import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore/lite";
import { FirestoreDB } from "../../../config/firabaseConfig";
import type { IClientDat } from "../../../domain/datasources/client-datasource";
import type { CreateClientDto } from "../../../domain/dtos/client/create-client.dto";
import type { UpdateClientDto } from "../../../domain/dtos/client/update-client.dto";
import { Client } from "../../../domain/entities/client";

export class ClientFirebaseDatasource implements IClientDat {
  async create(createClientDto: CreateClientDto): Promise<Client> {
    const newDoc = doc(collection(FirestoreDB, "/clients"));
    await setDoc(newDoc, { ...createClientDto });

    const { name, description, address } = createClientDto;

    return new Client(newDoc.id, name, description, address);
  }

  async update(updateClientDto: UpdateClientDto): Promise<Client> {

    const { name, address, description } = updateClientDto.values;

    const docRef = doc(FirestoreDB, `clients/${updateClientDto.id}`);
    await setDoc(docRef, { name, address, description }, { merge: true });

    const data = await getDoc(docRef);

    const client = {
      id: data.id,
      ...data.data(),
    };

    return Client.getClientFromObject(client);
  }

  async delete(id: string): Promise<Client> {
    const docRef = doc(FirestoreDB, `clients/${id}`);
    const data = await getDoc(docRef);

    const client = { id: data.id, ...data.data() };

    await deleteDoc(docRef);

    return Client.getClientFromObject(client);
  }

  getClient(id: string): Promise<Client> {
    throw new Error("Method not implemented.");
  }

  async getClients(): Promise<Client[]> {
    const clientsRef = collection(FirestoreDB, "clients");
    const data = await getDocs(clientsRef);

    const docClients: { [key: string]: any }[] = [];

    data.forEach((doc) => {
      docClients.push({ id: doc.id, ...doc.data() });
    });

    return docClients.map((doc) => Client.getClientFromObject(doc));
  }
}
