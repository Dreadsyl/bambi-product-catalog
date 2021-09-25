import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import * as uuid from 'uuid';

@Component({
  selector: 'pm-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.css'],
})
export class NewComponentComponent implements OnInit {
  productClasses: [{ id: string; title: string }] = [] as any;
  productForm: FormGroup;
  postId: any;
  currentUser: any;
  message: any;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private fb: FormBuilder,
    private token: TokenStorageService
  ) {
    this.productForm = this.fb.group({
      id: uuid.v4(),
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
      active: false,
      thumbnail: this.fb.group({
        id: uuid.v4(),
        imageName: '',
      }),
      images: this.fb.array([
        this.fb.group({
          id: '',
          imageName: '',
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
      likes: [0],
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
    console.log(this.foreignNames);
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

  //CUSTOM ATTRIBUTES
  get customAttributes(): FormArray {
    return this.productForm.get('customAttributes') as FormArray;
  }
  addCustomAttributes(): void {
    this.customAttributes.push(
      this.fb.group({
        key: ['', [Validators.required]],
        prompt: ['', [Validators.required]],
        value: [],
      })
    );
  }
  removeCustomAttributes(index: number): void {
    this.customAttributes.removeAt(index);
  }

  //PRODUCT-CLASS
  toStr = JSON.stringify;
  selectClass(event: any): void {
    let classValue = JSON.parse(event.value);
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

  //-----SERVICES-----//
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.productClassesList();
  }

  onSubmit() {
    this.productService.saveProduct(this.productForm.value).subscribe(
      () => {
        this.showMessage('Proizvod je kreiran!', 'success');
      },
      (err) => {
        this.showMessage(err.error.message, 'error');
      }
    );
  }
}
