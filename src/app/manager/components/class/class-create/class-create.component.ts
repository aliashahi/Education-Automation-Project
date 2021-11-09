import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ACTION } from './selected-teacher-list/selected-teacher-list.component';

@Component({
  selector: 'EAP-class-create',
  templateUrl: './class-create.component.html',
  styleUrls: ['./class-create.component.scss'],
})
export class ClassCreateComponent implements OnInit {
  class_info_form!: FormGroup;
  teacher_info_form!: FormGroup;
  selectedImg: string = 'img1.jpg';
  isEditable = false;
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  teachers: any[] = [];
  editItem!: any;
  private _filter(value: string): string[] {
    const filterValue = (' ' || value).toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  constructor() {}

  get imageList() {
    return [1, 2, 3, 4, 5, 6, 7, 8];
  }
  ngOnInit() {
    this.initClassInfoForm();
    this.initTeacherSelectForm();
  }

  onSelectImage(img: string) {
    this.selectedImg = img;
  }

  private initClassInfoForm() {
    this.class_info_form = new FormGroup({
      name: new FormControl('Grade A/1', Validators.required),
      description: new FormControl('no desc', Validators.required),
      capacity: new FormControl(30, [Validators.min(0), Validators.max(100)]),
    });
  }

  private initTeacherSelectForm() {
    this.teacher_info_form = new FormGroup({
      name: new FormControl(null),
    });
    this.filteredOptions =
      this.teacher_info_form.get('name')?.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      ) || new Observable();
  }

  onCancelEdit() {
    this.editItem = null;
    this.teacher_info_form.reset();
  }

  onInsertTeacher() {
    if (this.editItem) {
      this.teachers = this.teachers.map((i, index) => {
        if (this.editItem.no == i.no) {
          return {
            ...i,
            ...this.teacher_info_form.value,
            no: index + 1,
          };
        } else
          return {
            ...i,
            no: index + 1,
          };
      });
      this.editItem = null;
    } else {
      this.teachers = [
        ...this.teachers,
        {
          no: this.teachers.length + 1,
          name: this.teacher_info_form.value.name,
          field: 'Math',
        },
      ];
    }
    this.teacher_info_form.reset();
  }

  onEvent(event: { action: ACTION; item: any }) {
    switch (event.action) {
      case ACTION.DELETE:
        this.teachers = this.teachers
          .filter((i) => i.no != event.item.no)
          .map((i, index) => {
            return {
              ...i,
              no: index + 1,
            };
          });
        break;
      case ACTION.EDIT:
        let teacher = this.teachers.find((i) => i.no == event.item.no);
        this.teacher_info_form.get('name')?.setValue(teacher.name);
        this.editItem = teacher;
        break;
    }
  }
}
