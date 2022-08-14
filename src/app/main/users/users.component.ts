import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/model/users/users.model';
import { TokenStorageService } from 'src/app/service/Login/token-storage.service';
import { UserService } from 'src/app/service/user/user.service';
// import custom validator to validate that password and confirm password fields match
import { Subject } from 'rxjs/internal/Subject';
// import { MustMatch } from '../../share/must-match.validator';
import { AngularEditorConfig } from '@kolkov/angular-editor';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };



 BaseURL="http://localhost:65426/api/Users/";
  //registerForm: FormGroup;
  submitted = false;
  datas:Users[];
  //gender :boolean;

  //login
  //svs: Student[];
  ok: boolean=true;
  isLoggedIn = false;
  tokenStorageService: any;
  baoloi:string="";
 
  // gender:boolean=true;

  registerForm = this.formBuilder.group({
   
    name: new FormControl('', [ Validators.required]),
    gender:new FormControl('', [ Validators.required]),
    address:new FormControl('', [ Validators.required]),
    phone: new FormControl(1,  [Validators.required]),
    dayStart: new FormControl('', [ Validators.required]),
    rol: new FormControl(1, [ Validators.required]),
    userName:new FormControl('', [ Validators.required]),
    //title: new FormControl('', [ Validators.required]),
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    // dob: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(10),
    //   Validators.maxLength(200),
    // ]),
    // new FormControl({value: field.value}, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
   
    }, 
    // {
    // validator: MustMatch('password', 'confirmPassword')
    //  }
     );

  constructor(private formBuilder: FormBuilder ,
            private userSevice:UserService,
            private tokenStorage: TokenStorageService,
            private httpClient:HttpClient,
            ) { }

  ngOnInit() {
    // idUser:number;
    // name:string;
    // gender:string;
    // address:string;
    // phone:number;
    // dayStart:Date;
    // rol:number;
    // password:string;
    // userName:string;

   

      // this.registerForm = this.formBuilder.group({
      //     title: ['', Validators.required],
      //     phone: [Validators.required],
      //     lastName: ['', Validators.required],
      //     // validates date format yyyy-mm-dd
      //     dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      //     email: ['', [Validators.required, Validators.email]],
      //     password: ['', [Validators.required, Validators.minLength(6)]],
      //     confirmPassword: ['', Validators.required],
      //     acceptTerms: [false, Validators.requiredTrue]
      // }, {
      //     validator: MustMatch('password', 'confirmPassword')
      // });
      this.getUser();

      
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {

    
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }


      this.userSevice
      .addUser(this.registerForm.value)
 
      .subscribe( (data) => {
        debugger;
        this.datas.push(data) 
        console.log("log"+data.gender)
        
       // this.showSuccess('gửi thành công!');
       // this.form.get('noiDung')?.reset();
       this.registerForm.reset();
      }, (error) => {
       // this.showSuccess('sai!');
      });
      console.log(this.registerForm.value);
      //return this.getAll();

      // display form values on success
     // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

  getUser(){
  //this.isLoggedIn = !!this.tokenStorage.getToken();
  this.userSevice.getAll().subscribe((res:any)=>{
  this.datas=res;
  console.log( this.datas);
    })
  }
  
  selectedUS:Users ={ idUser: 0, name: '',address:'',phone:0,dayStart:new Date(),rol:1,password: '' ,userName:'',gender: 0};
  onselect(user:Users):void{
    this.selectedUS=user;
  }
  
  getOne(id:number){
    
    this.userSevice.get(id).subscribe((res:any)=>{
     
    this.datas=res
    })
  }

  user:Users={idUser:0,name:'',address:'',phone:0,dayStart:new Date(),rol:1,password: '' ,userName:'',gender: 0}
  putUser(id: number): void {
    this.httpClient.put(this.BaseURL+ id,this.selectedUS).subscribe(
      data => {
        //this.editSuccess();
        console.log(data);
        this.getUser();    
      }, error => {
        //this.editError();
        console.log("Error", error);
      })
  }
  deleteUser(id:number){
    this.userSevice.deleteUser(this.user.idUser=id).subscribe(
      data=>{   window.location.reload(); }       
    );
  }


}
