import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'uploadFile';
  apiUrl = 'https://localhost:44349/api/XApi/UploadScorm';
  isValid=false
  constructor(private http: HttpClient) {}
  

checkFile(file:any){
  if(file.length===0){
   this.isValid=false
  }
  console.log(true);
  
  this.isValid= true
}

  uploadFile(files: any) {
    if (files.length === 0) {
      return;
    }
    console.log(files);

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    console.log(fileToUpload);
    formData.append('file', fileToUpload, fileToUpload.name);
    this.uploadAttachment(formData);
  }

  uploadAttachment(file: FormData) {
    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    this.http.post(this.apiUrl, file).subscribe(
      (data: any) => {
        if (data) {
          console.log(data);
        }
      },
      (err) => {console.log(err);
      }
    );
  }
}
