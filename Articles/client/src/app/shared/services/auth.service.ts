import {Injectable} from '@angular/core'
import {User} from '../interfaces'
import {tap} from 'rxjs/operators'
import {HttpClient} from '@angular/common/http'
import {Observable} from "rxjs";

@Injectable()
export class AuthService {

  private token = null

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User>{
    return this.http.post<User>( '/api/auth/register',user)
  }

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/auth/login', user)
      .pipe(tap(({token}) => {
        localStorage.setItem('auth-token', token)
        this.setToken(token)
      }))
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.token = null
    localStorage.clear()
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }
}
