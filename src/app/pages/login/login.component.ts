import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { first } from "rxjs/operators";
import { IBaseModel } from "src/app/models/base.model";
import { IUsuarioModel } from "src/app/models/usuario.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-login-form',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent implements OnInit {
    public model: IUsuarioModel = {} as IUsuarioModel;
    public returnUrl: string;

    public form = new FormGroup({
        email: new FormControl('', Validators.required),
        senha: new FormControl('', Validators.required),
        //perfil: new FormControl('', Validators.required),
     });
  
    constructor(
      private route: ActivatedRoute,
      private toastr: ToastrService,
      private spinner: NgxSpinnerService,
      private router: Router,
      private authService: AuthService
    ) {  

    }
  
    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
  
    public async onSubmit() {
        if (this.form.invalid) {
            this.toastr.warning('Formulário inválido!', 'Atenção');
            return;
        }
        this.atualizarModel(this.form.value);
        this.spinner.show();
        this.authService.login(this.model.email, this.model.senha)
        .pipe(first())
        .subscribe(
            _data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                console.log(error);
                this.toastr.error(error.error.message, 'Atenção');
                this.spinner.hide();
            });
    }

    private atualizarModel(values: any) {
        Object.assign(this.model, values);
    }
  
  }