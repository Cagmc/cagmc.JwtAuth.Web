import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CreateMagicalPropertyRequest,
  MagicalObjectService,
  MagicalObjectViewModel,
  UpdateMagicalObjectRequest,
  UpdateMagicalPropertyRequest,
} from '../../core/services/magical-object.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ElementalType } from '../../core/enums/elemental-type.enum';
import { MatButton } from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerActions,
  MatDatepickerApply,
  MatDatepickerCancel,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
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
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../../core/formats/date.formats';

@Component({
  selector: 'app-edit-magical-object',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    MatDatepicker,
    MatDatepickerActions,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatError,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatHint,
    MatLabel,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatDatepickerCancel,
    MatDatepickerApply,
  ],
  templateUrl: './edit-magical-object.component.html',
  styleUrl: './edit-magical-object.component.scss',
})
export class EditMagicalObjectComponent implements OnInit {
  magicalObjectId: number | undefined;
  magicalObject: MagicalObjectViewModel | null = null;
  editForm: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    name: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    description: new FormControl({ value: '', disabled: false }),
    elemental: new FormControl({ value: ElementalType.None, disabled: false }),
    discovered: new FormControl({ value: new Date(), disabled: false }),
  });
  addPropertyForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required]),
  });
  displayedPropertyColumns: string[] = ['name', 'value', 'actions'];
  addedProperties: UpdateMagicalPropertyRequest[] = [];
  elementalTypes = Object.values(ElementalType);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: MagicalObjectService,
    private readonly router: Router,
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
            this.addedProperties = this.magicalObject.properties;
          },
          error: (error) => {
            console.error('Error fetching magical object data:', error);
          },
        });
      }
    });
  }

  onSubmit() {
    if (!this.editForm.valid) {
      return;
    }
    const { id, name, description, elemental, discovered } =
      this.editForm.value;
    const request = {
      id: id,
      name: name,
      description: description,
      elemental: elemental,
      discovered: discovered,
      properties: this.addedProperties,
    } as UpdateMagicalObjectRequest;

    this.service.update(id, request).subscribe({
      next: (response) => {
        console.log('Update magical object successful', response);
        this.router.navigate(['/magical-objects']);
      },
      error: (error) => {
        console.log('Update magical object failed', error);
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
    this.editForm.reset();
    this.router.navigate(['/magical-objects']);
  }
}
