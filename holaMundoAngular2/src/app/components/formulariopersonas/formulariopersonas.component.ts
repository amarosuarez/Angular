import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-formulariopersonas',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, NgIf],
  templateUrl: './formulariopersonas.component.html',
  styleUrl: './formulariopersonas.component.css'
})

export class FormulariopersonasComponent implements OnInit {
  formulario: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.formulario = new FormGroup(
      {
        nombre: new FormControl('', [Validators.required]),
        apellidos: new FormControl('', [Validators.required])
      }
    );
  }

  saluda() {
    if (this.formulario.valid) {
      alert('Hola ' + this.formulario.controls.nombre.value + ' ' + this.formulario.controls.apellidos.value);
    } else {
      alert('Rellena los campos jefe')
    }
  }
}
