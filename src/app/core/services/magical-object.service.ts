import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ElementalType } from '../enums/elemental-type.enum';
import { Observable } from 'rxjs';

export interface IMagicalObjectService {
  get(filter: MagicalObjectListFilter): Observable<MagicalObjectListResponse>;

  getById(id: number): Observable<MagicalObjectViewModel>;

  create(request: CreateMagicalObjectRequest): Observable<object>;

  update(id: number, request: UpdateMagicalObjectRequest): Observable<object>;

  delete(id: number): Observable<object>;
}

@Injectable({ providedIn: 'root' })
export class MockMagicalObjectService implements IMagicalObjectService {
  entities: MagicalObject[] = [
    {
      id: 1,
      name: 'Sword of Fire',
      description: 'This is a sword of fire.',
      elemental: ElementalType.Fire,
      discovered: new Date(),
      properties: [
        {
          name: 'Flame Duration',
          value: '20 seconds',
        },
        {
          name: 'Damage',
          value: '100',
        },
      ],
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get(filter: MagicalObjectListFilter): Observable<MagicalObjectListResponse> {
    return new Observable<MagicalObjectListResponse>((observer) => {
      observer.next({
        items: this.entities.map((e) => ({
          id: e.id,
          name: e.name,
          elemental: e.elemental,
          discovered: e.discovered,
        })),
        total: this.entities.length,
      } as MagicalObjectListResponse);
    });
  }

  getById(id: number): Observable<MagicalObjectViewModel> {
    const entity = this.entities.find((e) => e.id === id);

    if (entity === undefined) {
      throw new Error(`Entity with id ${id} not found.`);
    }

    return new Observable<MagicalObjectViewModel>((observer) =>
      observer.next(entity as MagicalObjectViewModel),
    );
  }

  create(request: CreateMagicalObjectRequest): Observable<object> {
    const entity = request as MagicalObject;
    entity.id = Math.max(0, ...this.entities.map((e) => e.id)) + 1;

    this.entities.push(entity);

    return new Observable<object>((observer) => observer.next({}));
  }

  update(id: number, request: UpdateMagicalObjectRequest): Observable<object> {
    const entity = this.entities.find((e) => e.id === id);

    if (entity === undefined) {
      throw new Error(`Entity with id ${id} not found.`);
    }

    entity.name = request.name;
    entity.description = request.description;
    entity.elemental = request.elemental;
    entity.discovered = request.discovered;
    entity.properties = request.properties;

    return new Observable<object>((observer) => observer.next({}));
  }

  delete(id: number): Observable<object> {
    this.entities = this.entities.filter((e) => e.id !== id);

    return new Observable<object>((observer) => observer.next({}));
  }
}

@Injectable({ providedIn: 'root' })
export class MagicalObjectService implements IMagicalObjectService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  public get(
    filter: MagicalObjectListFilter,
  ): Observable<MagicalObjectListResponse> {
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

    return this.http.get<MagicalObjectListResponse>(
      `${this.baseUrl}/api/magical-objects?${queryFilter}`,
    );
  }

  public getById(id: number): Observable<MagicalObjectViewModel> {
    return this.http.get<MagicalObjectViewModel>(
      `${this.baseUrl}/api/magical-objects/${id}`,
    );
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

interface MagicalObject {
  id: number;
  name: string;
  description: string | null;
  elemental: ElementalType;
  discovered: Date;

  properties: MagicalObjectProperty[];
}

interface MagicalObjectProperty {
  name: string;
  value: string;
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
