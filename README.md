<h1 align="center">Bambi Product Catalog - Frontend Documentation</h1>
<p align="center"><img src="bambi.jpg" alt="logo" width="300px" /></p>
<p align="center">This app is a simple product catalog where guest users can search for their favorite products and view the product's basic info. Registered users, after logging in, can like their favorite products, add new product classes and new products to the database, and remove the same.</p>

---

## Table of content

- [Getting Started](#getting-started)
  - [Tools Required & Installation](#tools-required)
- [Development](#development)
  - [Home Page](#home)
  - [Register / Login](#auth)
  - [Admin Page](#admin)
- [Running the App](#running-the-app)
- [Author](#author)

## Getting Started<a name="getting-started"></a>

This project was built using [Angular](https://angular.io/) and [TypeScript](https://www.typescriptlang.org/).

**Install the Angular CLI**

```bash
npm install -g @angular/cli
```

**Create a workspace and initial application**

This will install the necessary Angular npm packages and other dependencies. With this, new workspace and a simple app will be created.

```bash
ng new my-app
```

## Tools Required & Installation<a name="tools-required"></a>

There are a few additional tools needed for the app to run.

**Angular Material** - used for style

```bash
ng add @angular/material
```

**Angular Flex-Layout** - used for style

```bash
npm i -s @angular/flex-layout @angular/cdk
```

**Angular Search Filter Pipe** - filter search items

```bash
npm i ng2-search-filter
```

**UUID** - generating ids

```bash
npm i uuid
```

**JSON Server** - full fake REST API for testing

```bash
npm i json-server
```

## Development<a name="development"></a>

### Home Page<a name="home"></a> [link](https://github.com/pstojanovic/Bambi-Letnja-Praksa/tree/master/frontend/src/app/components/home)

Here users can view all the products. There is a search bar and checkboxes, where users can filter through products.
The search bar is using _ng2-search-filter_ for filtering, and the checkbox filtering is done by using checkbox state change. Function `onChange(event)` listens for an event when the checkbox is checked, and based on that creates an array that has values of all checked checkboxes. That array is then used to filter through the product array that contains all of the products.

When a product is clicked its id is stored and a new page is opened that contains [details](https://github.com/pstojanovic/Bambi-Letnja-Praksa/tree/master/frontend/src/app/components/details) of the product. If the user is logged in, on the details page, the like button is visible.

```typescript

  like() {
    ...
    this.productService
      .updateProduct(this.product, this.product.id)
    ...
  }
```

### Register / Login<a name="auth"></a>

**Registration** [link](https://github.com/pstojanovic/Bambi-Letnja-Praksa/tree/master/frontend/src/app/components/auth/register)

A registration page is a form containing 5 fields `firstName, lastName, username, email, and password` which are all required fields. The form was built using a form builder, and input fields are checked by form validators. After submitting the form the user will get either success or error message.

**Login** [link](https://github.com/pstojanovic/Bambi-Letnja-Praksa/tree/master/frontend/src/app/components/auth/login)

Login page similar to the register page contains only 2 fields `username and password`. After successfully logging in, user info is stored in session storage `token-storage.service.ts`.

```typescript
  onSubmit() {
    ...
      this.userService.login(this.loginForm.value).subscribe(
        (data) => {
          this.tokenStorage.saveUser(data);
     ...
}
```

### Admin Page<a name="admin"></a>

If logged in the user can access the admin page. On the admin page, the user can add new product classes, new products, delete existing ones or edit them.

**Product Class** [link](https://github.com/pstojanovic/Bambi-Letnja-Praksa/tree/master/frontend/src/app/components/admin/product-class)

Product class has 2 properties `id and title` and represents a class of products. Here the user can add new product classes or delete existing ones.

```typescript
  addNewClass() {
    ...
    this.productService.addProductClass(this.productClass.value)
    ...
}
  deleteClass(id: string) {
    this.productService.deleteProductClass(id)
    ...
}
```

**New Product** [link](https://github.com/pstojanovic/Bambi-Letnja-Praksa/tree/master/frontend/src/app/components/admin/new-component)

Here the user can create new products. This is a complex form group, containing multiple inputs. There are fields that are required, there is an error message for every required field.

```typescript
interface Product {
  id: string;
  productCode: string;
  productName: string;
  foreignNames: Array<ForeignName>;
  productClass: {
    id: string;
    title: string;
  };
  active: boolean;
  thumbnail: {
    id: string;
    imageName: string;
  };
  images: Array<Image>;
  unit: string;
  eANCode: string;
  eANPackageCode: string;
  logisticData: Array<LogData>;
  tags: Array<string>;
  customAttributes: Array<CustomAttributes>;
  likes: number;
  description: string;
}
```

In this form, there are few arrays, so the user can add additional input fields if required, there are buttons for adding or removing input fields. If the form is valid the user can submit it.

```typescript
 onSubmit() {
    this.productService.saveProduct(this.productForm.value)
    ...
}
```

**Edit Product** [link](https://github.com/pstojanovic/Bambi-Letnja-Praksa/tree/master/frontend/src/app/components/admin/edit-component)

Clicking on one of the products from the admin page, the user will be redirected to the edit product page. Where he can either edit/update or delete the product. Edit product page is same as new product page, where fields are already filled with data. The user can edit those fields, delete them or add new ones, or he could just delete the whole product.

```typescript
  onSubmit() {
    this.productService
      .updateProduct(this.productForm.value, this.productForm.value.id)
    ...
}
  onDelete() {
    this.productService.deleteProduct(this.product.id)
    ...
}
```

## Running the App<a name="running-the-app"></a>

**1. Running the app with backend using docker image:**

```bash
docker-compose build
```

```bash
docker-compose up
```

**2. Running the app locally using json-server**

```bash
json-server --watch productDB.json
```

```bash
ng serve
```

## Author<a name="author"></a>

[Vladimir Jerković](https://github.com/Dreadsyl)
