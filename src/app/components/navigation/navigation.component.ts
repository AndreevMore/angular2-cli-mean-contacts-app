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
	usersCount;

	constructor(private state: GlobalState){}

	ngOnInit(){
		this.state.subscribe('users:count', data=>{
			console.log('subscribtion');
			this.usersCount = data;
		})
	}
	


}