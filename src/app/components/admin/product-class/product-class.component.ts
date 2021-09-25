import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import * as uuid from 'uuid';

@Component({
  selector: 'pm-product-class',
  templateUrl: './product-class.component.html',
  styleUrls: ['./product-class.component.css'],
})
export class ProductClassComponent implements OnInit {
  productClasses = [
    {
      id: '',
      title: '',
    },
  ];
  productClass;
  currentUser: any;
  message: any;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private token: TokenStorageService
  ) {
    this.productClass = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.productService.getProductClass().subscribe((data) => {
      this.productClasses = data;
    });
  }

  showMessage(msg: any, id: any) {
    this.message = msg;
    document.getElementById(id)?.setAttribute('style', 'display: block');

    setTimeout(() => {
      document.getElementById(id)?.setAttribute('style', 'display: none');
      if (id === 'success') {
        window.location.reload();
      }
    }, 2000);
  }

  addNewClass() {
    this.productClass.setValue({
      id: uuid.v4(),
      title: this.productClass.value.title.toUpperCase(),
    });
    this.productService.addProductClass(this.productClass.value).subscribe(
      () => {
        this.showMessage('Marka je kreirana!', 'success');
      },
      (err) => {
        this.showMessage(err.error.message, 'error');
      }
    );
  }

  deleteClass(id: string) {
    this.productService.deleteProductClass(id).subscribe(
      (data) => {
        this.showMessage('Marka je izbrisana!', 'success');
      },
      (err) => {
        this.showMessage(err.error.message, 'error');
      }
    );
  }
}
