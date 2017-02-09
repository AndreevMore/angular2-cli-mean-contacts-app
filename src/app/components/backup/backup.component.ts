import { Component, ElementRef, EventEmitter } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/Rx' ;

import { NewUser } from '../../models/userNew';
import { User } from '../../models/user';

import { GlobalState }   from '../../service/global-state';
import { HttpService }   from '../../service/http.service';
import { WindowRef } from '../../service/WindowRef';

@Component({
    selector: 'backup',
  	templateUrl: './backup.component.html',
 	styleUrls: ['./backup.component.css']
})

export class BackupComponent {

	users: User[] = [];
	newUser: NewUser = new NewUser("", "", "");
	isLoading = true;




	constructor(public elementRef: ElementRef, private httpService: HttpService, private state: GlobalState, private winRef: WindowRef) {
	 // console.log('Window object', winRef.nativeWindow);
	}


fileToBase($event) : void {
    this.readThis($event.target);
  }

readThis(inputValue: any) : void {
    var file:File = inputValue.files[0]; 
    var myReader:FileReader = new FileReader();

    myReader.onloadend = function(e){
      // you can perform an action with readed data here
      console.log(myReader.result);
    }

    myReader.readAsText(file);
  }
  

	baseToFile(){
		if (this.winRef.nativeWindow.File && this.winRef.nativeWindow.FileReader && this.winRef.nativeWindow.FileList && window.Blob) {
        	// console.log('APIs are supported in this browser.');
		    this.httpService.usersGet().subscribe(data => {
		    	let textToWrite=JSON.stringify(data);

		        let date = new Date();

		        let textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
		        let fileNameToSaveAs ='backup ' + date.getFullYear() +'/'+  date.getMonth()+1 +'/'+ date.getDate() +'('+ date.getHours() +':'+ date.getMinutes() +')';
		        // document.getElementById("inputFileNameToSaveAs").value;

		        let downloadLink = document.createElement("a");
		        downloadLink.download = fileNameToSaveAs;
		        downloadLink.innerHTML = "Download File";
		        
		        if (this.winRef.nativeWindow.URL != null){
		        	// this.winRef.nativeWindow.webkitURLURL != null
		            // Chrome allows the link to be clicked
		            // without actually adding it to the DOM.
		            // downloadLink.href = this.winRef.nativeWindow.webkitURL.createObjectURL(textFileAsBlob);

		            downloadLink.href = this.winRef.nativeWindow.URL.createObjectURL(textFileAsBlob);
		        } else {
		            // Firefox requires the link to be added to the DOM
		            // before it can be clicked.
		            downloadLink.href = this.winRef.nativeWindow.URL.createObjectURL(textFileAsBlob);
		            // downloadLink.onclick = destroyClickedElement;
		            downloadLink.style.display = "none";
		            document.body.appendChild(downloadLink);
		        }
		        downloadLink.click();
			});
	    } else {
	    	alert('The File APIs are not fully supported in this browser.');
	    }
	}
}