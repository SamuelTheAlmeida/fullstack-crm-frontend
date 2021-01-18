import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-base-form',
  template: ``,
})
export class BaseFormComponent {
  public id: any;
  public novoRegistro = true;
  public titulo: string;

  constructor(
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public router: Router,
    public localeService: BsLocaleService
  ) {
    this.localeService.use('pt-br');

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this.novoRegistro = false;
    }
  }
}
