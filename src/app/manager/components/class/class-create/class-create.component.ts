import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/manager/models/user.model';
import { USER_MOCK_DATA } from 'src/app/manager/mock/user.mock';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ACTION } from './selected-teacher-list/selected-teacher-list.component';

@Component({
  selector: 'EAP-class-create',
  templateUrl: './class-create.component.html',
  styleUrls: ['./class-create.component.scss'],
})
export class ClassCreateComponent implements OnInit {
  class_info_form!: FormGroup;
  teacher_info_form!: FormGroup;
  student_info_form!: FormGroup;
  selectedImg: string = 'img1.jpg';
  isEditable = true;
  options: User[] = [];
  filteredOptions!: Observable<User[]>;
  teachers: User[] = [];
  students: User[] = [];
  editItem!: any;
  private _filter(value: string): User[] {
    const filterValue = (' ' || value).toLowerCase();

    return this.options.filter((option) =>
      ((option.first_name || '') + (option.last_name || ''))
        .toLowerCase()
        .includes(filterValue)
    );
  }

  constructor() {}

  get imageList() {
    return [1, 2, 3, 4, 5, 6, 7, 8];
  }
  ngOnInit() {
    this.initClassInfoForm();
    this.options = USER_MOCK_DATA;

    this.initTeacherSelectForm();
    this.initStudentSelectForm();
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
  }

  private initStudentSelectForm() {
    this.student_info_form = new FormGroup({
      name: new FormControl(null),
    });
  }

  onCancelEdit() {
    this.editItem = null;
    this.teacher_info_form.reset();
  }

  onInsertTeacher() {
    if (this.editItem) {
      this.teachers = this.teachers.map((i, index) => {
        if (this.editItem.id == i.id) {
          return {
            ...i,
            ...this.teacher_info_form.value.name,
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
          ...this.teacher_info_form.value.name,
        },
      ];
    }
    this.teacher_info_form.reset();
  }

  onEvent(event: { action: ACTION; item: any }) {
    switch (event.action) {
      case ACTION.DELETE:
        this.teachers = this.teachers.filter((i) => i.id != event.item.id);
        break;
      case ACTION.EDIT:
        let teacher = this.teachers.find((i) => i.id == event.item.id);
        this.teacher_info_form.get('name')?.setValue(teacher);
        this.editItem = teacher;
        break;
    }
  }
}
