import {
  collection,
  doc,
  getDocs,
  setDoc,
  where,
  query,
  getDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore/lite";
import { FirestoreDB } from "../../../config/firabaseConfig";
import type {
  IRegisterDat,
  CreateRegisterDto,
  UpdateRegisterDto,
} from "../../../domain";
import { Register } from "../../../domain/entities/register";

export class RegisterFirebaseDatasource implements IRegisterDat {
  async create(createRegisterDto: CreateRegisterDto): Promise<Register> {
    const newDoc = doc(collection(FirestoreDB, "/registers"));

    const { createdAt} = createRegisterDto;

    const date = Timestamp.fromDate(new Date(createdAt));

    await setDoc(newDoc, { ...createRegisterDto, createdAt: date });

    const docRef = doc(FirestoreDB, `registers/${newDoc.id}`);

    const data = await getDoc(docRef);

    return Register.getRegisterFromObject({
      id: data.id,
      ...data.data(),
      createdAt: data.data()!.createdAt.toDate(),
    });
  }

  async update(updateRegisterDto: UpdateRegisterDto): Promise<Register> {
    const { lat, long, createdAt, imageUrl } = updateRegisterDto.values;

    const docRef = doc(FirestoreDB, `registers/${updateRegisterDto.id}`);

    const date = Timestamp.fromDate(new Date(createdAt));

    await setDoc(
      docRef,
      { lat, long, createdAt: date, imageUrl },
      { merge: true }
    );

    const data = await getDoc(docRef);

    return Register.getRegisterFromObject({
      id: data.id,
      ...data.data(),
      createdAt: data.data()!.createdAt.toDate(),
    });
  }

  async delete(id: string): Promise<Register> {

    const docRef = doc(FirestoreDB, `registers/${id}`);

    const data = await getDoc(docRef);

    await deleteDoc(docRef);

    return Register.getRegisterFromObject({
      id: data.id,
      ...data.data(),
      createdAt: data.data()!.createdAt.toDate(),
    });
  }

  getRegister(id: string): Promise<Register> {
    throw new Error("Method not implemented.");
  }

  async getRegisters(object: { [key: string]: string }): Promise<Register[]> {
    const registersRef = collection(FirestoreDB, `registers`);

    const { idUser, data } = object;

    let queryRegisters;
    let dataDocs;
    const docRegisters: { [key: string]: any }[] = [];

    if (data) {
      const ano = new Date(data).getFullYear();
      const month = new Date(data).getMonth();
      const day = new Date(data).getDate();

      const inicio = Timestamp.fromDate(
        new Date(`${ano}-${month + 1}-${day - 1}`)
      );
      const fin = Timestamp.fromDate(
        new Date(`${ano}-${month + 1}-${day + 1}`)
      );

      queryRegisters = query(
        registersRef,
        where("createdAt", ">", inicio),
        where("createdAt", "<", fin)
      );

      dataDocs = await getDocs(queryRegisters!);
    } else {
      queryRegisters = query(registersRef, where("idUser", "==", idUser));
      dataDocs = await getDocs(queryRegisters!);
    }

    dataDocs.forEach((doc) => {
      if (doc.data().idUser === idUser) {
        docRegisters.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data()!.createdAt.toDate(),
        });
      }
    });

    return docRegisters.map((doc) => Register.getRegisterFromObject(doc));
  }
}
