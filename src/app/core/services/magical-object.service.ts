import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ElementalType } from '../enums/elemental-type.enum';

@Injectable({ providedIn: 'root' })
export class MagicalObjectService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  public get(filter: MagicalObjectListFilter) {
    let queryFilter: string | null = null;

    if (filter.nameFilter !== null && filter.nameFilter.length > 0) {
      queryFilter = `nameFilter=${filter.nameFilter}`;
    }

    queryFilter = this.appendFilter(
      queryFilter,
      'discoveredFrom',
      filter.discoveredFrom,
    );
    queryFilter = this.appendFilter(
      queryFilter,
      'discoveredTo',
      filter.discoveredTo,
    );
    queryFilter = this.appendFilter(queryFilter, 'pageIndex', filter.pageIndex);
    queryFilter = this.appendFilter(queryFilter, 'pageSize', filter.pageSize);
    queryFilter = this.appendFilter(
      queryFilter,
      'sortByColumn',
      filter.sortByColumn,
    );
    queryFilter = this.appendFilter(
      queryFilter,
      'isAscending',
      filter.isAscending,
    );

    let elementalQueryFilter: string | null = null;

    if (
      filter.elementalFilterSet !== null &&
      filter.elementalFilterSet.length > 0
    ) {
      elementalQueryFilter = filter.elementalFilterSet.join(
        '&elementalFilterSet=',
      );
      queryFilter =
        queryFilter === null
          ? `elementalFilterSet=${elementalQueryFilter}`
          : `${queryFilter}&elementalFilterSet=${elementalQueryFilter}`;
    }

    return this.http.get(`${this.baseUrl}/api/magical-objects?${queryFilter}`);
  }

  public getById(id: number) {
    return this.http.get(`${this.baseUrl}/api/magical-objects/${id}`);
  }

  public create(request: CreateMagicalObjectRequest) {
    return this.http.post(`${this.baseUrl}/api/magical-objects`, request);
  }

  public update(id: number, request: UpdateMagicalObjectRequest) {
    return this.http.put(`${this.baseUrl}/api/magical-objects/${id}`, request);
  }

  public delete(id: number) {
    return this.http.delete(`${this.baseUrl}/api/magical-objects/${id}`);
  }

  private appendFilter(
    filter: string | null,
    filterName: string,
    value: string | number | Date | boolean | null,
  ) {
    if (value !== null) {
      filter =
        filter === null
          ? `${filterName}=${value}`
          : `${filter}&${filterName}=${value}`;
    }

    return filter;
  }
}

export interface MagicalObjectListFilter {
  nameFilter: string | null;
  discoveredFrom: Date | null;
  discoveredTo: Date | null;
  elementalFilterSet: ElementalType[] | null;
  pageIndex: number | null;
  pageSize: number | null;
  sortByColumn: string;
  isAscending: boolean;
}

export interface MagicalObjectListResponse {
  items: MagicalObjectItemViewModel[];
  total: number;
}

export interface MagicalObjectItemViewModel {
  id: number;
  name: string;
  elemental: ElementalType;
  discovered: Date;
}

export interface MagicalObjectViewModel {
  id: number;
  name: string;
  description: string | null;
  elemental: ElementalType;
  discovered: Date;

  properties: MagicalPropertyViewModel[];
}

export interface MagicalPropertyViewModel {
  name: string;
  value: string;
}

export interface CreateMagicalObjectRequest {
  name: string;
  description: string | null;
  elemental: ElementalType;
  discovered: Date;

  properties: CreateMagicalPropertyRequest[];
}

export interface CreateMagicalPropertyRequest {
  name: string;
  value: string;
}

export interface UpdateMagicalObjectRequest {
  name: string;
  description: string | null;
  elemental: ElementalType;
  discovered: Date;

  properties: UpdateMagicalPropertyRequest[];
}

export interface UpdateMagicalPropertyRequest {
  name: string;
  value: string;
}
