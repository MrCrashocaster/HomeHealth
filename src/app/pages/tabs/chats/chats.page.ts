import { Component, OnInit } from '@angular/core';
import { ChatsService } from 'src/app/services/chats/chats.service';
import { map } from "rxjs/operators";
import { UtilService } from 'src/app/services/util/util.service';
import { User } from 'src/app/models/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  uids : any;
  users: User[] = new Array<User>();
  chats : any;
  uid: any;
  constructor(private router: Router, private userService: UserService, private chatsService: ChatsService, private utilService: UtilService,  private db : AngularFireDatabase) { 
    this.utilService.doLoading('Loading Chats...');
    this.chatsService.getChats().snapshotChanges().pipe(
      map(changes => changes.map(c => ({
        key : c.payload.key, ...c.payload.val()
      }))
      )).subscribe(uids => {
       uids.map(uid => {
          console.log('user', uid);
          this.db.object(`/users/${uid.key}`).valueChanges().subscribe((user: User) => { user.key = uid.key;  this.users.push(user)});
          })
          console.log('1', this.users);
        })
            
        this.chatsService.getChats().snapshotChanges().pipe(
          map(changes => changes.map(c => ({
            key : c.payload.key, ...c.payload.val()
          }))
          ))
          this.uid = this.userService.getUID();
      }
    
      openChat(key: string) {
       this.chatsService.chatter =  {
         uid : this.uid,
         interlocutorUID : key
       }
        this.router.navigateByUrl('/chat-view')
      }

  ngOnInit() {
 
  }

}
