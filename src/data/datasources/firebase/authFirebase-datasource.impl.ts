import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "../../../config/firabaseConfig";
import type { IAuthDat } from "../../../domain/datasources/auth-datasource";
import type { CreateUserDto } from "../../../domain/dtos/auth/create-user.dto";
import type { LoginDto } from "../../../domain/dtos/auth/login.dto";
import { User } from "../../../domain/entities/user";

export class AuthFirebaseDatasource implements IAuthDat{


    async loginWithGoogle(): Promise<User> {
        
        const googleProvider = new GoogleAuthProvider();

        const {user} = await signInWithPopup(FirebaseAuth, googleProvider);

        return User.getUserFromObject(user);

    }

    createUser(createUserDto: CreateUserDto): Promise<User> {

        throw new Error("Method not implemented.");
    }

    async login(loginDto: LoginDto): Promise<User> {
        
        const {email, password} = loginDto;

        const resp = await signInWithEmailAndPassword(
              FirebaseAuth,
              email,
              password
            );

        const userMapped = User.getUserFromObject({...resp.user});

        localStorage.setItem('user', JSON.stringify(userMapped));

        return userMapped;

    }

    async logout(): Promise<void> {
        
        await FirebaseAuth.signOut();
        localStorage.removeItem('user');
    }
    
}