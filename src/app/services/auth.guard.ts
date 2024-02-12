import { CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService,private router:Router,private toastr:ToastrService) {}

  canActivate(route: any, state: any): boolean {
   
    if (this.authService.isLoggedGuard) {
      return true;
    } 
    else {
      this.toastr.warning("NO permission");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
