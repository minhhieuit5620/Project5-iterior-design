import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { url } from 'inspector';
import { LienHes } from 'src/app/model/contact/contact.model';
import { News } from 'src/app/model/news/news.model';
import { Orders } from 'src/app/model/order/orders.model';
import { CateProducts } from 'src/app/model/products/Cateproducts.model';
import { Products } from 'src/app/model/products/products.model';
import { cateProject } from 'src/app/model/projects/cateProjectmodel';
import { Project } from 'src/app/model/projects/projects.model';
import { Users } from 'src/app/model/users/users.model';

var urlUser="http://localhost:65426/api/Users/GetCount/";
var urlPro="http://localhost:65426/api/Products/GetProductCount/";
var urlCatePro="http://localhost:65426/api/CategoryProducts/GetCateCount/";
var urlCateProject="http://localhost:65426/api/CategoryProjects/GetCateProjCount/";
var urlContact="http://localhost:65426/api/LienHes/GetContactCount/";
var urlNews="http://localhost:65426/api/News/GetNewCount/";
var urlOrder="http://localhost:65426/api/Orders/GetOrderCount/";
var urlProject="http://localhost:65426/api/Projects/GetCountProject/";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  datas:Users[];
  pro:Products[];
  project:Project[];
  news:News[] ;
  order:Orders[];
   contact:LienHes[]; 
   cateProduct:CateProducts[];
   cateProject:cateProject[];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
     this.getUserCount();
    this.getProductCount();
    this.getProjectCount();
    this.getNewsCount();
    this.getContactCount();
    this.getOrdersCount();
    this.getCateProduct();
    this.getCateProject();
    }
    getUserCount(){
    this.http.get(urlUser).subscribe((user:any)=>{
      //console.log("ré",detail)
      this.datas = user;
      console.log('ship',this.datas);
    })
  }
  getProductCount(){
    this.http.get(urlPro).subscribe((pro:any)=>{
      this.pro=pro;
    })
  }
  getProjectCount(){
    this.http.get(urlProject).subscribe((project:any)=>{
      this.project=project;
    })
  }
  getNewsCount(){
    this.http.get(urlNews).subscribe((news:any)=>{
      this.news=news;
    })
  }
  getOrdersCount(){
    this.http.get(urlOrder).subscribe((orders:any)=>{
      this.order=orders;
    })
  }
  getContactCount(){
    this.http.get(urlContact).subscribe((res:any)=>{
      this.contact=res;
    })
  }
  getCateProduct(){
    this.http.get(urlCatePro).subscribe((catePro:any)=>{
      this.cateProduct=catePro;
    })
  }
  getCateProject(){
    this.http.get(urlCateProject).subscribe((cateProject:any)=>{
      this.cateProject=cateProject;
    })
  }

}
