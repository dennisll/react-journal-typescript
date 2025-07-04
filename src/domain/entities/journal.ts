

export class Journal{

    constructor(  
      public id: string,
      public title: string,
      public body: string,
      public date: Date,
      public imageUrls: string [],
    ) {}
}