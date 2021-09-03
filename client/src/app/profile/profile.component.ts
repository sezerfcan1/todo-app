import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/auth/userdetails.model';
import { UserService } from '../services/user.service';

declare let alertify: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  user = new UserDetails();

  fileInfos?: Observable<any>;

  ngOnInit(): void {
    this.retrieveProfile();
  }

  retrieveProfile() {
    this.userService.getProfileDetails().subscribe(
      (data) => {
        this.user = data.userDetails;
      },
      (error) => {
        alertify.error('Daha sonra tekrar deneyiniz');
      }
    );
  }

  constructor(private userService: UserService) {}

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;

        this.userService.changeImage(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        );
      }

      this.selectedFiles = undefined;
    }
  }

  getProfileImageUrl() {
    if (this.user.profileImage) {
      return '../../assets/' + this.user.profileImage;
    } else {
      return '../../assets/default.jpg';
    }
  }

  updateDetails(){
    this.userService.updateDetails(this.user).subscribe(
      (data) => {
        alertify.success('Bilgileriniz Kaydedildi');
      },
      (error) => {
        alertify.error('Bir Hata Oluştu');
      }
    )
  }
}
