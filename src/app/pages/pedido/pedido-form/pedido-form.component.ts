import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { IBaseModel } from "src/app/models/base.model";
import { IPedidoModel } from "src/app/models/pedido.model";
import { IProdutoPedidoModel } from "src/app/models/produto-pedido.model";
import { IProdutoModel } from "src/app/models/produto.model";
import { PedidoService } from "src/app/services/pedido.service";
import { BaseFormComponent } from "src/app/shared/components/base-form/base-form.component";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalSelecionarProdutoComponent } from "../../modal-selecionar-produto/modal-selecionar-produto.component";
import { isObject } from "ngx-bootstrap/chronos/utils/type-checks";


@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent extends BaseFormComponent implements OnInit {
  public model: IPedidoModel = {} as IPedidoModel;
  public produtosPedidoDataSource = new MatTableDataSource<IProdutoPedidoModel>([]);
  public produtosPedidoSemDados = true;

  public form = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    emailComprador: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
  });

  constructor(
    route: ActivatedRoute,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    public router: Router,
    public localeService: BsLocaleService,
    private pedidoService: PedidoService,
    public matDialog: MatDialog
  ) {
    super(route, toastr, spinner, router, localeService);

    if (this.novoRegistro) {
      this.titulo = 'Novo Pedido';
    } else {
      this.titulo = 'Editar Pedido';
    }
  }

  ngOnInit() {
    this.obterDados();
  }

  public async obterDados() {
    this.spinner.show();
    try {
      if (!this.novoRegistro) {
        const res = await this.pedidoService.obterPorId(this.id);
        console.log(res.dados);
        if (res.sucesso) {
          this.model = res.dados;
          this.produtosPedidoDataSource = new MatTableDataSource<IProdutoPedidoModel>(this.model.produtosPedido);
          this.produtosPedidoDataSource._updateChangeSubscription();
          this.produtosPedidoSemDados = this.produtosPedidoDataSource.filteredData.length === 0;
          this.atualizarTotalPedido();
        } else {
          this.toastr.error(res.mensagem.descricao, 'Atenção');
          this.router.navigate(['/pedidos']);
          return;
        }
      }
      this.form.patchValue(this.model);
    } catch (err) {
      this.toastr.error(err.mensagem.descricao, 'Atenção');
      this.router.navigate(['/pedidos']);
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
      let res: IBaseModel<IPedidoModel> = null;

      if (!this.novoRegistro) {
        res = await this.pedidoService.atualizar(this.model);
      } else {
        console.log(this.model);
        res = await this.pedidoService.inserir(this.model);
      }

      if (res.sucesso) {
        this.toastr.success('Registro salvo com sucesso!', 'Sucesso');
        this.router.navigate(['/pedidos']);
      } else {
        this.toastr.warning(res.mensagem.descricao);
      }
    } catch (err) {
      this.toastr.error(err.mensagem.descricao, 'Atenção');
    } finally {
      this.spinner.hide();
    }
  }

  public onBack() {
    this.router.navigate(['/pedidos']);
  }

  public cancelar() {
    
  }

  private atualizarModel(values: any) {
    Object.assign(this.model, values);
  }

  public async exibirModalProdutosPedido() {
    try {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.id = 'modal-component';
        dialogConfig.width = '650px';
        dialogConfig.hasBackdrop = true;
        dialogConfig.disableClose = true;
        dialogConfig.data = this.model.produtosPedido ? this.model.produtosPedido.map((p) => p.produtoId) : [];
  
        const modal = this.matDialog.open(ModalSelecionarProdutoComponent, dialogConfig);
        modal.afterClosed().subscribe(data => {
          if (data) {  
            if (Array.isArray(data)) {
                this.model.produtosPedido = this.model.produtosPedido || [];
                let produtoSelecionado = [] as IProdutoPedidoModel[];
                produtoSelecionado = data.map(d => ({ 
                    produtoId: d.id, 
                    pedidoId: undefined,  
                    quantidade: 1, 
                    precoUnitario: parseFloat(d.preco.replaceAll(',', '.')), 
                    precoTotal: parseFloat(d.preco.replaceAll(',', '.')),
                    nome: d.nome 
                } as IProdutoPedidoModel));
                produtoSelecionado.forEach(x => this.model.produtosPedido.push(x));
            }
            
            this.produtosPedidoDataSource = new MatTableDataSource<IProdutoPedidoModel>(this.model.produtosPedido);
            this.produtosPedidoDataSource._updateChangeSubscription();
            this.produtosPedidoSemDados = this.produtosPedidoDataSource.filteredData.length === 0;
            this.atualizarTotalPedido();
          }
        });
  
      } catch (err) {
        this.toastr.error(err.mensagem.descricao, 'Atenção');
      }
  }

  public reduzirQuantidade(ind: number) {
    let item = this.model.produtosPedido[ind];
    item.quantidade--;
    item.precoTotal = item.precoUnitario * item.quantidade;
    this.atualizarTotalPedido();
  }

  public aumentarQuantidade(ind: number) {
    let item = this.model.produtosPedido[ind];
    item.quantidade++;
    item.precoTotal = item.precoUnitario * item.quantidade;
    this.atualizarTotalPedido();
  }

  public excluirProduto(ind: number) {
    this.model.produtosPedido.splice(ind, 1);
    this.produtosPedidoDataSource._updateChangeSubscription();
    this.produtosPedidoSemDados = this.produtosPedidoDataSource.filteredData.length === 0;
    this.atualizarTotalPedido();
  }

  public atualizarTotalPedido() {
      this.model.valor = this.model.produtosPedido.map(x => x.precoTotal).reduce((a,b) => a+b,0);
      this.form.patchValue(this.model);
      console.log(this.form['valor']);
  }

}
