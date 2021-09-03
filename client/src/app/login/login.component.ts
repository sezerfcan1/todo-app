import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Auth } from '../models/auth/auth.model';
import { LoginForm } from '../models/auth/loginform.model';
import { Router } from '@angular/router';

declare let alertify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private accountService: AccountService,private router:Router) {}

  loginForm = new LoginForm();

  auth = new Auth();

  login() {

    this.accountService.login(this.loginForm).subscribe((response) => {
      this.auth = response;
      if (this.auth.success) {
      localStorage.setItem('access_token',this.auth.access_token);


        this.router.navigate(['nav'])
        alertify.success("Giriş Yapıldı")

      }
    }, error=>{
      console.log(error);
      if(error.status == 400){
        alertify.error("Kullanıcı adı veya şifrenize dikkat ediniz")
      }else if(error.status == 500 || error.status == 0){
        alertify.error("Sunucudan kaynaklanan bir problem var. Daha sonra tekrar deneyiniz")
      }
    }
    );
  }
  ngOnInit(): void {}
}
