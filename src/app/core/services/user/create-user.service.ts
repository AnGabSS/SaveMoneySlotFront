import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { CreateUserInterface } from '../../../shared/interfaces/user/create-user.interface';
import { UserRoleEnum } from '../../../shared/enums/user/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class CreateUserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  createUser(userData: CreateUserInterface) {
    return this.http.post<SearchedUser>(this.apiUrl, { ...userData, role: UserRoleEnum.USER });
  }
}
