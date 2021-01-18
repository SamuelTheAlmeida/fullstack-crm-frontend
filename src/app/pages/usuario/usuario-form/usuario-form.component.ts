import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { IBaseModel } from "src/app/models/base.model";
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

  public form = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    email: new FormControl('', Validators.required),
    //perfil: new FormControl('', Validators.required),
  });

  constructor(
    route: ActivatedRoute,
    toastr: ToastrService,
    spinner: NgxSpinnerService,
    router: Router,
    localeService: BsLocaleService,
    private usuarioService: UsuarioService,
  ) {
    super(route, toastr, spinner, router, localeService);

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
    this.spinner.show();
    try {
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
    } finally {
      this.spinner.hide();
    }
  }

  public async onSubmit() {
    if (this.form.invalid) {
      this.toastr.warning('Formulário inválido!', 'Atenção');
      return;
    }

    this.spinner.show();
    this.atualizarModel(this.form.value);
    try {
      let res: IBaseModel<IUsuarioModel> = null;

      if (!this.novoRegistro) {
        res = await this.usuarioService.atualizar(this.model);
      } else {
        console.log(this.model);
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
      this.toastr.error(err.mensagem.descricao, 'Atenção');
    } finally {
      this.spinner.hide();
    }
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
