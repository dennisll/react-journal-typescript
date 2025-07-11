

export class User{

    constructor(
        public id: string,
        public displayName: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public host?: string,
        public imgUrl?: string,
        public role?: string [],
        
      ) {}


      

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      static getUserFromObject(object: {[key: string]: any}): User{

        const {uid, displayName, email, emailVerified} = object;
        //let imgUrl;

        if(!uid) throw 'Uid is missing';
        if(!displayName) throw 'DisplayName is missing';
        if(emailVerified === null) throw 'EmailVerified is missing';
        if(!email) throw 'Email is missing';
        //if(photoURL) imgUrl = photoURL;
        

         return new User(
          uid, 
          displayName, 
          email, 
          emailVerified,
          ''
        );
      } 
}