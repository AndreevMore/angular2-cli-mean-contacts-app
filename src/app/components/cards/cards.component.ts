import { Component, OnInit } from '@angular/core';
import { Http, Response} from '@angular/http';

import { User } from '../../models/user';

import { HttpService }   from '../../service/http.service';
  

@Component({
    selector: 'cards',
	templateUrl: './cards.component.html',
	styleUrls: ['./cards.component.css']
})

export class CardsComponent implements OnInit { 

	currentSortString: string = "name";
	searchVal: string = "";
	
    users: User[] = [];
    usersCount:number;
  	isLoading = true;

    constructor(private httpService: HttpService) {}

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

