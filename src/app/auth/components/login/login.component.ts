import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'EAP-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private loginRef$!: Subscription;
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

  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('Token');
  }

  onLogin() {
    if (this.forms.valid) {
      this.pendding = true;
      this.forms.disable();
      this.loginRef$ = this.authService.login(this.forms.value).subscribe(
        (response) => {
          localStorage.setItem('Token', response.access);
          localStorage.setItem('Refresh', response.refresh);
          this.router.navigate(['/']);
          this.pendding = false;
          this.forms.enable();
        },
        (error) => {
          this._snackBar.open(error.error.detail, 'close', {
            duration: 2500,
            panelClass: 'alert-danger',
          });
          this.pendding = false;
          this.forms.enable();
        }
      );
    }
  }

  onRedirectToRegister() {
    this.router.navigate(['/auth/register']);
  }

  onCancelRequest() {
    if (this.pendding) {
      this.pendding = false;
      this.forms.enable();
      this.loginRef$.unsubscribe();
    }
  }
}
