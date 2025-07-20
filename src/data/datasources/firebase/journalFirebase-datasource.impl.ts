import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore/lite";
import type { IJournalDat } from "../../../domain/datasources/journal-datasource";
import type { CreateJournalDto } from "../../../domain/dtos/journal/create-journal.dto";
import type { UpdateJournalDto } from "../../../domain/dtos/journal/update-journal.dto";
import { Journal } from "../../../domain/entities/journal";
import { FirestoreDB } from "../../../config/firabaseConfig";

export class JournalDatasource implements IJournalDat {
  async createJournal(createJournalDto: CreateJournalDto): Promise<Journal> {
    const newDoc = doc(collection(FirestoreDB, "/journals"));

    const dataIn = {
      title: createJournalDto.title,
      description: createJournalDto.description,
      imageUrls: createJournalDto.imageUrls,
      idUser: createJournalDto.idUser,
      idClient: createJournalDto.nameClient,
      createdAt: createJournalDto.createdAt,
    };

    const date = Timestamp.fromDate(new Date(dataIn.createdAt));

    await setDoc(newDoc, { ...dataIn, createdAt: date });

    const docRef = doc(FirestoreDB, `journals/${newDoc.id}`);

    const data = await getDoc(docRef);

    return Journal.getJournalFromObject({
      id: data.id,
      ...data.data(),
      createdAt: data.data()!.createdAt.toDate(),
    });
  }

  async updateJournal(updateJournalDto: UpdateJournalDto): Promise<Journal> {
    const {
      title,
      description,
      createdAt,
      idClient,
      idUser,
      idWorkers,
      imageUrls,
    } = updateJournalDto.values;

    const docRef = doc(FirestoreDB, `journals/${updateJournalDto.id}`);

    const date = Timestamp.fromDate(new Date(createdAt as string));

    await setDoc(
      docRef,
      {
        title,
        description,
        createdAt: date,
        idClient,
        idUser,
        idWorkers,
        imageUrls,
      },
      { merge: true }
    );

    const data = await getDoc(docRef);

    return Journal.getJournalFromObject({
      id: data.id,
      ...data.data(),
      createdAt: data.data()!.createdAt.toDate(),
    });
  }

  async deleteJournal(id: string): Promise<Journal> {
    const docRef = doc(FirestoreDB, `journals/${id}`);

    const data = await getDoc(docRef);

    await deleteDoc(docRef);

    return Journal.getJournalFromObject({
      id: data.id,
      ...data.data(),
      createdAt: data.data()!.createdAt.toDate(),
    });
  }

  getJournal(id: string): Promise<Journal> {
    throw new Error("Method not implemented.");
  }

  async getJournals(object: { [key: string]: string }): Promise<Journal[]> {

    const journalsRef = collection(FirestoreDB, `journals`);

    const queryJournals = query(journalsRef);
    const dataDocs = await getDocs(queryJournals!);

    const { idUser, data } = object;

    const docJournals: { [key: string]: any } [] = [];

    dataDocs.forEach((doc) => {
      if (doc.data().idUser === idUser) {
        docJournals.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data()!.createdAt.toDate(),
        });
      }
    });

    return docJournals.map(doc => Journal.getJournalFromObject(doc));
  }
}
