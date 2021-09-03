import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Auth } from '../models/auth/auth.model';
import { RegisterForm } from '../models/auth/registerform.model';
declare let alertify: any;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  registerForm = new RegisterForm();

  auth = new Auth();
  
  ngOnInit(): void {
  }



  register() {

    this.accountService.register(this.registerForm).subscribe((response) => {
      this.auth = response;
      if (this.auth.success) {
        alertify.success("Mail aktivasyonundan sonra uygulamayı kullanabilirsiniz")
      }
    }, error=>{
      console.log(error);
      if(error.status == 400){
        alertify.error("Bu E-Mail zaten kullanılıyor.")
      }else if(error.status == 500 || error.status == 0){
        alertify.error("Sunucudan kaynaklanan bir problem var. Daha sonra tekrar deneyiniz")
      }
    }
    );
  }

}
