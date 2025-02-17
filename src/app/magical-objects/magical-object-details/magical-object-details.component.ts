import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-magical-object-details',
  imports: [],
  templateUrl: './magical-object-details.component.html',
  styleUrl: './magical-object-details.component.scss',
})
export class MagicalObjectDetailsComponent implements OnInit {
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
