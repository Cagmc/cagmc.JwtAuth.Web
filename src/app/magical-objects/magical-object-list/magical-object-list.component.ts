import { Component, OnInit } from '@angular/core';
import {
  MagicalObjectListResponse,
  MagicalObjectService,
} from '../../core/services/magical-object.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatAnchor, MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { debounce } from 'lodash';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-magical-object-list',
  imports: [
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    DatePipe,
    MatAnchor,
    RouterLink,
    MatButton,
    MatPaginator,
    FormsModule,
    MatInput,
  ],
  templateUrl: './magical-object-list.component.html',
  styleUrl: './magical-object-list.component.scss',
})
export class MagicalObjectListComponent implements OnInit {
  searchTerm: string | null = null;
  listResponse: MagicalObjectListResponse | undefined;
  displayedColumns: string[] = [
    'id',
    'name',
    'elemental',
    'discovered',
    'actions',
  ];
  onSearch = debounce(() => {
    this.getFromServer();
  }, 300);

  constructor(private readonly service: MagicalObjectService) {}

  ngOnInit(): void {
    this.getFromServer();
  }

  getFromServer() {
    this.service.get(this.searchTerm, null, null, null).subscribe({
      next: (response) => {
        this.listResponse = response as MagicalObjectListResponse;
      },
      error: (error) => {
        console.error('Error fetching magical object list:', error);
      },
    });
  }

  onDelete(id: number) {
    this.service.delete(id).subscribe({
      next: (response) => {
        console.log('Delete magical object successful', response);
        this.ngOnInit();
      },
      error: (error) => {
        console.log('Delete magical object failed', error);
      },
    });
  }
}
