import { regularExps } from "../../../config/regularExpValidator";


export class CreateUserDto{

    private constructor(
        public readonly email: string,
        public readonly displayName: string,
        public readonly password: string,
    ) {}

    static create(formData: {[key: string]: string}): [string?, CreateUserDto?]{

        const {displayName, email, password} = formData;
        
        if(!email) return ['Email is required', undefined];
        if(!regularExps.email.test(email)) return ['Email must be a valid email', undefined]; 
        if (!displayName) return ['DisplayName is required', undefined];
        if ( !password ) return ['Password is required', undefined];
        if(password.length < 6) return ['Password must be 6 characters min', undefined];

        return [undefined, new CreateUserDto(email, displayName, password)];
    }

    get values(){

        const returnObject: {[key:string]: string} = {}

        if ( this.email ) returnObject.email = this.email;
        if ( this.displayName ) returnObject.displayName = this.displayName;
        if ( this.password ) returnObject.password = this.password;

        return returnObject;
    }
}