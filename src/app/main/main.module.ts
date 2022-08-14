import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { NewsComponent } from './news/news.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { UsersComponent } from './users/users.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ProjectComponent } from './project/project.component';
import { CateProjectComponent } from './cate-project/cate-project.component';
import { IntroduceComponent } from './introduce/introduce.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ContactComponent } from './contact/contact.component';

export const Mainroutes: Routes = [
  {    
    path: '', component: MainComponent ,

    children: [
    //  {path: 'login', component: LoginComponent }, 
      {path:'',component:HomeComponent},
      { path: 'products', component: ProductsComponent }, 
       { path: 'users', component: UsersComponent },
      {path:'news',component: NewsComponent},
      {path:'projects',component: ProjectComponent},
      {path:'cateProjects',component: CateProjectComponent},
      {path:'introduce',component: IntroduceComponent},
      {path:'orders',component: OrderComponent},
      {path:'contact',component: ContactComponent},
    ]
    
  },

];

@NgModule({
  declarations: [
    MainComponent,
    
    // UsersComponent,
    LeftSidebarComponent,
    NewsComponent,
    UsersComponent,
    ProjectComponent,
    CateProjectComponent,
    IntroduceComponent,
    HomeComponent,
    ContactComponent
    
  
    
  ],
  imports: [
    CommonModule,
    // MainsRoutingModule,
     FormsModule,
     CKEditorModule,
     AngularEditorModule,
     ReactiveFormsModule,
    CommonModule, RouterModule.forChild(Mainroutes)
  ]
})
export class MainModule { }
// function Mainroutes(Mainroutes: any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
//   throw new Error('Function not implemented.');
// }

