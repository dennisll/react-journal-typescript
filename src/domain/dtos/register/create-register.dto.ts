

export class CreateRegisterDto{

    private constructor(   
      public readonly newCreatedAt: string,
      public readonly lat: string,
      public readonly long: string,
      public readonly idUser: string,
      public readonly imageUrl: string,
      
    ){}

    static create(object: {[key: string]: string}): [string?, CreateRegisterDto?]{

         const {lat, long, imageUrl, idUser} = object;

         if ( !lat ) return ['Lat property is required', undefined];
         if ( !long ) return ['Long property is required', undefined];
         if ( !idUser ) return ['IdUser property is required', undefined];

         const createdAt = new Date();

         return [undefined, new CreateRegisterDto(createdAt.toISOString(), lat, long, idUser, imageUrl)]
    }

    get values(){

      const returnObject: {[key:string]: string} = {}

      if ( this.lat ) returnObject.lat = this.lat;
      if ( this.long ) returnObject.long = this.long;
      if ( this.idUser ) returnObject.idUser = this.idUser;
      if ( this.newCreatedAt ) returnObject.newCreatedAt = this.newCreatedAt;
      if ( this.imageUrl ) returnObject.imageUrl = this.imageUrl;

      return returnObject;
  }
}