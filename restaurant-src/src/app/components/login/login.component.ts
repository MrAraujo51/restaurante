/*
 * @author: Manuel Araujo <alejandromanuel5187@gmail.com>
 * Created on 2017-09-23 17:29:50
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  messageClass;
  message;
  processing = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService) {

      this.loginForm = formBuilder.group ({
        'email': [null, Validators.required],
        'password': [null, Validators.required],
      });
    }

  ngOnInit() {
    document.body.className = 'bg-primary';
  }

  onLogin() {
    const user = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this.processing = true;
    this.authService.authUser(user).subscribe(data => {
      setTimeout(() => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.router.navigate(['dashboard']);
          this.messageClass = 'alert alert-success'; // Set bootstrap success class
          this.message = data.message; // Set success message
        } else {
          this.messageClass = 'alert alert-danger'; // Set bootstrap error class
          this.message = data.message; // Set error message
        }
        setTimeout(() => {
          this.message = false;
          this.processing = false;
        }, 2000);
      }, 500);
    });
  }
}
