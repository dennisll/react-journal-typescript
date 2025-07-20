

export class Journal{

    constructor(  
      public id: string,
      public title: string,
      public description: string,
      public imageUrls: string [],
      public idUser: string,
      public idClient: string,
      public createdAt: string,
    ) {}

    static getJournalFromObject( object: {[key:string]: any}): Journal{

      const {id,  title, description, imageUrls, idUser, idClient , createdAt} = object;

      if(!id) throw "Missing id, this property is required";
      if(!title) throw "Missing title, this property is required";
      if(!description) throw "Missing description, this property is required";
      if(!imageUrls) throw "Missing imagenUrls, this property is required";
      if(!idUser) throw "Missing idUser, this property is required";
      if(!idClient) throw "Missing idClient, this property is required";
      if(!createdAt) throw "Missing createdAt, this property is required";
      
      const newCreatedAt = new Date(createdAt);

      if (newCreatedAt.toString() === "Invalid Date") throw "CreatedAt must be a valid date";
      

      return new Journal(id,  title, description, imageUrls, idUser, idClient , newCreatedAt.toISOString());
    }
}