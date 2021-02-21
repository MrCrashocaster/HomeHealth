import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/user';
import * as firebase from 'firebase/app';


@Injectable()
 
export class AuthService {
  resetPassword(email: any) {
    throw new Error("Method not implemented.");
  }

  constructor(private afAuth: AngularFireAuth) {

   }

  public getAuth () : firebase.auth.Auth {
      return this.afAuth.auth; 
   }

  // Get Current User UID
   public getCurrentUserUid() : string {
    return this.afAuth.auth.currentUser.uid;
  } 
   
  // Log In
  public sigin(user: User) : Promise<firebase.auth.UserCredential>  {
     return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
   }

  // Register
  public createAccount(user: User) : Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password); 
   }

  // Log Out
  public logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
  
  }