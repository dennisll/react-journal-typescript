

export class PasswordDto{

    private constructor(
        public readonly password: string
    ){}

    static create(object: {[key: string]: string}): [error?: string, passwordDto?: PasswordDto]{

          const {password} = object;

          if(!password) return ['Password property is required', undefined];
          if(password.length < 6) return ['password must be a valid password', undefined]; 

          return [undefined, new PasswordDto(password)];
    }
}