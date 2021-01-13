import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ErroComponent } from './pages/erro/erro.component';
import { InicialComponent } from './pages/inicial/inicial.component';
import { MainComponent } from './shared/layout/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    //canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: InicialComponent,
      },
    ],
  },
  {
    path: 'erro/:id',
    component: ErroComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
