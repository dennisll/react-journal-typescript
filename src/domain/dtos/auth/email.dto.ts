import { regularExps } from "../../../config/regularExpValidator";

export class EmailDto{

    private constructor(
        public readonly email: string
    ){}

    static create(object: {[key: string]: string}): [error?: string, emailDto?: EmailDto]{

          const {email} = object;

          if(!email) return ['Email is property is required', undefined];
          if(!regularExps.email.test(email)) return ['Email must be a valid email', undefined]; 

          return [undefined, new EmailDto(email)];
    }
}
