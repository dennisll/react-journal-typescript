


export class CreateClientDto{

    private constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly address: string,
        public readonly createdAt: string,
    ){}

    static create( object: {[key: string]: string}): [string?, CreateClientDto?]{


        const { name, description, address} = object;

        if(!name) return ['Missing name, this property is required', undefined];
        if(!description) return ['Missing description, this property is required', undefined];
        if(!address) return ['Missing address, this property is required', undefined];

        const createdAt = new Date();

        return [undefined, new CreateClientDto(name, description, address, createdAt.toISOString())];
    }

    get values(){

        const returnObject: {[key:string]: string} = {}
  
        if ( this.name ) returnObject.name = this.name;
        if ( this.description ) returnObject.description = this.description;
        if ( this.address ) returnObject.address = this.address;
        if ( this.createdAt ) returnObject.createdAt = this.createdAt;
  
        return returnObject;
    }
}