import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn: boolean = false;
  roles: string[] = [];
  currentUser: any;
  message: any;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  showMessage(msg: any, id: any) {
    this.message = msg;
    document.getElementById(id)?.setAttribute('style', 'display: block');

    setTimeout(() => {
      document.getElementById(id)?.setAttribute('style', 'display: none');
      if (id === 'success') {
        window.location.reload();
        this.router.navigate(['/']);
      }
    }, 3000);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        (data) => {
          this.tokenStorage.saveToken(data._id);
          this.tokenStorage.saveUser(data);

          this.isLoggedIn = true;
          this.showMessage(
            'Prijavljeni ste pod korisničkim imenom: ' + data.username,
            'success'
          );
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

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/']);
    }
  }
}
