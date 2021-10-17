import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "EAP-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onRegister() {}

  onRedirectToLogin() {
    this.router.navigate(["/auth/login"]);
  }
}
