import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IPedidoModel } from "src/app/models/pedido.model";
import { PedidoService } from "src/app/services/pedido.service";

@Component({
    selector: 'app-pedido-list',
    templateUrl: './pedido-list.component.html',
    styleUrls: ['./pedido-list.component.scss']
})

export class PedidoListComponent implements OnInit {
    private tamanhoPagina = 10;
    public pesquisaNome: string; 
    public dataSource = new MatTableDataSource<IPedidoModel>([]);
    public modelSelecionada: any;
    public semDados = true;
    public colunasExibicao: string[] = [
        'id',
        'emailComprador',
        'valor'
      ];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


    constructor(
        private pedidoService: PedidoService,
        private toastr: ToastrService,
        private router: Router) {

    }
    
    ngOnInit(): void {
        this.obter();
    }

    public obter() {
        this.pedidoService
        .listar(this.pesquisaNome)
        .then((res) => {
            this.dataSource = new MatTableDataSource<IPedidoModel>(res.dados);
            this.paginator.pageSize = this.tamanhoPagina;
            this.dataSource.paginator = this.paginator;
            this.semDados = res.dados.length === 0;
        })
        .catch((err) => {
            alert('abcde');
            debugger
            this.toastr.error(err.mensagem.descricao, 'Atenção');
        })
    }

    public novo() {
        this.router.navigate(['/pedidos/novo']);
    }

    public selecionar(item: any) {
        this.modelSelecionada = !this.modelSelecionada || this.modelSelecionada !== item ? item : null;
    }

    public editar(id: string) {
        this.router.navigate([`/pedidos/id/${id}`]);
    }

    
    public excluir(id: string) {
        this.pedidoService
          .excluir(id)
          .then((res) => {
            if (res.sucesso) {
              this.toastr.success('Produto excluído com sucesso!', 'Sucesso');
            } else {
              res.mensagens.forEach(mensagem => {
                this.toastr.warning(mensagem.descricao, 'Atenção');
              });
            }
          })
          .catch((err) => {
            this.toastr.error(err.mensagem.descricao, 'Atenção');
          })
          .finally(() => {
            this.obter();
          });
    }

}