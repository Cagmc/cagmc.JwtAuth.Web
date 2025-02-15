import { Component } from '@angular/core';
import {
  CreateMagicalObjectRequest,
  MagicalObjectService,
} from '../../core/services/magical-object.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ElementalType } from '../../core/enums/elemental-type.enum';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatHint,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatOption,
} from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import {
  MatDatepicker,
  MatDatepickerActions,
  MatDatepickerApply,
  MatDatepickerCancel,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MY_FORMATS } from '../../core/formats/date.formats';

@Component({
  selector: 'app-create-magical-object',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  imports: [
    MatInputModule,
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatOption,
    MatSelect,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatHint,
    MatDatepickerActions,
    MatDatepickerCancel,
    MatDatepickerApply,
  ],
  templateUrl: './create-magical-object.component.html',
  styleUrl: './create-magical-object.component.scss',
})
export class CreateMagicalObjectComponent {
  createForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(null),
    elemental: new FormControl(ElementalType.None, [Validators.required]),
    dateDiscovered: new FormControl(new Date(), [Validators.required]),
  });
  elementalTypes = Object.values(ElementalType);

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

    this.service.create(request).subscribe({
      next: (response) => {
        console.log('Create magical object successful', response);
        this.router.navigate(['/magical-objects']);
      },
      error: (error) => {
        console.log('Create magical object failed', error);
      },
    });
  }

  onCancel() {
    this.createForm.reset();
    this.router.navigate(['/magical-objects']);
  }

  protected readonly ElementalType = ElementalType;
  protected readonly Object = Object;
}
