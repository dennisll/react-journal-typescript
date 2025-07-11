

export class Journal{

    constructor(  
      public id: string,
      public title: string,
      public description: string,
      public date: Date,
      public imageUrls: string [],
      public idUser: string,
      public idClient: string
    ) {}
}