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
  ],
  templateUrl: './magical-object-list.component.html',
  styleUrl: './magical-object-list.component.scss',
})
export class MagicalObjectListComponent implements OnInit {
  listResponse: MagicalObjectListResponse | undefined;
  displayedColumns: string[] = [
    'id',
    'name',
    'elemental',
    'discovered',
    'actions',
  ];

  constructor(private readonly service: MagicalObjectService) {}

  ngOnInit(): void {
    this.service.get(null, null, null, null).subscribe({
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
