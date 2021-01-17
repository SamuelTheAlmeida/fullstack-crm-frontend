import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-modal-selecionar-produto',
  templateUrl: './modal-selecionar-produto.component.html',
  styleUrls: ['./modal-selecionar-produto.component.scss']
})
export class ModalSelecionarProdutoComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>([]);
  public semDados = false;
  public displayedColumns = ['selecao', 'id', 'nome', 'preco'];
  public elementosSelecionados = false;

  public searchFiltro: string;
  public tamanhoPagina = 5;
  public selecionadosAtuais = [] as string[];
  public selecionadosNovos = [] as any[];
  public filtroPesquisa: string;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private produtoService: ProdutoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<ModalSelecionarProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.selecionadosAtuais = data;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.buscar();
  }

  public filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.semDados = this.dataSource.filteredData.length === 0;
  }

  public selecionarTodos() {
    this.dataSource.data.forEach(d => d.selecionado = !this.elementosSelecionados);
    this.elementosSelecionados = !this.elementosSelecionados;
  }

  public concluir() {
    this.dialogRef.close(this.dataSource.data.filter(d => d.selecionado));
  }

  public cancelar() {
    this.dialogRef.close();
  }

  public buscar() {
    this.spinner.show('modal');

    this.produtoService
      .listar(this.filtroPesquisa)
      .then((res) => {
        res.dados = res.dados.filter(x => !this.selecionadosAtuais.includes(x.id));
        const dadosPreparados = [];
        for (const item of res.dados) {
          dadosPreparados.push({
            id: item.id,
            nome: item.nome,
            preco: item.preco,
            selecionado: (this.selecionadosAtuais.indexOf(item.id) >= 0) || (this.selecionadosNovos.indexOf((sel) => sel.id === item.id) >= 0)
          });
        }

        this.dataSource = new MatTableDataSource<any>(dadosPreparados);
        this.paginator.pageSize = this.tamanhoPagina;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource._updateChangeSubscription();
        this.semDados = this.dataSource.filteredData.length === 0;

      })
      .catch((err) => {
        this.toastr.error(err.mensagem.descricao, 'Atenção');
      })
      .finally(() => this.spinner.hide('modal'));
  }
}

