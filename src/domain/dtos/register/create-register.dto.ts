

export class CreateRegisterDto{
    private constructor(   
      public readonly createdAt: string,
      public readonly lat: string,
      public readonly long: string,
      public readonly imageUrl: string,
      public readonly idUser: string,
      
    ){}

    static create(object: {[key: string]: string}): [string?, CreateRegisterDto?]{

         const {lat, long, imageUrl, idUser} = object;

         if ( !lat ) return ['Lat property is required', undefined];
         if ( !long ) return ['Long property is required', undefined];
         if ( !imageUrl ) return ['IdClient property is required', undefined];

         const createdAt = new Date();

         return [undefined, new CreateRegisterDto(createdAt.toISOString(), lat, long, imageUrl, idUser)]
    }
}