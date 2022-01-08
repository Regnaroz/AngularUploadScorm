import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'uploadFile';
 
  isValid = false;
  versionList: any;
  versionId=1;
  apiUrl = 'https://localhost:44339/api/FilesData/UplodZIP/';
  constructor(private http: HttpClient) {
    http
      .get('https://localhost:44339/api/ScormVersion/GetScormVersion')
      .subscribe(
        (data) => {
          this.versionList = data;
          
        },
        (err) => {
          console.log(err);
        }
      );

  }

  checkFile(file: any) {
    if (file.length === 0) {
      this.isValid = false;
    }
    console.log(true);

    this.isValid = true;
  }

  uploadFile(files: any) {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    console.log(fileToUpload);
    formData.append('file', fileToUpload, fileToUpload.name);

    this.uploadAttachment(formData);
  }

  uploadAttachment(file: any) {
    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    this.http.post(this.apiUrl.concat(this.versionId.toString()), file).subscribe(
      (data: any) => {
        if (data) {
          console.log(data);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectVersion(id:any){
    this.versionId=id
   }
}
