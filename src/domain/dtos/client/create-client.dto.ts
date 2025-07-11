


export class CreateClientDto{

    private constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly address: string,
    ){}

    static create( object: {[key: string]: string}): [string?, CreateClientDto?]{


        const { name, description, address} = object;

        if(!name) return ['Missing name, this property is required', undefined];
        if(!description) return ['Missing description, this property is required', undefined];
        if(!address) return ['Missing address, this property is required', undefined];

        return [undefined, new CreateClientDto(name, description, address)];
    }
}