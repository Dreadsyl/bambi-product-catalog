import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models';
import { ProductsService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'pm-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  searchProduct: any;
  products: Product[] = [];
  currentUser: any;

  noImage = '/assets/images/no-image.png';

  constructor(
    private productService: ProductsService,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();

    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (err) => {
        console.log('error: ' + err.error.message);
      }
    );
  }
}
