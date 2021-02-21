import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo/photo.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  currentImage: any;

  constructor(public photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.loadSaved();
  }

}
