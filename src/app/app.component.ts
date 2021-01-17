import { Component, OnInit } from '@angular/core';
import { IUsuarioModel } from './models/usuario.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'fullstack-crm-app';
  public currentUser: IUsuarioModel;

  constructor(private authService: AuthService) { 
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {

  }
}
