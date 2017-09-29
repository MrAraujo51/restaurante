/*
 * @author: Manuel Araujo <alejandromanuel5187@gmail.com>
 * Created on 2017-09-24 15:48:51
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }
  isHidden() {
    if (this.router.url === '/login' || this.router.url === '/register') {
      return true;
    }
    return false;
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/signin']);
    return false;


  }
}
