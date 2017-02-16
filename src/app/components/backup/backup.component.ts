import { Component, ElementRef, ViewChild, EventEmitter } from '@angular/core';
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

	userAdd(){
	console.log("----backup.component----"+this.newUser);

		this.httpService.userAdd(this.newUser).subscribe(
			res => {
				let newUser = res.json();
				this.users.push(newUser);
			},
			error => console.log(error)
		);
	}

	fileToBase($event) : void {
		var self = this;
		var file = $event.target.files[0];

        var reader = new FileReader();
        reader.onload = function (e:any) {
            var contents = e.target.result;
            var json = JSON.parse(contents);
                
            // console.log(contents);

            for (var i = 0; i < json.length; i++) {
                let object = json[i];
                self.newUser = {name : object.name, password : object.password, email : object.email};
				// let x = bUser.json()
				// console.log(self.newUser);

                self.userAdd();

				// self.httpService.userAdd(bUser).subscribe(
				// 	res => {
				// 		this.users.push(bUser);
				// 	},
				// 	error => console.log(error)
				// );


            }
        }
        reader.readAsText(file);
        // alert('data is loaded');
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