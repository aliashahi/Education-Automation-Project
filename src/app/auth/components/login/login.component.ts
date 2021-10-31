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
  hide = true;
  forms = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    // role: new FormControl('S'),
    remember_me: new FormControl(false),
  });
  pendding = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    localStorage.removeItem('Token');
  }

  onLogin() {
    if (this.forms.valid) {
      this.pendding = true;
      this.forms.disable();
      this.authService.login(this.forms.value).subscribe(
        (response) => {
          localStorage.setItem('Token', response.access);
          localStorage.setItem('Refresh', response.refresh);
          this.router.navigate(['/']);
        },
        (error) => {},
        () => {
          this.pendding = false;
          this.forms.enable();
        }
      );
    }
  }

  onRedirectToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
