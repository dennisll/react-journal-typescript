


export class CreateJournalDto{
    private constructor(
      public readonly title:string,
      public readonly description: string,
      public readonly createdAt: Date,
      public readonly imageUrls?: string [],
    ){}

    static create(object: {[key: string]: string}): [string?, CreateJournalDto?]{

         const {title, description } = object;

         if ( !title ) return ['Title property is required', undefined];
         if ( !description ) return ['Description property is required', undefined];

         const createdAt = new Date();

         return [undefined, new CreateJournalDto(title, description, createdAt)]
    }
}