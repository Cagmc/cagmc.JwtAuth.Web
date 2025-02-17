import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MagicalObjectService,
  MagicalObjectViewModel,
} from '../../core/services/magical-object.service';

@Component({
  selector: 'app-magical-object-details',
  imports: [],
  templateUrl: './magical-object-details.component.html',
  styleUrl: './magical-object-details.component.scss',
})
export class MagicalObjectDetailsComponent implements OnInit {
  magicalObjectId: number | undefined;
  magicalObject: MagicalObjectViewModel | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: MagicalObjectService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.magicalObjectId = Number.parseInt(id);
        console.log('Magical Object ID:', this.magicalObjectId);

        this.service.getById(this.magicalObjectId).subscribe({
          next: (response) => {
            this.magicalObject = response as MagicalObjectViewModel;
          },
          error: (error) => {
            console.error('Error fetching magical object data:', error);
          },
        });
      }
    });
  }
}
