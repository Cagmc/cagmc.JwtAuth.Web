import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MagicalObjectService,
  MagicalObjectViewModel,
} from '../../core/services/magical-object.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-magical-object',
  imports: [],
  templateUrl: './edit-magical-object.component.html',
  styleUrl: './edit-magical-object.component.scss',
})
export class EditMagicalObjectComponent implements OnInit {
  magicalObjectId: number | undefined;
  magicalObject: MagicalObjectViewModel | null = null;
  editForm: FormGroup = new FormGroup({});

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
            this.editForm.patchValue(this.magicalObject);
          },
          error: (error) => {
            console.error('Error fetching magical object data:', error);
          },
        });
      }
    });
  }
}
