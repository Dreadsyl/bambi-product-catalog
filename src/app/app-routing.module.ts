import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { EditComponentComponent } from './components/admin/edit-component/edit-component.component';
import { NewComponentComponent } from './components/admin/new-component/new-component.component';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductClassComponent } from './components/admin/product-class/product-class.component';
import { RegisterComponent } from './components/auth/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminHomeComponent },
  { path: 'admin/update/:id', component: EditComponentComponent },
  { path: 'admin/new-product', component: NewComponentComponent },
  { path: 'admin/product-class', component: ProductClassComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
