import { regularExps } from "../../../config/regularExpValidator";


export class LoginDto{

    private constructor(
        public readonly email: string,
        public readonly password: string
    ) {}

    static create(formData: {[key: string]: string}): [string?, LoginDto?]{

        const {email, password} = formData;
        
        if(!email) return ['Email is required', undefined];
        if(!regularExps.email.test(email)) return ['Email must be a valid email', undefined]; 
        if ( !password ) return ['Password is required', undefined];
        if(password.length < 6) return ['Password must be min, 6 characters ', undefined];

        return [undefined, new LoginDto(email, password)];
    }

    get values(){

        const returnObject: {[key:string]: string} = {}

        returnObject.email = this.email;
        returnObject.password = this.password;

        return returnObject;
    }
}