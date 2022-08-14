import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import{FormsModule} from '@angular/forms';
// import { MainComponent } from './main/main.component';
import { MainModule } from './main/main.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LoginComponent } from './login/login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsComponent } from './main/products/products.component';
import { OrderComponent } from './main/order/order.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,ProductsComponent,OrderComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MainModule,CKEditorModule,NgxPaginationModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
