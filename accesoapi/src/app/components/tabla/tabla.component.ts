import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Persona } from '../../interfaces/persona';
import { PersonasService } from '../../services/personas.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'dialog',
  templateUrl: './dialog.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<Persona>(MAT_DIALOG_DATA);
  readonly persona = model(this.data);
  readonly nombrePersona = model(this.data.nombre);
  readonly apellidosPersona = model(this.data.apellidos);
  readonly direccionPersona = model(this.data.direccion);
  readonly fotoPersona = model(this.data.foto);
  readonly telefonoPersona = model(this.data.telefono);
  readonly fechaNacimientoPersona = model(this.data.fechaNacimiento);
  readonly idDepartamentoPersona = model(this.data.idDepartamento);

  get getPersona() {
    const formattedDate = new Date(this.fechaNacimientoPersona());
    return {
      nombre: this.nombrePersona(),
      apellidos: this.apellidosPersona(),
      direccion: this.direccionPersona(),
      foto: this.fotoPersona(),
      telefono: this.telefonoPersona(),
      fechaNacimiento: formattedDate,
      idDepartamento: this.idDepartamentoPersona(),
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-tabla',
  // imports: [RouterOutlet, RouterLink, RouterLinkActive],
  imports: [NgFor, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss'
})
export class TablaComponent {
  listadoPersonas: Persona[];

  constructor(private personasServicio: PersonasService) { }

  ngOnInit(): void {

    this.obtenerPersonas();

  }

  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: this.name(), animal: this.animal() },
    });
  
    dialogRef.afterClosed().subscribe((persona: Persona | undefined) => {
      console.log('The dialog was closed');
      if (persona) {
        this.addPersona(persona);
      }
    });
  }
  

  async obtenerPersonas() {
    this.personasServicio.getPersonas().subscribe({

      next: (response) => {

        this.listadoPersonas = response;

      },

      error: (error) => {

        alert("Ha ocurrido un error al obtener los datos del servidor " + error);
      
      }

    });
  }

  async addPersona(persona: Persona) {
    this.personasServicio.createPersona(persona).subscribe({
      next: (response) => {
        alert("Persona añadida");
        this.obtenerPersonas();
      },
      error: (error) => {
        alert("Ha ocurrido un error al agregar la persona");
        console.error(error);
      }
    });
  }
}
