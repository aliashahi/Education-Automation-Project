import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'EAP-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  forms = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    password2: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    role: new FormControl('S'),
  });
  pendding = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onRegister() {
    if (this.forms.valid) {
      this.pendding = true;
      this.forms.disable();
      this.authService.register(this.forms.value).subscribe(
        (response) => {
          this.router.navigate(['/auth/login']);
        },
        (error) => {},
        () => {
          this.pendding = false;
          this.forms.enable();
        }
      );
    }
  }

  onRedirectToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
