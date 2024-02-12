import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);
isLoggedGuard:boolean=false;
  isLoggedIn() :Observable<any> {
    return this.loggedIn.asObservable();
  }

  constructor(private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router) { }

  login(email: any, pass: any) {
    this.afAuth.signInWithEmailAndPassword(email, pass).then(
      logref => {
        this.toastr.success("Logged in successfully ..!")
        this.loadUser();
        this.loggedIn.next(true);
        this.isLoggedGuard =  true;
        this.router.navigate(['/']);
      }
    ).catch(error => {
      this.toastr.error(`Login failed: ${error.message}`);
    });
  }

  loadUser() {
    this.afAuth.authState.subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  logOut() {
    this.afAuth.signOut().then(
      () => {
        this.toastr.success("User logged out successfully..!");
        localStorage.removeItem('user');
        this.loggedIn.next(false); 
        this.isLoggedGuard=false;
        this.router.navigate(['/login']);
      }
    );
  }
}
