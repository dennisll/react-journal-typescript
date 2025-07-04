import type { Journal } from "../../entities";
import type { IJournalRep } from "../../repositories";


interface GetJournalUseCase{
    execute(id: string): Promise<Journal>
}

export class GetJournal implements GetJournalUseCase{

    constructor(
        private readonly journalRepository: IJournalRep
    ){}

    execute(id: string): Promise<Journal> {
        return this.journalRepository.getJournal(id);
    }
}