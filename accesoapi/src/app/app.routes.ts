import { Routes } from '@angular/router';
import { TablaComponent } from './components/tabla/tabla.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: TablaComponent},
];
