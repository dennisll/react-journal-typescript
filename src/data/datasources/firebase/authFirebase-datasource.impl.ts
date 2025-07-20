import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "../../../config/firabaseConfig";
import type { IAuthDat } from "../../../domain/datasources/auth-datasource";
import type { CreateUserDto } from "../../../domain/dtos/auth/create-user.dto";
import type { LoginDto } from "../../../domain/dtos/auth/login.dto";
import { User as UserEntity } from "../../../domain/entities/user";

export class AuthFirebaseDatasource implements IAuthDat {

  
  async loginWithGoogle(): Promise<UserEntity> {

    const googleProvider = new GoogleAuthProvider();

    await signInWithPopup(FirebaseAuth, googleProvider);

    const {uid, emailVerified, displayName, email} = FirebaseAuth.currentUser!;

    const userAuth = new UserEntity(
      uid,
      displayName!,
      email!,
      emailVerified,
      ""
    );

    localStorage.setItem("user", JSON.stringify(userAuth));

    return userAuth;
  }


  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, displayName, password } = createUserDto;

    await createUserWithEmailAndPassword(FirebaseAuth, email, password);

    await updateProfile(FirebaseAuth.currentUser!, { displayName });

    const userFirebase = FirebaseAuth.currentUser!;

    const {uid, emailVerified} = userFirebase;

    const userAuth = new UserEntity(
      uid,
      userFirebase.displayName!,
      userFirebase.email!,
      emailVerified,
      ""
    );

    localStorage.setItem("user", JSON.stringify(userAuth));

    return userAuth;
  }


  async login(loginDto: LoginDto): Promise<UserEntity> {

    const { email, password } = loginDto;

    await signInWithEmailAndPassword(FirebaseAuth, email, password);

    const userFirebase = FirebaseAuth.currentUser!;

    const {uid, emailVerified, displayName} = userFirebase;

    const userAuth = new UserEntity(
      uid,
      displayName!,
      userFirebase.email!,
      emailVerified,
      ""
    );

    localStorage.setItem("user", JSON.stringify(userAuth));

    return userAuth;
  }


  async logout(): Promise<void> {

    await FirebaseAuth.signOut();
    localStorage.removeItem("user");
  }
}
