import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { orderDetail } from 'src/app/model/order/orderDetail.model';
import { Orders } from 'src/app/model/order/orders.model';
import { Ship } from 'src/app/model/order/shipping.model';
import { OrderService } from 'src/app/service/order/order.service';
import { Subject } from 'rxjs/internal/Subject';



declare var $: any;
var baseURL="http://localhost:65426/api/Orders"
var detailURL="http://localhost:65426/api/OrderDetails/getIdOrder/";
var shipURL="http://localhost:65426/api/Shippings/getShipOrder/";
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders:Orders = {idOrder: 0,idCustomer: 0, nameCus:'',  dayOrder: new Date(), status: 0,note:''};
  datas:Orders[];
  detail:orderDetail[];
  shipping:Ship[]
 
  public keyword:string;

  public pages:number[];
  pageSize: 5;
  p:number=1;
  filterTerm:string;
  // public Editor = ClassicEditor;
  private searchedSubject=new Subject<string>();

  constructor(private orderService:OrderService, private httpClient:HttpClient) { }

  
  ngOnInit(): void {
    this.getAll();
    this.getDetail();
    this.Ship();
  }
  
  
  
  getAll(){
    this.orderService.getAll().subscribe((res:any)=>{
      console.log("ré",res)
      this.datas=res;
      console.log(this.datas);
    })
  }
  selectedSP:Orders ={ idOrder: 0,idCustomer: 0, nameCus:'',  dayOrder: new Date(), status: 0,note:''};
  // shipping:Ship={shipId:0,customerName:'',customerEmail:'',customerPhone:'',note:'',payments:'',nameOnCard:'',cardNumber:0,issueDate:new Date(),idOrder:0,address:''}
  onselect(pr:Orders):void{
    this.selectedSP=pr;
    // alert(`selectedSP=${JSON.stringify(this.selectedSP.idOrder)}`);
     // this.selectedSP=pr;
    
     this.httpClient.get(detailURL  + this.selectedSP.idOrder).subscribe((dt:any)=>{
      //console.log("ré",detail)
      this.detail = dt;
      console.log('aaa',this.detail);
    })
    this.httpClient.get(shipURL  + this.selectedSP.idOrder ).subscribe((ship:any)=>{
      //console.log("ré",detail)
      this.shipping = ship;
      console.log('ship',this.shipping);
    })
    
    // getAllDetail(id: any) {
    //   return this.apiService
    //     .get('/api/TinTucs/GetTinTucDetails/' + id)
    //     .subscribe((data) => {
    //       this.tinTucDetails = data;
    //     });
    // }
  }
  
  getDetail():void {
   // this.selectedSP=pr;
  
  }
  Ship():void {
    var id=this.selectedSP.idOrder;
    this.httpClient.get(shipURL  + id ).subscribe((ship:any)=>{
      //console.log("ré",detail)
      this.shipping = ship;
      console.log('ship',this.shipping);
    })

    console.log('ship2',id);
   }

  getOne(id:number){
    
    this.orderService.get(id).subscribe((res:any)=>{
     
    this.datas=res
    })
  }
  
  addSP() :any{
    this.orderService
    .AddPr(this.orders)
    .subscribe(data =>{ this.datas.push(data) });
    return this.getAll();
  }
  
   deleteSP(id:number){
     this.orderService.deletePr(this.orders.idOrder=id).subscribe(
       data=>{  window.location.reload(); }
       // return this.getAll();
        // alert(`sản phẩ ${id}`);
     );
   }
  
  putpr(id: number): void {
    // console.log(this.selectedSP.status)
    this.selectedSP.status = Number(this.selectedSP.status)
    this.httpClient.put(baseURL +'/' + id, this.selectedSP).subscribe(
      data => {
    // alert("sửa xong");
    console.log(data)
        this.getAll();    
      }, error => {
        //this.editError();
        console.log("Error", error);
      })
  }

  changeStatus(id:number): void{
    console.log(id)
    for (let i = 0; i < this.datas.length; i++) {
      if(this.datas[i].idOrder == id){
        if(this.datas[i].status == 1){
         
          this.httpClient.put(baseURL +'/' + id , this.datas[i].status == 0).subscribe(
            data => {
          // alert("sửa xong");
             console.log("hhh"+data)
              this.getAll();    
            }, error => {
            
              console.log("Error", error);
            })
        }
        else{
          this.datas[i].status = 1;
          this.httpClient.put(baseURL +'/' + id , this.datas[i].status == 1).subscribe(
            data => {
          // alert("sửa xong");
          console.log("hhh"+data)
              this.getAll();    
            }, error => {
            
              console.log("Error", error);
            }) 
        }
      }
      
    }
  }
    Search(){
      if(this.keyword==""){
        this.getAll();
      }
      else{
        this.orderService.Search(this.keyword).subscribe((data)=>{
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
