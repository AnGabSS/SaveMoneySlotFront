import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-pageable',
  imports: [PaginatorModule, FormsModule, SelectModule],
  templateUrl: './pageable.html',
  styleUrls: ['./pageable.scss'],
})
export class Pageable {
  @Input() page: number = 1;
  @Input() size: number = 10;
  @Input() totalRecords: number = 0;
  options: any[] = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '40', value: 40 },
    { label: '50', value: 50 },
  ];

  onPageChange(event: any) {
    this.page = event.page;
  }
}
