import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { first } from "rxjs/operators";
import { IBaseModel } from "src/app/models/base.model";
import { IEnumModel } from "src/app/models/enum.model";
import { IUsuarioModel } from "src/app/models/usuario.model";
import { AuthService } from "src/app/services/auth.service";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
    selector: 'app-cadastro-form',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.scss']
  })
  export class CadastroComponent implements OnInit {
    public model: IUsuarioModel = {} as IUsuarioModel;
    public senhasNaoConferem = false;
    public perfilSelecionado = 1;
    public listaPerfis: IEnumModel[];

    public form = new FormGroup({
        email: new FormControl('', Validators.required),
        senha: new FormControl('', Validators.required),
        confirmarSenha: new FormControl('', Validators.required),
        perfilId: new FormControl('', Validators.required)
      });
  
    constructor(
      private route: ActivatedRoute,
      private toastr: ToastrService,
      private router: Router,
      private authService: AuthService,
      private usuarioService: UsuarioService
    ) {  

    }
  
    ngOnInit() {
        this.obterDados();
    }

    public obterDados() {
        try {
            this.usuarioService
            .listarPerfis()
            .then((res) => {
              this.listaPerfis = res.dados;
            });

          } catch (err) {
            this.toastr.error(err.mensagem.descricao, 'Atenção');
            this.router.navigate(['/usuario']);
          }
    }
  
    public async onSubmit() {
        if (!this.senhasConferem()) {
            this.toastr.error('As senhas não conferem', 'Atenção');
            return;
        }
        
        if (this.form.invalid) {
            this.toastr.warning('Formulário inválido!', 'Atenção');
            return;
        }
    
        this.atualizarModel(this.form.value);
        try {
            let res: IBaseModel<IUsuarioModel> = null;
    
            res = await this.usuarioService.inserir(this.model);
    
            if (res.sucesso) {
            this.toastr.success('Registro salvo com sucesso! Realize o login', 'Sucesso');
            this.router.navigate(['/login']);
            } else {
            res.mensagens.forEach(mensagem => {
                this.toastr.warning(mensagem.descricao, 'Atenção');
            });
            }
        } catch (err) {
            this.toastr.error(err, 'Atenção');
        }
    }

    private atualizarModel(values: any) {
        Object.assign(this.model, values);
    }

    private senhasConferem() : boolean {
        const senha = this.form.controls['senha'].value;
        const confirmarSenha = this.form.controls['confirmarSenha'].value;
        return (senha === confirmarSenha);
    }
    
    public onBack() {
        this.router.navigate(['/usuario']);
    }
  
  }