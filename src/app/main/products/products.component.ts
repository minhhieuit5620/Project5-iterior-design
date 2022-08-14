import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/model/products/products.model';
import { ProductService } from 'src/app/service/product/product.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient,HttpResponse  } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
// import{CKEditorModule} from'ngx-ckeditor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import  *  as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


// import {ClassicEditor}
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
declare var $: any;
var baseURL="http://localhost:65426/api/Products/";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
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
  pro:Products = { id: 0, name: '', image: '', description: '' ,quantity:0,price:'',idCategory:0};
  datas:Products[];
  product$:Observable<Products[]>;
  public keyword:string;
  public pages:number[];
  pageSize: 10;
  p:number=1;
  filterTerm:string;
  // public Editor = ClassicEditor;
  private searchedSubject=new Subject<string>();
  constructor(private proService:ProductService,private httpClient:HttpClient) { }
  

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
  selectedSP:Products ={ id: 0, name: '', image: '', description: '' ,quantity:0,price:'',idCategory:0};;
  onselect(pr:Products):void{
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