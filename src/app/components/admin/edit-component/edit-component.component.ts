import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models';
import { ProductsService } from 'src/app/services/product.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'pm-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css'],
})
export class EditComponentComponent implements OnInit, OnDestroy {
  productId: string = '';
  product!: Product;
  currentUser: any;
  message: any;

  productClasses: [{ id: string; title: string }] = [] as any;
  productForm: FormGroup;

  routeSub: Subscription = new Subscription();
  productSub: Subscription = new Subscription();

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
    private fb: FormBuilder,
    private token: TokenStorageService
  ) {
    this.productForm = this.fb.group({
      id: [''],
      productName: ['', [Validators.required, Validators.minLength(3)]],
      productCode: ['', [Validators.required]],
      tags: this.fb.array(
        [this.fb.control('', [Validators.required])],
        [Validators.required]
      ),
      foreignNames: this.fb.array(
        [
          this.fb.group({
            countryCode: ['', [Validators.required]],
            name: ['', [Validators.required]],
          }),
        ],
        [Validators.required]
      ),
      productClass: ['', [Validators.required]],
      active: [''],
      thumbnail: this.fb.group({
        id: '',
        imageName: '',
      }),
      images: this.fb.array([
        this.fb.group({
          id: [''],
          imageName: [''],
        }),
      ]),
      unit: ['', [Validators.required]],
      eANCode: ['', [Validators.required]],
      eANPackageCode: ['', [Validators.required]],
      logisticData: this.fb.array(
        [
          this.fb.group({
            key: ['', [Validators.required]],
            prompt: ['', [Validators.required]],
            value: [, [Validators.required]],
          }),
        ],
        [Validators.required]
      ),
      customAttributes: this.fb.array(
        [
          this.fb.group({
            key: ['', [Validators.required]],
            prompt: ['', [Validators.required]],
            value: [],
          }),
        ],
        [Validators.required]
      ),
      likes: [Number],
      description: [''],
    });
  }

  get productNameControl(): FormControl {
    return this.productForm.get('productName') as FormControl;
  }
  get productCodeControl(): FormControl {
    return this.productForm.get('productCode') as FormControl;
  }
  get productClassControl(): FormControl {
    return this.productForm.get('productClass') as FormControl;
  }
  get unitControl(): FormControl {
    return this.productForm.get('unit') as FormControl;
  }
  get eANCodeControl(): FormControl {
    return this.productForm.get('eANCode') as FormControl;
  }
  get eANPackageCodeControl(): FormControl {
    return this.productForm.get('eANPackageCode') as FormControl;
  }

  //-----FUNCTIONS-----//

  //TAGS
  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }
  addTag(): void {
    this.tags.push(new FormControl('', [Validators.required]));
  }
  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  //FOREIGN NAMES
  get foreignNames(): FormArray {
    return this.productForm.get('foreignNames') as FormArray;
  }
  addForeignNames(): void {
    this.foreignNames.push(
      this.fb.group({
        countryCode: ['', [Validators.required]],
        name: ['', [Validators.required]],
      })
    );
  }
  removeForeignNames(index: number): void {
    this.foreignNames.removeAt(index);
  }

  //LOGISTIC DATA
  get logisticData(): FormArray {
    return this.productForm.get('logisticData') as FormArray;
  }
  addLogisticData(): void {
    this.logisticData.push(
      this.fb.group({
        key: ['', [Validators.required]],
        prompt: ['', [Validators.required]],
        value: [, [Validators.required]],
      })
    );
  }
  removeLogisticData(index: number): void {
    this.logisticData.removeAt(index);
  }

  //CUSTOM ATTRIBUTE
  get customAttributes(): FormArray {
    return this.productForm.get('customAttributes') as FormArray;
  }
  addCustomAttributes(): void {
    this.customAttributes.push(
      this.fb.group({
        key: ['', [Validators.required]],
        prompt: ['', [Validators.required]],
        value: [, [Validators.required]],
      })
    );
  }
  removeCustomAttributes(index: number): void {
    this.customAttributes.removeAt(index);
  }

  //PRODUCT-CLASS
  toStr = JSON.stringify;
  selectClass(event: any): void {
    let classValue = JSON.parse(event.target.value);
    this.productForm.patchValue({
      productClass: classValue,
    });
  }
  productClassesList(): void {
    this.productService.getProductClass().subscribe((data) => {
      this.productClasses = data;
    });
  }

  //ACTIVE
  isActive(event: any) {
    this.productForm.patchValue({
      active: event.checked,
    });
  }

  //MODAL
  showMessage(msg: any, id: any) {
    this.message = msg;
    document.getElementById(id)?.setAttribute('style', 'display: block');

    setTimeout(() => {
      document.getElementById(id)?.setAttribute('style', 'display: none');
      if (id === 'success') {
        this.router.navigate(['/admin']);
      }
    }, 2000);
  }

  //SERVICES
  onSubmit() {
    this.productService
      .updateProduct(this.productForm.value, this.productForm.value.id)
      .subscribe(
        () => {
          this.showMessage('Proizvod je ažuriran!', 'success');
        },
        (err) => {
          this.showMessage(err.error.message, 'error');
        }
      );
  }

  onDelete() {
    this.productService.deleteProduct(this.product.id).subscribe(
      () => {
        this.showMessage('Proizvod je uklonjen!', 'success');
      },
      (err) => {
        this.showMessage(err.error.message, 'error');
      }
    );
  }

  //-----LOADING-----//

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.productClassesList();
    this.initDetails();
  }

  initDetails(): void {
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      this.productId = params['id'];
      this.getProductDetails(this.productId);
    });
  }

  getProductDetails(id: string): void {
    this.productSub = this.productService
      .getProductDetails(id)
      .subscribe((data: Product) => {
        this.product = data;

        //FILL THE FORM
        this.productForm.patchValue({
          id: this.product.id,
          productName: this.product.productName,
          productCode: this.product.productCode,
          productClass: this.productClasses.find(
            (item) => this.product.productClass.id == item.id
          ),
          active: this.product.active,
          unit: this.product.unit,
          eANCode: this.product.eANCode,
          eANPackageCode: this.product.eANPackageCode,
          likes: this.product.likes,
          thumbnail: this.product.thumbnail,
          description: this.product.description,
        });

        this.product.tags.forEach((tag) => {
          let temp = this.fb.control(tag);
          this.tags.push(temp);
        });

        this.product.foreignNames.forEach((fName) => {
          let temp = this.fb.control(fName);
          this.foreignNames.push(
            this.fb.group({
              countryCode: temp.value.countryCode,
              name: temp.value.name,
            })
          );
        });

        this.product.logisticData.forEach((lData) => {
          let temp = this.fb.control(lData);
          this.logisticData.push(
            this.fb.group({
              key: temp.value.key,
              prompt: temp.value.prompt,
              value: temp.value.value,
            })
          );
        });

        this.product.customAttributes.forEach((cAtt) => {
          let temp = this.fb.control(cAtt);
          this.customAttributes.push(
            this.fb.group({
              key: temp.value.key,
              prompt: temp.value.prompt,
              value: temp.value.value,
            })
          );
        });
      });
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
