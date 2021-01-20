import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import localePt from '@angular/common/locales/pt';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErroComponent } from './pages/erro/erro.component';
import { InicialComponent } from './pages/inicial/inicial.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { UserDropdownMenuComponent } from './shared/layout/header/user-dropdown-menu/user-dropdown-menu.component';
import { MainComponent } from './shared/layout/main/main.component';
import { SidebarComponent } from './shared/layout/sidebar/sidebar.component';
import { getPtBrPaginatorIntl } from './core/helpers/ptbr-paginator-intl';
import { ProdutoListComponent } from './pages/produto/produto-list/produto-list.component';
import { ProdutoFormComponent } from './pages/produto/produto-form/produto-form.component';
import { UsuarioListComponent } from './pages/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './pages/usuario/usuario-form/usuario-form.component';
import { LoginComponent } from './pages/login/login.component';
import { JwtInterceptor } from './core/http/jwt.interceptor';
import { ErrorInterceptor } from './core/http/error.interceptor';
import { PedidoListComponent } from './pages/pedido/pedido-list/pedido-list.component';
import { PedidoFormComponent } from './pages/pedido/pedido-form/pedido-form.component';
import { ModalSelecionarProdutoComponent } from './pages/modal-selecionar-produto/modal-selecionar-produto.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CdkTableModule } from '@angular/cdk/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'; 
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { CadastroComponent } from './pages/cadastro/cadastro.component';


registerLocaleData(localePt, 'pt-BR');
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    InicialComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    UserDropdownMenuComponent,
    ErroComponent,
    ProdutoListComponent,
    ProdutoFormComponent,
    UsuarioListComponent,
    UsuarioFormComponent,
    LoginComponent,
    PedidoListComponent,
    PedidoFormComponent,
    ModalSelecionarProdutoComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      enableHtml: true
    }),
    NgbModule,
    RouterModule,
    ConfirmationPopoverModule.forRoot({
      appendToBody: true,
      confirmButtonType: 'danger',
    }),
    BsDatepickerModule.forRoot(),

    HttpClientModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSortModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,
    ModalModule.forRoot(),
    CdkTableModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: MatPaginatorIntl, useValue: getPtBrPaginatorIntl() },
    
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
