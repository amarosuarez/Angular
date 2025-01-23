import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablapersonas',
  imports: [],
  templateUrl: './tablapersonas.component.html',
  styleUrl: './tablapersonas.component.css'
})
export class TablapersonasComponent {
  constructor(private router: Router) {}
  btnClick(): any {
    this.router.navigateByUrl('/home');
  }
}
