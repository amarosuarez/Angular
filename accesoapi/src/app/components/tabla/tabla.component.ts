import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Persona } from '../../interfaces/persona';
import { PersonasService } from '../../services/personas.service';

@Component({
  selector: 'app-tabla',
  // imports: [RouterOutlet, RouterLink, RouterLinkActive],
  imports: [NgFor, CommonModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss'
})
export class TablaComponent {
  listadoPersonas: Persona[];

  constructor(private personasServicio: PersonasService) { }

  ngOnInit(): void {

    this.obtenerPersonas();

  }

  async obtenerPersonas() {
    this.personasServicio.getPersonas().subscribe({

      next: (response) => {

        this.listadoPersonas = response;

      },

      error: (error) => {

        alert("Ha ocurrido un error al obtener los datos del servidor");
      
      }

    });
  }
}
