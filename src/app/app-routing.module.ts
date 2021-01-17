import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ErroComponent } from './pages/erro/erro.component';
import { InicialComponent } from './pages/inicial/inicial.component';
import { LoginComponent } from './pages/login/login.component';
import { ProdutoFormComponent } from './pages/produto/produto-form/produto-form.component';
import { ProdutoListComponent } from './pages/produto/produto-list/produto-list.component';
import { UsuarioFormComponent } from './pages/usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './pages/usuario/usuario-list/usuario-list.component';
import { MainComponent } from './shared/layout/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    //canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: InicialComponent, canActivate: [AuthGuard]
      },
      {
        path: 'produtos',
        component: ProdutoListComponent, canActivate: [AuthGuard]
      },
      {
        path: 'produtos/id/:id',
        component: ProdutoFormComponent, canActivate: [AuthGuard]
      },
      {
        path: 'produtos/novo',
        component: ProdutoFormComponent, canActivate: [AuthGuard]
      },
      {
        path: 'usuario',
        component: UsuarioListComponent, canActivate: [AuthGuard]
      },
      {
        path: 'usuario/id/:id',
        component: UsuarioFormComponent, canActivate: [AuthGuard]
      },
      {
        path: 'usuario/novo',
        component: UsuarioFormComponent, canActivate: [AuthGuard]
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
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
