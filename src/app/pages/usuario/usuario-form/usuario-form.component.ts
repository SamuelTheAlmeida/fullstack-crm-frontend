import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { ToastrService } from "ngx-toastr";
import { IBaseModel } from "src/app/models/base.model";
import { IEnumModel } from "src/app/models/enum.model";
import { IUsuarioModel } from "src/app/models/usuario.model";
import { UsuarioService } from "src/app/services/usuario.service";
import { BaseFormComponent } from "src/app/shared/components/base-form/base-form.component";

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent extends BaseFormComponent implements OnInit {
  public model: IUsuarioModel = {} as IUsuarioModel;
  public senhasNaoConferem = false;
  public perfilSelecionado = 1;
  public listaPerfis: IEnumModel[];

  public form = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
    confirmarSenha: new FormControl('', Validators.required),
    perfilId: new FormControl('', Validators.required)
  });

  constructor(
    route: ActivatedRoute,
    toastr: ToastrService,
    router: Router,
    localeService: BsLocaleService,
    private usuarioService: UsuarioService,
  ) {
    super(route, toastr, router, localeService);

    if (this.novoRegistro) {
      this.titulo = 'Novo Usuário';
    } else {
      this.titulo = 'Editar Usuário';
    }
  }

  ngOnInit() {
    this.obterDados();
  }

  public async obterDados() {
    try {
      this.usuarioService
      .listarPerfis()
      .then((res) => {
        this.listaPerfis = res.dados;
      });
      if (!this.novoRegistro) {
        const res = await this.usuarioService.obterPorId(this.id);
        if (res.sucesso) {
          this.model = res.dados;
        } else {
          res.mensagens.forEach(mensagem => {
            this.toastr.warning(mensagem.descricao, 'Atenção');
          });
          this.router.navigate(['/usuario']);
          return;
        }
      }
      this.form.patchValue(this.model);
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

      if (!this.novoRegistro) {
        res = await this.usuarioService.atualizar(this.model);
      } else {
        res = await this.usuarioService.inserir(this.model);
      }

      if (res.sucesso) {
        this.toastr.success('Registro salvo com sucesso!', 'Sucesso');
        this.router.navigate(['/usuario']);
      } else {
          res.mensagens.forEach(mensagem => {
            this.toastr.warning(mensagem.descricao, 'Atenção');
          });
        }
    } catch (err) {
      this.toastr.error(err, 'Atenção');
    }
  }

  private senhasConferem() : boolean {
    const senha = this.form.controls['senha'].value;
    const confirmarSenha = this.form.controls['confirmarSenha'].value;
    return (senha === confirmarSenha);
  }

  public onBack() {
    this.router.navigate(['/usuario']);
  }

  public cancelar() {
    
  }

  private atualizarModel(values: any) {
    Object.assign(this.model, values);
  }

}
