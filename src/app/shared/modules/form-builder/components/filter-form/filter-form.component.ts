import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field.config';

@Component({
  selector: 'EAP-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
})
export class FilterFormComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() configs: FieldConfig[] = [];

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {}
}
