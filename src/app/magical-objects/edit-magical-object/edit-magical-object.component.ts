import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-magical-object',
  imports: [],
  templateUrl: './edit-magical-object.component.html',
  styleUrl: './edit-magical-object.component.scss',
})
export class EditMagicalObjectComponent implements OnInit {
  magicalObjectId!: string;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.magicalObjectId = id;
        console.log('Magical Object ID:', this.magicalObjectId);
      }
    });
  }
}
