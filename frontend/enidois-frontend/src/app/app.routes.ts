import { Routes } from '@angular/router';
import { TelaCadastro } from './telaCadastro/TelaCadastro';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cadastro',
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    component: TelaCadastro
  }
];