import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ElementalType } from '../enums/elemental-type.enum';

@Injectable({ providedIn: 'root' })
export class MagicalObjectService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  public get(
    nameFilter: string | null,
    discoveredFrom: Date | null,
    discoveredTo: Date | null,
    elementalFilterSet: ElementalType[] | null,
  ) {
    let queryFilter: string | null = null;

    if (nameFilter !== null && nameFilter.length > 0) {
      queryFilter = `nameFilter=${nameFilter}`;
    }

    if (discoveredFrom !== null) {
      queryFilter =
        queryFilter === null
          ? `discoveredFrom=${discoveredFrom}`
          : `${queryFilter}&discoveredFrom=${discoveredFrom}`;
    }

    if (discoveredTo !== null) {
      queryFilter =
        queryFilter === null
          ? `discoveredTo=${discoveredTo}`
          : `${queryFilter}&discoveredTo=${discoveredTo}`;
    }

    let elementalQueryFilter: string | null = null;

    if (elementalFilterSet !== null && elementalFilterSet.length > 0) {
      elementalQueryFilter = elementalFilterSet.join('&elementalFilterSet=');
      queryFilter =
        queryFilter === null
          ? `elementalFilterSet=${elementalQueryFilter}`
          : `${queryFilter}&elementalFilterSet=${elementalQueryFilter}`;
    }

    return this.http.get(`${this.baseUrl}/api/magical-objects?${queryFilter}`);
  }

  public create(request: CreateMagicalObjectRequest) {
    return this.http.post(`${this.baseUrl}/api/magical-objects`, request);
  }

  public delete(id: number) {
    return this.http.delete(`${this.baseUrl}/api/magical-objects/${id}`);
  }
}

export interface MagicalObjectListResponse {
  data: MagicalObjectItemViewModel[];
  total: number;
}

export interface MagicalObjectItemViewModel {
  id: number;
  name: string;
  elemental: ElementalType;
  discovered: Date;
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
