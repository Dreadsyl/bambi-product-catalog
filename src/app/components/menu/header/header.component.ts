import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'pm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  showAdmin = false;
  username?: string;
  user: any;

  @Output() public sidenavToggle = new EventEmitter();
  logo = '/assets/images/bambi.png';

  constructor(
    private token: TokenStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      this.user = this.token.getUser();
      this.showAdmin = true;
      this.username = this.user.username;
    }
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  async logout() {
    (await this.userService.logout(this.user._id)).subscribe(
      () => {
        console.log('user logged out');
      },
      (err) => {
        console.log('error:' + err);
      }
    );

    setTimeout(() => {
      console.log('processing...');
      this.token.logout();
      window.location.reload();
    }, 2000);
  }
}
