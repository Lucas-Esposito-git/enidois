import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assistido } from '../models/assistido';

@Injectable({
  providedIn: 'root'
})
export class AssistidoService {

  private http = inject(HttpClient);

  private apiUrl = '/api/assistidos';

  cadastrar(assistido: Assistido): Observable<Assistido> {
    return this.http.post<Assistido>(this.apiUrl, assistido);
  }
}