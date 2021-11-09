import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'EAP-class-create',
  templateUrl: './class-create.component.html',
  styleUrls: ['./class-create.component.scss'],
})
export class ClassCreateComponent implements OnInit {
  class_info_form!: FormGroup;
  selectedImg: string = 'img1.jpg';
  isEditable = false;

  constructor() {}

  get imageList() {
    return [1, 2, 3, 4, 5, 6, 7, 8];
  }
  ngOnInit() {
    this.initClassInfoForm();
  }

  onSelectImage(img: string) {
    this.selectedImg = img;
  }

  private initClassInfoForm() {
    this.class_info_form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      capacity: new FormControl(30, [Validators.min(0), Validators.max(100)]),
    });
  }
}
