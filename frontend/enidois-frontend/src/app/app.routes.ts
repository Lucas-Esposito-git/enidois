import { Routes } from '@angular/router';
import { TelaCadastro } from './telaCadastro/TelaCadastro';
import { TelaLista } from './telaLista/TelaLista';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'assistidos',
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    component: TelaCadastro
  },
  {
    path: 'assistidos',
    component: TelaLista
  },
  {
    path: 'assistidos/editar/:id',
    component: TelaCadastro
  }
];