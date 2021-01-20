import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUsuarioModel } from "../models/usuario.model";
import { Md5 } from 'ts-md5/dist/md5';

import { BaseService } from './base.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
    private currentUserSubject: BehaviorSubject<IUsuarioModel>;
    public currentUser: Observable<IUsuarioModel>;

    constructor(public httpClient: HttpClient, private router: Router) {
        super(httpClient);
        try {
            this.currentUserSubject = new BehaviorSubject<IUsuarioModel>(JSON.parse(localStorage.getItem('currentUser')));
            this.currentUser = this.currentUserSubject.asObservable();
        } catch {
            this.logout();
        }

    }

    public get currentUserValue(): IUsuarioModel {
        return this.currentUserSubject.value;
    }

    public login(email: string, senha: string) {
        senha = Md5.hashStr(senha).toString().toUpperCase();
        return this.httpClient.post<any>(`${this.apiBaseUrl}/usuario/login`, { email, senha })
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user.dados));
                this.currentUserSubject.next(user.dados);
                return user;
            }));
    }

    public logout() {
        localStorage.removeItem('currentUser');
        if (this.currentUserSubject) {
            this.currentUserSubject.next(null);
        }
        
        this.router.navigate(['/login']);
    }
}