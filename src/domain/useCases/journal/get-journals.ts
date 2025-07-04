import type { Journal } from "../../entities";
import type { IJournalRep } from "../../repositories";


interface GetJournalsUseCase{
    execute(): Promise<Journal []>
}

export class GetJournals implements GetJournalsUseCase{

    constructor(
        private readonly journalRepository: IJournalRep
    ){}

    execute(): Promise<Journal []> {
        return this.journalRepository.getJournals();
    }
}