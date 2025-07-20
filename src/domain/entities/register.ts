

export class Register{

    constructor(
        public id: string,
        public createdAt: string,
        public lat: string,
        public long: string,
        public imageUrl: string,
        public idUser: string
    ){}

    static getRegisterFromObject( object: {[key:string]: any}): Register{

        const {id, createdAt, lat, long, imageUrl, idUser} = object;
  
        if(!id) throw "Missing id, this property is required";
        if(!createdAt) throw "Missing createdAt, this property is required";
        
        const newCreatedAt = new Date(createdAt);

        if (newCreatedAt.toString() === "Invalid Date") throw "CreatedAt must be a valid date";
        if(!lat) throw "Missing lat, this property is required";
        if(!long) throw "Missing long, this property is required";
        if(!imageUrl) throw "Missing imageUrl, this property is required";
        if(!idUser) throw "Missing idUser, this property is required";
  
        return new Register(id, newCreatedAt.toISOString(), lat, long, imageUrl, idUser);
      }
}