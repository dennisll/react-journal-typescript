import type { IJournalDat } from "../../domain/datasources/journal/journal-repository";
import type { CreateJournalDto } from "../../domain/dtos/journal/create-journal.dto";
import type { UpdateJournalDto } from "../../domain/dtos/journal/update-journal.dto";
import type { Journal } from "../../domain/entities/journal";
import type { IJournalRep } from "../../domain/repositories/journal/journal-repository";


export class JournalRepository implements IJournalRep{

    constructor(
        private readonly journalDatasource: IJournalDat
    ){}

    createJournal(dto: CreateJournalDto): Promise<Journal> {
        return this.journalDatasource.createJournal(dto);
    }

    updateJournal(dto: UpdateJournalDto): Promise<Journal> {
        return this.journalDatasource.updateJournal(dto);
    }

    getJournal(id: string): Promise<Journal> {
        return this.journalDatasource.getJournal(id);
    }

    getJournals(): Promise<Journal[]> {
        return this.journalDatasource.getJournals();
    }

    deleteJournal(id: string): Promise<Journal> {
        return this.journalDatasource.deleteJournal(id);
    }

}