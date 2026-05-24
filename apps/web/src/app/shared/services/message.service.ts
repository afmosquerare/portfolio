import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

export interface CreateMessageDto {
  name: string;
  email: string;
  body: string;
  websiteUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/messages`;

  sendMessage(message: CreateMessageDto): Observable<any> {
    return this.http.post(this.apiUrl, message);
  }
}
