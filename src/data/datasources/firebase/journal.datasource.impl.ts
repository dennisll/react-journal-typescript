import type { IJournalDat } from "../../../domain/datasources/journal/journal-repository";
import type { CreateJournalDto } from "../../../domain/dtos/journal/create-journal.dto";
import type { UpdateJournalDto } from "../../../domain/dtos/journal/update-journal.dto";
import type { Journal } from "../../../domain/entities/journal";


export class JournalDatasource implements IJournalDat{

    createJournal(dto: CreateJournalDto): Promise<Journal> {
        throw new Error("Method not implemented.");
    }

    updateJournal(dto: UpdateJournalDto): Promise<Journal> {
        throw new Error("Method not implemented.");
    }

    getJournal(id: string): Promise<Journal> {
        throw new Error("Method not implemented.");
    }

    getJournals(): Promise<Journal[]> {
        throw new Error("Method not implemented.");
    }
    
    deleteJournal(id: string): Promise<Journal> {
        throw new Error("Method not implemented.");
    }

}