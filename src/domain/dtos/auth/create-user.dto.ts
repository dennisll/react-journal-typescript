

export class CreateUserDto{

    private constructor(
        public readonly email: string,
        public readonly displayName: string,
        public readonly password: string
    ) {}

    static create(formData: {[key: string]: string}): [string?, CreateUserDto?]{

        const {email, displayName, password} = formData;
        
        if(!email) return ['Email is required', undefined];
        if (!displayName) return ['Display is required', undefined];
        if ( !password ) return ['Password is required', undefined];

        return [undefined, new CreateUserDto(email, displayName, password)];
    }
}