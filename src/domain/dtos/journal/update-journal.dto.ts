


export class UpdateJournalDto{
    private constructor(
      public readonly id:string,
      public readonly title:string,
      public readonly description: string,
      public readonly createdAt: Date,
      public readonly imageUrls?: string [],
    ){}

    get values (){

        const returnObject: {[key:string]: unknown} = {};

        if ( this.title ) returnObject.text = this.title;
        if ( this.description ) returnObject.description = this.description;
        if(this.createdAt) returnObject.createdAt = this.createdAt;

        return returnObject;
         
    }

    static create(object: {[key: string]: string}): [string?, UpdateJournalDto?]{

         const {id, title, description, createdAt} = object;

         if(!id) return ['Id property is required', undefined];
         if ( !title ) return ['Title property is required', undefined];
         if ( !description ) return ['Description property is required', undefined];
         if(!createdAt) return ['CreatedAt property is required', undefined];
         const newCreatedAt = new Date(createdAt);
         if(newCreatedAt.toString() === 'Invalid Date') 
            return ['CreatedAt must be a valid date']

         return [undefined, new UpdateJournalDto(id, title, description, newCreatedAt)]
    }
}