import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
// import{CKEditorModule} from'ngx-ckeditor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import  *  as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Introduce } from 'src/app/model/introduce/introduce.model';
import { IntroduceService } from 'src/app/service/introduce/introduce.service';
// import {ClassicEditor}
@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit {

  public editor = ClassicEditor;
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


  pro:Introduce = { id: 0, title: '', description: ''};
  datas:Introduce[];
  baseURL="http://localhost:65426/api/introduces/";
  public keyword:string;
  public pages:number[];
  pageSize: 5;
  p:number=1;
  filterTerm:string;
  // public Editor = ClassicEditor;
  private searchedSubject=new Subject<string>();
  constructor(private proService:IntroduceService,private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.getAll();
   
  }
  
  
  
  getAll(){
    this.proService.getIntro().subscribe((res:any)=>{
      console.log("ré",res)
      this.datas=res;
      console.log(this.datas);
    })
  }
   selectedSP:Introduce ={ id: 0, title: '', description: '' };
  onselect(pr:Introduce):void{
    this.selectedSP=pr;
    // alert(`selectedSP=${JSON.stringify(this.selectedSP)}`);
  }
  getOne(id:number){
    
    this.proService.get(id).subscribe((res:any)=>{
     
    this.datas=res
    })
  }
  
  addSP() :any{
    this.proService
    .AddPr(this.pro)
    .subscribe(data =>{ this.datas.push(data) });
    return this.getAll();
  }
  
   deleteSP(id:number){
     this.proService.deletePr(this.pro.id=id).subscribe(
       data=>{  window.location.reload(); }
       // return this.getAll();
        // alert(`sản phẩ ${id}`);
     );
   }
  
  putpr(id: number): void {
    this.httpClient.put(this.baseURL  + id, this.selectedSP).subscribe(
      data => {
        //this.editSuccess();
        this.getAll();    
      }, error => {
        //this.editError();
        console.log("Error", error);
      })
  }

}
