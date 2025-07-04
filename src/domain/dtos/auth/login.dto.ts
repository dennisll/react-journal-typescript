

export class LoginDto{

    private constructor(
        public readonly email: string,
        public readonly password: string
    ) {}

    static create(formData: {[key: string]: string}): [string?, LoginDto?]{

        const {email, password} = formData;
        
        if(!email) return ['Email is required', undefined];
        if ( !password ) return ['Password is required', undefined];

        return [undefined, new LoginDto(email, password)];
    }
}