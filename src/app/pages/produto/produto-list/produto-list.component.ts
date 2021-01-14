import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { IProdutoModel } from "src/app/models/produto.model";
import { ProdutoService } from "src/app/services/produto.service";

@Component({
    selector: 'app-produto-list',
    templateUrl: './produto-list.component.html',
    styleUrls: ['./produto-list.component.scss']
})

export class ProdutoListComponent implements OnInit {
    public pesquisaNome: string; 
    public dataSource = new MatTableDataSource<IProdutoModel>([]);
    public modelSelecionada: any;
    public colunasExibicao: string[] = [
        'id',
        'nome',
        'preco',
        'bloqueado',
      ];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


    constructor(private produtoService: ProdutoService,
        private toastr: ToastrService) {

    }
    
    ngOnInit(): void {
        this.obter();
    }

    public obter() {
        this.produtoService
        .obter(this.pesquisaNome)
        .then((res) => {
            this.dataSource = new MatTableDataSource<IProdutoModel>(res.dados);
        })
        .catch((err) => {
            this.toastr.error(err.mensagem.descricao, 'Atenção');
        })
    }

}