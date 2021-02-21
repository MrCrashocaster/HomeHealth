import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CameraService } from 'src/app/services/camera/camera.service';
import { UtilService } from 'src/app/services/util/util.service';
import { AlertController, NavController } from '@ionic/angular';
import * as firebase from 'firebase';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user : User = new User;
  
  
  constructor(private utilService: UtilService, 
    private auth : AuthService, 
    private storage: Storage,
    private userService: UserService, 
    private router: Router, 
    private camera: CameraService,
    public alertController: AlertController, 
    private navCtrl: NavController, 
    private authService: AuthService,
    private route: Router
    ) {
   this.userService.getUser().valueChanges().subscribe(data => { 
     console.log('current user: ', data);
     console.log('pwd: ', data.password, ' email: ', data.email,' key: ', data.key,' name: ',  data.name, data.picture); 
     this.user = data 
    
    });
   }

   
  async logout2() {
    const alert = await this.alertController.create({
      header: 'Log Out',
      subHeader: '',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.authService.logoutUser()
              .then(res => {
                console.log(res);
                this.navCtrl.navigateBack('');
              })
              .catch(error => {
                console.log(error);
              })
          }
        }
      ]
    });

    await alert.present();
  }


  // Update Profile Picture
  update() : void {
    this.camera.updatePicture().then(value => {
      console.log('update: ', value);
      this.utilService.doToast('Sucess', 'Your Image Is Updated')
    }).catch(err => this.utilService.doAlert('Error', 'This feature only works on Mobiles', 'OK'));
  }

  gotoAboutPage() {
    this.navCtrl.navigateForward('about');
  }

  async changePassword(){
    console.log('Change Password Button Clicked');
    //Creating the promt alert with inputs
    let alert = await this.alertController.create({
      header: "Change Password",
      inputs: [
        {
          name: 'oldPassword',
          placeholder: 'Your old password..',
          type: 'password'
        },
        {
          name: 'newPassword',
          placeholder: 'Your new password..',
          type: 'password'
        },
        {
          name: 'newPasswordConfirm',
          placeholder: 'Confirm your new password..',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update Password',
          handler: data => {
            //First you get the current logged in user
            const cpUser = firebase.auth().currentUser;
            /*Then you set credentials to be the current logged in user's email
            and the password the user typed in the input named "old password"
            where he is basically confirming his password just like facebook for example.*/
            const credentials = firebase.auth.EmailAuthProvider.credential(cpUser.email, data.oldPassword);
            //Reauthenticating here with the data above
            cpUser.reauthenticateWithCredential(credentials).then(async (success) => {
              if (data.newPassword != data.newPasswordConfirm) {
                let alert = await this.alertController.create({
                  message: 'You did not confirm your password correctly.',
                  buttons: ['Try Again']
                });
                alert.present();
              }
              else if (data.newPassword.length < 6) {
                let alert = await this.alertController.create({
                  message: 'Your password should be at least 6 characters long',
                  buttons: ['Try Again']
                });
                alert.present();
              }
              else {
                let alert = await this.alertController.create({
                  message: 'Your password has been updated!',
                  buttons: ['OK']
                });
                alert.present();
                /* Update the password to the password the user typed into the
                  new password input field */
                cpUser.updatePassword(data.newPassword).then(function () {
                  //Success
                }).catch(function (error) {
                  //Failed
                });
              }
            }, async (error) => {
              console.log(error);
              if (error.code === "auth/wrong-password") {
                let alert = await this.alertController.create({
                  message: 'Your old password is invalid.',
                  buttons: ['Try Again']
                });
                alert.present();
              }
            });
            console.log(credentials);
          }
        }
      ]
    });
    alert.present();
  }

  ngOnInit(): void {
  }
/*
  //change password parameters are the email, password, and new password
  //return value is a boolean of true if the change occured.
  changePassword(email, pwd, newPwd) {
    console.log("This is a change");
  }
  */
}
