import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models';
import { ProductsService } from '../../services/product.service';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  searchProduct: any;
  filterClass: any[] = [];
  temp: any[] = [];
  filteredProducts: Product[] = [];
  tempArray: any[] = [];
  newArray: any[] = [];

  noImage = '/assets/images/no-image.png';
  noProductClass = 'MARKA NE POSTOJI';

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data;
        data.forEach((element: any) => {
          this.temp.push(element.productClass.title);
          this.filterClass = this.temp.filter((elem, index, self) => {
            return index === self.indexOf(elem);
          });
        });
      },
      (err) => {
        console.log('error: ' + err.error.message);
      }
    );
  }

  colorToggle(id: any, color: any, bg: any) {
    document
      .getElementById(id)
      ?.setAttribute('style', `color: ${color}; background-color: ${bg}`);
  }

  onChange(event: any) {
    if (event.target.checked) {
      this.tempArray = this.filteredProducts.filter(
        (product: any) => product.productClass.title == event.target.value
      );
      this.products = [];
      this.newArray.push(this.tempArray);
      for (let i = 0; i < this.newArray.length; i++) {
        let removeArray = this.newArray[i];
        for (let i = 0; i < removeArray.length; i++) {
          let toObject = removeArray[i];
          this.products.push(toObject);
        }
      }

      this.colorToggle(event.target.parentNode.id, '#fff', '#b70215');
    } else {
      this.tempArray = this.products.filter(
        (product: any) => product.productClass.title != event.target.value
      );
      this.newArray = [];
      this.products = [];
      this.newArray.push(this.tempArray);
      for (let i = 0; i < this.newArray.length; i++) {
        let removeArray = this.newArray[i];
        for (let i = 0; i < removeArray.length; i++) {
          let toObject = removeArray[i];
          this.products.push(toObject);
        }
      }
      if (this.products.length === 0) {
        this.products = this.filteredProducts;
      }

      this.colorToggle(event.target.parentNode.id, '#b70215', '#fff');
    }
  }
}
