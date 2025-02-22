import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounce } from 'lodash';
import {
  MatFormField,
  MatHint,
  MatInput,
  MatLabel,
  MatSuffix,
} from '@angular/material/input';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import {
  MatDatepicker,
  MatDatepickerActions,
  MatDatepickerApply,
  MatDatepickerCancel,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../../core/formats/date.formats';

@Component({
  selector: 'app-magical-object-list',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
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
    MatSort,
    MatSortHeader,
    MatFormField,
    MatLabel,
    MatDatepicker,
    MatDatepickerActions,
    MatDatepickerApply,
    MatDatepickerCancel,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatHint,
    MatSuffix,
    ReactiveFormsModule,
  ],
  templateUrl: './magical-object-list.component.html',
  styleUrl: './magical-object-list.component.scss',
})
export class MagicalObjectListComponent implements OnInit {
  searchTerm: string | null = null;
  pageIndex: number = 0;
  pageSize: number = 10;
  sort: string | null = null;
  discoveredFrom: Date | null = null;
  discoveredTo: Date | null = null;
  elemental: string | null = null;

  listResponse: MagicalObjectListResponse | undefined;
  displayedColumns: string[] = [
    'id',
    'name',
    'elemental',
    'discovered',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly service: MagicalObjectService) {}

  ngOnInit(): void {
    this.getFromServer();
  }

  onSearch = debounce(() => {
    this.pageIndex = 0;
    this.getFromServer();
  }, 300);

  onResetFilters() {
    this.searchTerm = null;
    this.discoveredFrom = null;
    this.discoveredTo = null;
    this.elemental = null;
    this.pageIndex = 0;
    this.getFromServer();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getFromServer();
  }

  getFromServer() {
    this.service
      .get(
        this.searchTerm,
        this.pageIndex,
        this.pageSize,
        this.sort,
        this.discoveredFrom,
        this.discoveredTo,
        null,
      )
      .subscribe({
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

  sortData($event: Sort) {
    if ($event.direction !== '') {
      const column =
        $event.active.charAt(0).toUpperCase() + $event.active.slice(1);
      this.sort = `${column}<>${$event.direction}`;
    } else {
      this.sort = null;
    }
    this.getFromServer();
  }
}
