

export class User{

    constructor(
        public id: string,
        public displayName: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public img?: string,
      ) {}
}