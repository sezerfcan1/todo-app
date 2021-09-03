import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivationService } from 'src/app/services/activation.service';
declare let alertify: any;

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {


  activationToken:any;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private activationService:ActivationService
    ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.activationToken = params.get('activationToken')

      this.activationService.activation(this.activationToken)
      .subscribe((response) =>{
        const isActive = response.success;
        if (isActive) {
          alertify.success("Hesabınız Aktif Edildi");
        }else {
          alertify.error("İşlem Başarısız");
        }
      })

    })
  }



}
