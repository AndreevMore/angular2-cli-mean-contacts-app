import { Component, OnInit } from '@angular/core';
import { Http, Response} from '@angular/http';

import { NavigationComponent }   from '../../components/navigation/navigation.component';

import { NewUser } from '../../models/userNew';
import { User } from '../../models/user';

import { GlobalState }   from '../../service/global-state';
import { HttpService }   from '../../service/http.service';

@Component({
    selector: 'grid',
 	templateUrl: './grid.component.html',
 	styleUrls: ['./grid.component.css'],				
    providers: [ HttpService ],
})

export class GridComponent implements OnInit { 

	// sortStatus = { 
	//           sortTarget: '',
	//           sortDirection:'' 
	//        };

	currentSortString: string = "name";
	searchVal: string = "";
	
    users: User[] = [];
    newUser: NewUser = new NewUser("", "", "");
    usersCount:number;
  	isLoading = true;
  	
    constructor(private httpService: HttpService, private state: GlobalState) {}

	ngOnInit(){
        this.usersGet();
	}
	
	usersGet(){
	    this.httpService.usersGet().subscribe(
	      data => this.users = data,
	      error => console.log(error),
	      () => this.isLoading = false
	    );
	}
}

