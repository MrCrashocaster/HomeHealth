import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilService } from 'src/app/services/util/util.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm : FormGroup; 
  alertController: any;
  authService: any;

  constructor(
    private auth : AuthService,
    private uitil : UtilService,
    private fb : FormBuilder,
    private storage: Storage,
    private router: Router,
    private afAuth: AngularFireAuth) { 


     }


     getAuth() { 
      return this.afAuth.auth; 
    } 

  createFrom() : void {
    this.loginForm = this.fb.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
      password : ['', Validators.required]
    }); 
  
  }

  resetPassword() {
  console.log('Reset Password Button Clicked');
    //Creating the promt alert with inputs
    let alert = this.alertController.create({
      header: "Reset Password",
      inputs: [
        {
          name: 'resetPassword',
          placeholder: 'Your email address..',
          type: 'email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Reset Password'
        }
      ]
    });
    alert.present();
  }



  sigin() : void {
    console.log('form', this.loginForm.value);
    this.auth.sigin(this.loginForm.value).then(data => {
      console.log('uid sigin: ', JSON.stringify(data.user.uid));
      this.storage.set('uid', JSON.stringify(data.user.uid));
      this.router.navigateByUrl('/tabs');
    },(reason) => {
      this.uitil.doAlert("Error", reason, "Ok");
      this.router.navigateByUrl('/login');
    });
  }

  

  ngOnInit() {
    this.createFrom();
  }

  //forgot password method routes the user to the forgot-password page
  forgotPassword() : void {
    console.log("password reset"); 
    this.router.navigateByUrl('/forgot-password'); 
  }
}