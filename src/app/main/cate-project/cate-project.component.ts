import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';
import { cateProject } from 'src/app/model/projects/cateProjectmodel';
import { cateProjectService } from 'src/app/service/Project/cateProject.service';

declare var $: any;
var baseURL="http://localhost:65426/api/CategoryProjects/";

@Component({
  selector: 'app-cate-project',
  templateUrl: './cate-project.component.html',
  styleUrls: ['./cate-project.component.css']
})
export class CateProjectComponent implements OnInit {

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


  //sinhvien: Products = { Id: 0, Name: '',Image:'', Description: '' };
  pro:cateProject = {idCateProject: 0, nameCateProject: '', descriptionCateProject:'', imageCateProject: '',flag:true};
  datas:cateProject[];
  public keyword:string;
  public pages:number[];
  pageSize: 5;
  p:number=1;
  filterTerm:string;
  // public Editor = ClassicEditor;
  // private searchedSubject=new Subject<string>();
  constructor(private proService:cateProjectService, private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.getAll();
   
  }
  
  
  
  getAll(){
    this.proService.getAll().subscribe((res:any)=>{
      console.log("ré",res)
      this.datas=res;
      console.log(this.datas);
    })
  }
  selectedSP:cateProject ={  idCateProject: 0, nameCateProject: '', descriptionCateProject:'', imageCateProject: '',flag:true};
  onselect(pr:cateProject):void{
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
     this.proService.deletePr(this.pro.idCateProject=id).subscribe(
       data=>{  window.location.reload(); }
       // return this.getAll();
        // alert(`sản phẩ ${id}`);
     );
   }
  
  putpr(id: number): void {
    this.httpClient.put(baseURL  + id, this.selectedSP).subscribe(
      data => {
        //this.editSuccess();
        this.getAll();    
      }, error => {
        //this.editError();
        console.log("Error", error);
      })
  }

    Search(){
      if(this.keyword==""){
        this.getAll();
      }
      else{
        this.proService.Search(this.keyword).subscribe((data)=>{
          this.datas=data;
          console.log(data);
        },error=>{
          console.log(error);
        })
      }    
    }
 
  closeModal() {
    $('#modelId').closest('.modal').modal('hide');
  }
 
  

}



