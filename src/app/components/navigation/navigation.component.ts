import { Component, OnInit } from '@angular/core';
import { Http, Response} from '@angular/http';

import { GlobalState }   from '../../service/global-state';
import { HttpService }   from '../../service/http.service';

import { NewUser } from '../../models/userNew';
import { User } from '../../models/user';

import { GridComponent }   from '../../components/grid/grid.component';

@Component({
    selector: 'navigation',
	templateUrl: './navigation.component.html',
  	styleUrls: ['./navigation.component.css'],	
    providers: [HttpService]
})


export class NavigationComponent { 
	usersCount: number;
	users;
	isLoading = true;

	constructor(private httpService: HttpService, private state: GlobalState) {}

	ngOnInit(){
		this.usersCountGet();
		this.state.subscribe('usersCount', data => {
			console.log('subscribtion');
			this.usersCount = data;
		})
	}
	
	usersCountGet(){
	    this.httpService.usersCountGet().subscribe(
			data => this.usersCount = data,
			error => console.log(error),
			() => this.isLoading = false
	    );
	}

}