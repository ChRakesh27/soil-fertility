import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  selectedFile: File;

  percentage: number = 0;
  result: string;
  map = {
    "1": "Very Low",
    "2": "low",
    "3": "Moderate",
    "4": "Moderate High",
    "5": "High",
    "6": "Very High"
  }

  constructor(private _httpClient: HttpClient) {

  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload() {
    if (this.selectedFile) {
      var fd = new FormData();
      fd.append('rawFile', this.selectedFile);
      this._httpClient.post('http://localhost:3000/upload', fd).subscribe(res => {
        console.log(res);
        this.result = this.map[res[0]]
        this.percentage = res[0] * 16;
      })
    } else {
      this.selectedFile = null;
      this.percentage = 0;
      this.result = null;
    }
  }

  onClose() {
    this.percentage = 0;
    this.result = null;
  }
}
