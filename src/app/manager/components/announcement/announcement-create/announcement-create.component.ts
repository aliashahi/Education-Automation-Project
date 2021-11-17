import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GROUPS } from 'src/app/manager/constants/groups.constant';
import { USER_MOCK_DATA } from 'src/app/manager/mock/user.mock';
import { User } from 'src/app/manager/models/user.model';
import { AlertService } from 'src/app/shared/modules/alert/alert.service';

@Component({
  selector: 'EAP-announcement-create',
  templateUrl: './announcement-create.component.html',
  styleUrls: ['./announcement-create.component.scss'],
})
export class AnnouncementCreateComponent implements OnInit {
  announcement_form!: FormGroup;
  groups: { value: number; label: string }[] = GROUPS;
  teachers: User[] = USER_MOCK_DATA;
  constructor(private alertService: AlertService, private router: Router) {}

  ngOnInit(): void {
    this.initAnnouncementForm();
  }

  private initAnnouncementForm() {
    this.announcement_form = new FormGroup({
      title: new FormControl(null, Validators.required),
      subtitle: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      group: new FormControl([1, 2, 3], Validators.required),
    });
  }

  onSubmit() {
    this.alertService.showSnackbar('Announcement Created!!!', 'SUCCESS');
    setTimeout(() => {
      this.router.navigate(['/manager/announcement-list']);
    }, 1000);
  }
}
