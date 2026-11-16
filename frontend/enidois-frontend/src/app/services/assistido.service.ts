import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assistido } from '../models/assistido';

@Injectable({
  providedIn: 'root'
})
export class AssistidoService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8081/api/assistidos';

  cadastrar(assistido: Assistido): Observable<Assistido> {
    return this.http.post<Assistido>(this.apiUrl, assistido);
  }

  listar(): Observable<Assistido[]> {
    return this.http.get<Assistido[]>(this.apiUrl);
  }

  buscarPorId(id: number) {
    return this.http.get<any>(
      `http://localhost:8081/api/assistidos/${id}`
    );
  }

  atualizar(id: number, assistido: any) {
    return this.http.put<any>(
      `http://localhost:8081/api/assistidos/${id}`,
      assistido
    );
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}