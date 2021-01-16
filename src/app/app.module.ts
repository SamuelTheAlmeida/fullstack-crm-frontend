import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import localePt from '@angular/common/locales/pt';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/http/auth.interceptor';
import { ErroComponent } from './pages/erro/erro.component';
import { InicialComponent } from './pages/inicial/inicial.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { UserDropdownMenuComponent } from './shared/layout/header/user-dropdown-menu/user-dropdown-menu.component';
import { MainComponent } from './shared/layout/main/main.component';
import { SidebarComponent } from './shared/layout/sidebar/sidebar.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { getPtBrPaginatorIntl } from './core/helpers/ptbr-paginator-intl';
import { ProdutoListComponent } from './pages/produto/produto-list/produto-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProdutoFormComponent } from './pages/produto/produto-form/produto-form.component';


registerLocaleData(localePt, 'pt-BR');

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
    ProdutoFormComponent
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
    NgxSpinnerModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: MatPaginatorIntl, useValue: getPtBrPaginatorIntl() },
    
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
