import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from '../config/config';
import { Injectable } from '@angular/core';
import { DateUtil } from '../lib/date-util';
import { ApiUser } from '../models/api-user';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  users = [];
  cities = [];
  filteredUsers = [];

  constructor(
    private http: HttpClient,
    private dateUtil: DateUtil
  ) {
    this.resetUserData();
  }

  getUsers(): Observable<ApiUser[]> {
    const url = `${Config.userApi}?results=${Config.userCount}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        const userData = [];
        response.results.forEach(user => {
          userData.push(new ApiUser(user, this.dateUtil));
        });
        return userData;
      })
    );
  }

  setUserData(users: ApiUser[]) {
    this.resetUserData();
    this.users = users;
    users.forEach(user => {
      if (!this.cities.includes(user.city)) {
        this.cities.push(user.city);
      }
    });
    this.cities = this.cities.sort();
  }

  resetUserData() {
    this.users = [];
    this.cities = [];
    this.filteredUsers = [];
  }
}
