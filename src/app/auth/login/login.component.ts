import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  constructor(private service:AuthService){}
  ngOnInit(): void {
}
onSubmit(loginForm:NgForm) {
  const { email, password } = loginForm.value;

  this.service.login(email,password);

}

}
