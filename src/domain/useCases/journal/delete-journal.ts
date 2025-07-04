import type { Journal } from "../../entities";
import type { IJournalRep } from "../../repositories";



interface DeleteJournalUseCase{
    execute(id: string): Promise<Journal>
}

export class DeleteJournal implements DeleteJournalUseCase{

    constructor(
        private readonly journalRepository: IJournalRep
    ){}

    execute(id: string): Promise<Journal> {
        return this.journalRepository.deleteJournal(id);
    }
}