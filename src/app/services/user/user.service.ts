import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/app/models/user';

@Injectable()

export class UserService {

  constructor(private db : AngularFireDatabase, private auth: AuthService) { 

  }

    // Get current user's UID
    getUID() : string {
    console.log('getCurrentUserUid', this.auth.getCurrentUserUid());
    return this.auth.getCurrentUserUid();
    }

    // Create User
    createUser(user : User) : void {     
        // console.log('create user in db uid: ', uid);
        // get the ref of the users with uid and save it in the db
        let userRef = this.db.object(`users/${this.getUID()}`);
        userRef.set({email: user.email, name: user.name});

    }
    
    // Get Info
     getUser() : AngularFireObject<User> {
        return this.db.object(`/users/${this.getUID()}`);

    } 

    getAllUsers(): AngularFireList<User> {
      return this.db.list(`/users`);
    }

  }

