import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductClassComponent } from './product-class.component';

describe('ProductClassComponent', () => {
  let component: ProductClassComponent;
  let fixture: ComponentFixture<ProductClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
