import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/Login/auth.service';
import { TokenStorageService } from '../service/Login/token-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor( private authService: AuthService,private tokenservice: TokenStorageService,private route: Router) { }

  ngOnInit(): void {
  }
  logOut():void{
    
      this.tokenservice.signOut();
       this.route.navigate(["/login"]);
       
     
  }
}
