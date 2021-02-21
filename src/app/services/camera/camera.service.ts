import { Injectable } from '@angular/core';
import { Camera, CameraOptions} from "@ionic-native/camera/ngx";
import { UserService } from '../user/user.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()

export class CameraService {

  constructor(private userSevice: UserService, private db: AngularFireDatabase, private camera: Camera) {

   }

   getPicture() : Promise<any> {

    let options: CameraOptions = {
      quality: 100,  
      allowEdit: true,  
      saveToPhotoAlbum: true,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
     // get the picture 
     return this.camera.getPicture(options);
   }

   async updatePicture() : Promise<any> {

    // Select User
    let pictureRef = this.db.object(`/users/${this.userSevice.getUID()}`);
    const imageData = await this.getPicture();
    let base64Image : string = 'data:image/jpeg;base64,' + imageData;

     // Save Image
    pictureRef.update({ picture: base64Image });
  }  
}
