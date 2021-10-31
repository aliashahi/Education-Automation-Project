import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'EAP-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  forms = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    role: new FormControl('S'),
    remember_me: new FormControl(false),
  });
  pendding = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onLogin() {
    if (this.forms.valid) {
      this.pendding = true;
      this.forms.disable();
      setTimeout(() => {
        this.pendding = false;
        this.forms.enable();
        localStorage.setItem('Token', 'MY_JWT_TOKEN');
        this.router.navigate(['/']);
      }, 3000);
    }
  }

  onRedirectToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
