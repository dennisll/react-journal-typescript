export class UpdateClientDto{

    private constructor(
        public readonly id: string,
        public readonly updatedAt: string,
        public readonly name?: string,
        public readonly description?: string,
        public readonly address?: string,
    ){}

    get values(){
        const returnObject: {[key:string]: string} = {}

        if ( this.name ) returnObject.name = this.name;
        if ( this.description ) returnObject.description = this.description;
        if ( this.address ) returnObject.address = this.address;
        if ( this.updatedAt ) returnObject.updatedAt = this.updatedAt;

        return returnObject;
    }

    static create( object: {[key: string]: string}): [string?, UpdateClientDto?]{

        const { id, name, description, address, updatedAt} = object;

        if(!id) return ['Missing id, this property is required', undefined];
        //if(!name) return ['Missing name, this property is required', undefined];
        //if(!description) return ['Missing description, this property is required', undefined];
        //if(!address) return ['Missing address, this property is required', undefined];

        const newUpdatedAt = new Date(updatedAt);

        return [undefined, new UpdateClientDto(id, newUpdatedAt.toISOString(), name, description, address)];
    }
}