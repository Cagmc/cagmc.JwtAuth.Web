import { Component } from '@angular/core';
import {
  CreateMagicalObjectRequest,
  CreateMagicalPropertyRequest,
  MagicalObjectService,
} from '../../core/services/magical-object.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ElementalType } from '../../core/enums/elemental-type.enum';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
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
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';

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
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    FormsModule,
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
  addPropertyForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required]),
  });
  displayedPropertyColumns: string[] = ['name', 'value', 'actions'];
  addedProperties: CreateMagicalPropertyRequest[] = [];
  elementalTypes = Object.values(ElementalType);
  protected readonly ElementalType = ElementalType;
  protected readonly Object = Object;

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
      properties: this.addedProperties,
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

  onAddProperty() {
    if (!this.addPropertyForm.valid) {
      return;
    }
    const { name, value } = this.addPropertyForm.value;
    const request = {
      name: name,
      value: value,
    } as CreateMagicalPropertyRequest;
    this.addedProperties.push(request);
    this.addPropertyForm.reset();

    // Refresh the UI by triggering change detection to ensure any updates are reflected
    this.addedProperties = [...this.addedProperties];
  }

  onRemoveProperty(name: string) {
    this.addedProperties = this.addedProperties.filter(
      (property) => property.name !== name,
    );
  }

  onCancel() {
    this.createForm.reset();
    this.router.navigate(['/magical-objects']);
  }
}
