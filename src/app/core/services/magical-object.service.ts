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
    let elementalQueryFilter: string | null = null;

    if (elementalFilterSet !== null && elementalFilterSet.length > 0) {
      elementalQueryFilter = elementalFilterSet.join('&elementalFilterSet=');
    }

    return this.http.get(
      `${this.baseUrl}/api/magical-objects?nameFilter=${nameFilter}&discoveredFrom=${discoveredFrom}&discoveredTo=${discoveredTo}&elementalFilterSet=${elementalQueryFilter}`,
    );
  }

  public create(request: CreateMagicalObjectRequest) {
    return this.http.post(`${this.baseUrl}/api/magical-objects`, request);
  }
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
