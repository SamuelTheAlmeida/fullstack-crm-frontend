import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ErroComponent } from './pages/erro/erro.component';
import { InicialComponent } from './pages/inicial/inicial.component';
import { ProdutoFormComponent } from './pages/produto/produto-form/produto-form.component';
import { ProdutoListComponent } from './pages/produto/produto-list/produto-list.component';
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
      {
        path: 'produtos',
        component: ProdutoListComponent,
      },
      {
        path: 'produtos/id/:id',
        component: ProdutoFormComponent,
      },
      {
        path: 'produtos/novo',
        component: ProdutoFormComponent,
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
