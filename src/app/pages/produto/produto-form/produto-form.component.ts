import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { IBaseModel } from "src/app/models/base.model";
import { IProdutoModel } from "src/app/models/produto.model";
import { ProdutoService } from "src/app/services/produto.service";
import { BaseFormComponent } from "src/app/shared/components/base-form/base-form.component";

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent extends BaseFormComponent implements OnInit {
  public model: IProdutoModel = {} as IProdutoModel;

  public form = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    nome: new FormControl('', Validators.required),
    preco: new FormControl('', Validators.required),
  });

  constructor(
    route: ActivatedRoute,
    toastr: ToastrService,
    spinner: NgxSpinnerService,
    router: Router,
    localeService: BsLocaleService,
    private produtoService: ProdutoService,
  ) {
    super(route, toastr, spinner, router, localeService);

    if (this.novoRegistro) {
      this.titulo = 'Novo Produto';
    } else {
      this.titulo = 'Editar Produto';
    }
  }

  ngOnInit() {
    this.obterDados();
  }

  public async obterDados() {
    this.spinner.show();
    try {
      if (!this.novoRegistro) {
        const res = await this.produtoService.obterPorId(this.id);
        if (res.sucesso) {
          this.model = res.dados;
        } else {
          res.mensagens.forEach(mensagem => {
            this.toastr.warning(mensagem.descricao, 'Atenção');
          });
          this.router.navigate(['/produtos']);
          return;
        }
      }
      this.form.patchValue(this.model);
    } catch (err) {
      this.toastr.error(err.mensagem.descricao, 'Atenção');
      this.router.navigate(['/produtos']);
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
      let res: IBaseModel<IProdutoModel> = null;

      if (!this.novoRegistro) {
        res = await this.produtoService.atualizar(this.model);
      } else {
        res = await this.produtoService.inserir(this.model);
      }

      if (res.sucesso) {
        this.toastr.success('Registro salvo com sucesso!', 'Sucesso');
        this.router.navigate(['/produtos']);
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
    this.router.navigate(['/produtos']);
  }

  public cancelar() {
    
  }

  private atualizarModel(values: any) {
    Object.assign(this.model, values);
  }

}
