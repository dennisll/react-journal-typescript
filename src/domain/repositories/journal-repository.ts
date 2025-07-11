import type { CreateJournalDto } from "../dtos/journal/create-journal.dto";
import type { UpdateJournalDto } from "../dtos/journal/update-journal.dto";
import type { Journal } from "../entities/journal";


export interface IJournalRep{

    createJournal (dto: CreateJournalDto): Promise<Journal>;
    updateJournal (dto: UpdateJournalDto): Promise<Journal>;
    getJournal (id: string): Promise<Journal>;
    getJournals (): Promise<Journal []>;
    deleteJournal (id: string): Promise<Journal>;
}