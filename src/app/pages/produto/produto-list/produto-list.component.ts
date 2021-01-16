import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IProdutoModel } from "src/app/models/produto.model";
import { ProdutoService } from "src/app/services/produto.service";

@Component({
    selector: 'app-produto-list',
    templateUrl: './produto-list.component.html',
    styleUrls: ['./produto-list.component.scss']
})

export class ProdutoListComponent implements OnInit {
    private tamanhoPagina = 10;
    public pesquisaNome: string; 
    public dataSource = new MatTableDataSource<IProdutoModel>([]);
    public modelSelecionada: any;
    public semDados = true;
    public colunasExibicao: string[] = [
        'id',
        'nome',
        'preco'
      ];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


    constructor(
        private produtoService: ProdutoService,
        private toastr: ToastrService,
        private router: Router) {

    }
    
    ngOnInit(): void {
        this.obter();
    }

    public obter() {
        this.produtoService
        .listar(this.pesquisaNome)
        .then((res) => {
            this.dataSource = new MatTableDataSource<IProdutoModel>(res.dados);
            this.paginator.pageSize = this.tamanhoPagina;
            this.dataSource.paginator = this.paginator;
            this.semDados = res.dados.length === 0;
        })
        .catch((err) => {
            this.toastr.error(err.mensagem.descricao, 'Atenção');
        })
    }

    public novo() {
        this.router.navigate(['/produtos/novo']);
    }

    public selecionar(item: any) {
        this.modelSelecionada = !this.modelSelecionada || this.modelSelecionada !== item ? item : null;
    }

    public editar(id: string) {
        this.router.navigate([`/produtos/id/${id}`]);
    }

}