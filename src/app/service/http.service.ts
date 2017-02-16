import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams  } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
 
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  private usersUrl = '/users'; 
  private userUrl = '/user'; 
  private userCountUrl = '/users/count'; 
 
	constructor(private http:Http) {}

  userAdd(user): Observable<any> {
    return this.http.post(this.userUrl, user, this.options);
  }
  
  usersGet(): Observable<any> {
    return this.http.get(this.usersUrl).map(res => res.json());
  }

  usersCountGet(): Observable<any> {
    return this.http.get(this.userCountUrl).map(res => res.json());
  }

  userEdit(user): Observable<any> {
    return this.http.put(`/user/${user._id}`, JSON.stringify(user), this.options);
  }

  userDelete(user): Observable<any> {
    return this.http.delete(`/user/${user._id}`, this.options);
  }
}
