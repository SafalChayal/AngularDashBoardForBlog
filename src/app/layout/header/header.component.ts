import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  userName:string='';
  isLoggedIn$!: Observable<boolean>;
  constructor(private service:AuthService){}
  ngOnInit(): void {
    const user=localStorage.getItem('user');

    if(user){
      const tempuser = JSON.parse(user);
      this.userName = tempuser.email;
      this.isLoggedIn$ = this.service.isLoggedIn();

    }
  }

  onLogOut(){
    this.service.logOut();
  }



}
