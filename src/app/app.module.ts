import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { EditComponentComponent } from './components/admin/edit-component/edit-component.component';
import { NewComponentComponent } from './components/admin/new-component/new-component.component';
//search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductsService } from './services/product.service';
import { ProductClassComponent } from './components/admin/product-class/product-class.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { UserService } from './services/user.service';
import { TokenStorageService } from './services/token-storage.service';
import { HeaderComponent } from './components/menu/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    MenuComponent,
    LoginComponent,
    AdminHomeComponent,
    EditComponentComponent,
    NewComponentComponent,
    PageNotFoundComponent,
    ProductClassComponent,
    RegisterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [ProductsService, UserService, TokenStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
