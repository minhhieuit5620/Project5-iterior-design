import { Component, OnInit } from '@angular/core';
// import { AuthService } from ' ../service/Login/auth.service';
// import { TokenStorageService } from '../service/Login/token-storage.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/service/Login/auth.service';
import { TokenStorageService } from 'src/app/service/Login/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  token:string[]
  roles: string[] = [];
  user:{userName:string,passWord:string}
  private router: Router;
  constructor(
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private route: Router
    ) { }

  ngOnInit(): void {
    // if (this.tokenStorage.getToken()) {
    //   console.log(this.tokenStorage.getToken());
    //   this.isLoggedIn = true;
    //   this.roles = this.tokenStorage.getUser().roles;
    // }
  }

  onSubmit(): void {
    const { username, password } = this.form;
     this.authService.login(username, password).subscribe(    
        (data) => {
          this.tokenStorage.saveTokenAdmin(data.token);
          this.tokenStorage.saveAdmin(data.user);
          this.route.navigate(['/']);
        },
        (err) => {
          console.log("d2")
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
        }


      );
  }
  // onSubmit(): void {
  //   const { username, password } = this.form;
  //   this.authService.login(username, password).subscribe(
  //     data => {
  //       console.log("d")
  //       this.token = data as string[];
  //       console.log(this.token.length)
  //       this.user={userName:username,passWord:password}
      
  //       this.tokenStorage.saveToken(data);
  //       this.tokenStorage.saveUser(this.user);
  //       this.isLoginFailed = false;
  //       this.isLoggedIn = true;
  //       //this.roles = this.tokenStorage.getUser().roles;    
  //       this.route.navigate(['products']);
  //     },
  //     err => {
  //       console.log("d2")
  //       this.errorMessage = err.error.message;
  //       this.isLoginFailed = true;
  //     }
  //   );
  // }

  
}
