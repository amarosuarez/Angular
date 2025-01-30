import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../interfaces/persona';



@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  /*URL de mi aPI para usar en todo el Servicio*/
  urlWebAPI='https://sgemp.azurewebsites.net/api/persona';

  constructor() { }
  http=inject(HttpClient);

  getPersonas(): Observable<Persona[]>{
    return this.http.get<Persona[]>(this.urlWebAPI);
  }

  createPersona(persona: Persona) {
    return this.http.post<Persona>(this.urlWebAPI, persona);
  }

  getPersonaById(id: number) {
    return this.http.get<Persona>(`${this.urlWebAPI}/${id}`);
  }
}
