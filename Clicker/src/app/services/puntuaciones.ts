import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Puntuacion {
  nombre: string;
  puntuacion: number;
}

@Injectable({
  providedIn: 'root'
})
export class PuntuacionesService {

  // URL del backend
  private apiUrl = 'http://localhost:3000/api/puntuaciones';

  constructor(private http: HttpClient) { }

  // Guardar o actualizar puntuación
  guardarPuntuacion(p: Puntuacion): Observable<any> {
    return this.http.post(this.apiUrl, p);
  }

  // Obtener todas las puntuaciones
  obtenerPuntuaciones(): Observable<Puntuacion[]> {
    return this.http.get<Puntuacion[]>(this.apiUrl);
  }
}
