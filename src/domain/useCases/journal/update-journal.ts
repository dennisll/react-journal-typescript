import type { UpdateJournalDto } from "../../dtos";
import type { Journal } from "../../entities";
import type { IJournalRep } from "../../repositories";



interface UpdateJournalUseCase{
    execute(dto: UpdateJournalDto): Promise<Journal>
}

export class UpdateJournal implements UpdateJournalUseCase{

    constructor(
        private readonly journalRepository: IJournalRep
    ){}
    execute(dto: UpdateJournalDto): Promise<Journal> {
        return this.journalRepository.updateJournal(dto);
    }
}