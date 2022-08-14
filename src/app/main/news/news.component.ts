import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
//  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { News } from 'src/app/model/news/news.model';
import { NewsService } from 'src/app/service/News/news.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
 import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
declare var $: any;
var baseURL="http://localhost:65426/api/News/";
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

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

  // @Input() readonly:boolean = false;
   // public Editor =ClassicEditor;
  //sinhvien: Products = { Id: 0, Name: '',Image:'', Description: '' };
  news:News = { idNew: 0, nameNew: '',  descriptionNew: '' ,avaterNew:'',imageNew:'',idCategoryNew:0,flag:true};
  datas:News[];
  // product$:Observable<Products[]>;
  public keyword:string;
  public pages:number[];
  pageSize: 5;
  p:number=1;
  filterTerm:string;
 

  constructor(private newsService:NewsService, private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.getAll();
   
  }
  
  
  
  getAll(){
    this.newsService.getAll().subscribe((res:any)=>{
      console.log("ré",res)
      this.datas=res;
      console.log(this.datas);
    })
  }
  selectedSP:News ={ idNew: 0, nameNew: '',  descriptionNew: '' ,avaterNew:'',imageNew:'',idCategoryNew:0,flag:true};
  onselect(pr:News):void{
    this.selectedSP=pr;
    // alert(`selectedSP=${JSON.stringify(this.selectedSP)}`);
  }
  getOne(id:number){
    
    this.newsService.get(id).subscribe((res:any)=>{
     
    this.datas=res
    })
  }
  
  addSP() :any{
    this.newsService
    .AddPr(this.news)
    .subscribe(data =>{ this.datas.push(data) });
    return this.getAll();
  }
  
   deleteSP(id:number){
     this.newsService.deletePr(this.news.idNew=id).subscribe(
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
        this.newsService.Search(this.keyword).subscribe((data)=>{
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
