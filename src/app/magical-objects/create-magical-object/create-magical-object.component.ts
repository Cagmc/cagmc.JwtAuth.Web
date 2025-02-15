import { Component } from '@angular/core';
import {
  CreateMagicalObjectRequest,
  MagicalObjectService,
} from '../../core/services/magical-object.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ElementalType } from '../../core/enums/elemental-type.enum';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-magical-object',
  imports: [MatButton, ReactiveFormsModule],
  templateUrl: './create-magical-object.component.html',
  styleUrl: './create-magical-object.component.scss',
})
export class CreateMagicalObjectComponent {
  createForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    elemental: new FormControl(ElementalType.None, [Validators.required]),
    dateDiscovered: new FormControl(new Date(), [Validators.required]),
  });

  constructor(
    private readonly service: MagicalObjectService,
    private readonly router: Router,
  ) {}

  onSubmit() {
    if (!this.createForm.valid) {
      return;
    }
    const { name, description, elemental, dateDiscovered } =
      this.createForm.value;
    const request = {
      name: name,
      description: description,
      elemental: elemental,
      discovered: dateDiscovered,
      properties: [],
    } as CreateMagicalObjectRequest;

    this.service.create(request);
  }

  onCancel() {
    this.createForm.reset();
    this.router.navigate(['/magical-objects']);
  }
}
