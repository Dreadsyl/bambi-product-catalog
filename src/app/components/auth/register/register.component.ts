import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import * as uuid from 'uuid';

@Component({
  selector: 'pm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  currentUser: any;
  message: any;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      id: uuid.v4(),
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get firstNameFormControl(): FormControl {
    return this.userForm.get('firstName') as FormControl;
  }

  get lastNameFormControl(): FormControl {
    return this.userForm.get('lastName') as FormControl;
  }

  get usernameFormControl(): FormControl {
    return this.userForm.get('username') as FormControl;
  }

  get emailFormControl(): FormControl {
    return this.userForm.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.userForm.get('password') as FormControl;
  }

  showMessage(msg: any, id: any) {
    this.message = msg;
    document.getElementById(id)?.setAttribute('style', 'display: block');

    setTimeout(() => {
      document.getElementById(id)?.setAttribute('style', 'display: none');
      if (id === 'success') {
        this.router.navigate(['/login']);
      }
    }, 3000);
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.register(this.userForm.value).subscribe(
        () => {
          this.showMessage('Uspesno ste se registrovali!', 'success');
        },
        (err) => {
          this.showMessage(err.error.message, 'error');
        }
      );
    } else {
      this.showMessage('Nepravilno popunjena forma', 'error');
      return;
    }
  }

  ngOnInit(): void {}
}
