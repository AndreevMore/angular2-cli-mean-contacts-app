import { Component, OnInit } from '@angular/core';
import { Http, Response} from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { User } from '../../models/user';
import { NewUser } from '../../models/userNew';

import { HttpService }   from '../../service/http.service';
import { GlobalState }   from '../../service/global-state';

import { NavigationComponent }   from '../../components/navigation/navigation.component';

@Component({
    selector: 'editor',
	templateUrl: './editor.component.html',
  	styleUrls: ['./editor.component.css'],		
    providers: [HttpService]
})

export class EditorComponent implements OnInit { 
	users: User[] = [];
	arrAll;
    newUser: NewUser = new NewUser("", "", "");
    usersCount:number;
  	isLoading = true;

    constructor(private httpService: HttpService, private state: GlobalState) {}

	ngOnInit(){
        this.usersGet();
	}

	usersCountGet(){
	    this.httpService.usersCountGet().subscribe(
			data => this.usersCount = data,
			error => console.log(error),
			() => this.isLoading = false
	    );
	}

	usersConsolePrint(){
		console.log(this.users);
	}

	userAdd(){
		console.log("----editor.component----"+this.newUser);

		this.httpService.userAdd(this.newUser).subscribe(
			res => {
				let newUser = res.json();
				this.users.push(newUser);
			},
			error => console.log(error)
		);
	}

	usersGet(){
	    this.httpService.usersGet().subscribe(
			data => this.users = data,
			error => console.log(error),
			() => this.isLoading = false
	    );
	}

	userDelete(user) {
		if (window.confirm('Are you sure you want to permanently delete this item?')) {
			this.httpService.userDelete(user).subscribe(
			res => {
				let pos = this.users.map(elem => { return elem._id; }).indexOf(user._id);
				this.users.splice(pos, 1);
			},
			error => console.log(error)
			);
		}
	}

	usersDeleteSelected(){
		let selected = this.users.filter((x) => x.selected);

		for (var i = 0; i < selected.length; ++i) {
			this.httpService.userDelete(selected[i]).subscribe((data) => { this.usersGet() });
		}
		this.usersCountGet();
	}
}