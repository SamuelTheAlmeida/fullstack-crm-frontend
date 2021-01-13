import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.scss']
})
export class ErroComponent implements OnInit {
  public titulo: string;
  public descricao: string;

  constructor(private route: ActivatedRoute) {
    const codErro = this.route.snapshot.paramMap.get('id');
    switch (codErro) {
      case '403':
        this.titulo = '403-Acesso Negado';
        this.descricao = 'Você não possui acesso a essa aplicação';
        break;

      default:
        this.titulo = '500-Erro Interno';
        this.descricao = 'Ocorreu um erro interno. Tente novamente mais tarde.';
        break;
    }
  }

  ngOnInit(): void {
  }

}
