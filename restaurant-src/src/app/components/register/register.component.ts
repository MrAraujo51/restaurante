/*
 * @author: Manuel Araujo <alejandromanuel5187@gmail.com>
 * Created on 2017-09-23 19:28:53
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from './../../service/validate.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  emailValid;
  emailMessage;
  messageClass;
  message;
  processing = false;

  constructor(
    private router: Router,
    private validateService: ValidateService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.createForm();
  }

  ngOnInit() {
    document.body.className = 'bg-primary';
  }

  createForm() {
    this.registerForm = this.formBuilder.group ({
      // Email Input
      'email': [null, Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30), // Maximum length is 30 characters
        this.validateService.validateEmail, // Custom validation
        this.validateService.validateContainTekton
      ])],
      // Password Input
      'password': [null, Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35), // Maximum length is 35 characters
        this.validateService.validatePasswordUpperCase, // Custom validation
        this.validateService.validatePasswordLowerCase,
        this.validateService.validatePasswordNumber,
        this.validateService.validatePasswordSpecialCharacter
      ])],
      // Confirm Password Input
      'confirmPass': [null, Validators.required],
      'rol': ['Cajero', Validators.required]
    }, {
      validator: this.validateService.validateMatchingPasswords('password', 'confirmPass')}); // Add custom validator to form for matching passwords
  }

  checkEmail() {
    const email = this.registerForm.get('email').value;
    this.authService.checkEmail(email).subscribe(data => {
      if (data.success) {
        this.emailValid = true;
        this.emailMessage = data.message;
      } else {
        this.emailValid = false;
        this.emailMessage = data.message;
      }
    });
  }

  onRegisterSubmit() {
    const user = {
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      rol: this.registerForm.get('rol').value
    };
    this.processing = true;
    this.authService.registerUser(user).subscribe(data => {
      setTimeout(() => {
        if (data.success) {
          this.messageClass = 'alert alert-success'; // Set bootstrap success class
          this.message = data.message; // Set success message
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 4000);
        } else {
          this.messageClass = 'alert alert-danger'; // Set bootstrap error class
          this.message = data.message; // Set error message
          this.processing = false;
        }
      }, 500);
    });
  }

}
