import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { EditarPokemonComponent } from './components/editar-pokemon/editar-pokemon.component';
import { CrearPokemonComponent } from './components/crear-pokemon/crear-pokemon.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'by/:code',
        component: DetailsPageComponent
      },
      {
        path: 'editar/:code',
        component: EditarPokemonComponent
      },
      {
        path: 'crear',
        component: CrearPokemonComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
