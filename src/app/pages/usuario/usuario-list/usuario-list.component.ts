import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IUsuarioModel } from "src/app/models/usuario.model";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
    selector: 'app-usuario-list',
    templateUrl: './usuario-list.component.html',
    styleUrls: ['./usuario-list.component.scss']
})

export class UsuarioListComponent implements OnInit {
    private tamanhoPagina = 10;
    public pesquisaNome: string; 
    public dataSource = new MatTableDataSource<IUsuarioModel>([]);
    public modelSelecionada: any;
    public semDados = true;
    public colunasExibicao: string[] = [
        'id',
        'email',
        'perfil'
      ];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


    constructor(
        private usuarioService: UsuarioService,
        private toastr: ToastrService,
        private router: Router) {

    }
    
    ngOnInit(): void {
        this.obter();
    }

    public obter() {
        this.usuarioService
        .listar()
        .then((res) => {
            this.dataSource = new MatTableDataSource<IUsuarioModel>(res.dados);
            this.paginator.pageSize = this.tamanhoPagina;
            this.dataSource.paginator = this.paginator;
            this.semDados = res.dados.length === 0;
        })
        .catch((err) => {
            this.toastr.error(err.mensagem.descricao, 'Atenção');
        })
    }

    public novo() {
        this.router.navigate(['/usuario/novo']);
    }

    public selecionar(item: any) {
        this.modelSelecionada = !this.modelSelecionada || this.modelSelecionada !== item ? item : null;
    }

    public editar(id: string) {
        this.router.navigate([`/usuario/id/${id}`]);
    }

    public excluir(id: string) {
        this.usuarioService
          .excluir(id)
          .then((res) => {
            if (res.sucesso) {
              this.toastr.success('Usuário excluído com sucesso!', 'Sucesso');
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