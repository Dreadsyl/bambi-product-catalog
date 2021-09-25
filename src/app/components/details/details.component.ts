import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models';
import { ProductsService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'pm-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  productId: string = '';
  product!: Product;

  routeSub: Subscription = new Subscription();
  productSub: Subscription = new Subscription();

  currentUser: any;
  isLiked: boolean = false;
  noImage = '/assets/images/no-image.png';
  noProductClass = 'MARKA NE POSTOJI';

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private token: TokenStorageService
  ) {}

  like() {
    let addLike = this.product.likes + 1;
    this.product.likes = addLike;
    this.productService
      .updateProduct(this.product, this.product.id)
      .subscribe();

    window.sessionStorage.setItem(`${this.productId}`, 'liked');
    this.isLiked = true;
  }

  unlike() {
    let undoLike = this.product.likes - 1;
    this.product.likes = undoLike;
    this.productService
      .updateProduct(this.product, this.product.id)
      .subscribe();

    window.sessionStorage.removeItem(`${this.productId}`);
    this.isLiked = false;
  }

  ngOnInit(): void {
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      this.productId = params['id'];
      this.getProductDetails(this.productId);
    });
    this.currentUser = this.token.getUser();

    if (window.sessionStorage.getItem(this.productId)) {
      this.isLiked = true;
    } else {
      this.isLiked = false;
    }
  }

  getProductDetails(id: string): void {
    this.productSub = this.productService.getProductDetails(id).subscribe(
      (data: Product) => {
        this.product = data;
      },
      (err) => {
        console.log('error: ' + err.error.message);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
