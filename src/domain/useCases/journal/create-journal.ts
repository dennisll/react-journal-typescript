import type { CreateJournalDto } from "../../dtos";
import type { Journal } from "../../entities";
import type { IJournalRep } from "../../repositories";



interface CreateJournalUseCase{
    execute(dto: CreateJournalDto): Promise<Journal>
}


export class CreateJournal implements CreateJournalUseCase{

    constructor(
        private readonly journalRepository: IJournalRep
    ){}

    execute(dto: CreateJournalDto): Promise<Journal>{
        return this.journalRepository.createJournal(dto);
    }
}