import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Contact, Message} from '../interfaces';


@Injectable()
export class ContactService
{

  constructor(private http: HttpClient) {
  }


  create(title: string, body: string): Observable<Contact> {
    return this.http.post<Contact>('/api/contact', {title: title, body: body});
  }

  update(id: string, title: string, body: string): Observable<Contact> {
    return this.http.patch<Contact>(`/api/contact/${id}`, {title: title, body: body});
  }

  getById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`/api/contact/${id}`);
  }

  fetch(): Observable<Contact[]> {
    return this.http.get<Contact[]>('/api/contact');
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/contact/${id}`);
  }
}
