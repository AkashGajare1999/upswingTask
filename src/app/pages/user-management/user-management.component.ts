import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { UserManagmentService } from '../../services/user-managment.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    NgIf,
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  Products!: any[];
  filterData!: any[];

  addUserFormData!: FormGroup;
  UpdateUserFormData!: FormGroup;
  showProductvisible: boolean = false;
  AddProductvisible: boolean = false;
  UpdateProductvisible: boolean = false;
  viewproductItem: any;
  categories!: any[];
  EditId: any;
  paginatedData!: any[];
  totalRecords!: number;
  rows!: number;
  loading!: boolean;
  search!: string;
  showmessage!: boolean;
  constructor(
    private router: Router,
    public userService: UserManagmentService,
    public fb: FormBuilder
  ) {
    this.rows = 10;
    this.totalRecords = 0;
    this.Products = [];
    this.paginatedData = [];
  }
  ngOnInit(): void {
    this.categories = [
      { value: 'fast food' },
      { value: 'Rome' },
      { value: 'London' },
      { value: 'Istanbul' },
      { value: 'Paris' },
    ];
    this.addUserFormData = this.fb.group({
      brandname: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      productname: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      category: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      actualprice: ['', [Validators.required]],
      totalprice: ['', [Validators.required]],
    });

    this.UpdateUserFormData = this.fb.group({
      brandname: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      productname: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      category: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      actualprice: ['', [Validators.required]],
      totalprice: ['', [Validators.required]],
    });

    this.getAllProductsData();
  }

  // here is get all form control
  get addUserFormDataControls() {
    return this.addUserFormData.controls;
  }

  get UpdateUserFormDataControls() {
    return this.UpdateUserFormData.controls;
  }
  //

  // Add product functionalities with all
  DissmissaddProductModal() {
    this.addUserFormData.reset();
    this.AddProductvisible = false;
  }

  addProductshowModal() {
    this.addUserFormData.reset();
    this.AddProductvisible = true;
  }
  addProduct() {
    debugger;
    if (this.addUserFormData.invalid) {
      this.showmessage = true;
      return;
    }
    this.userService
      .addProduct(this.addUserFormData.value)
      .subscribe((res: any) => {
        this.getAllProductsData();
        this.showmessage = false;

        this.AddProductvisible = false;
        this.addUserFormData.reset();
        console.log(res);
      });
  }

  AddProductDialog() {
    this.AddProductvisible = true;
  }

  //

  // get all products with paginaion and search filter
  getAllfilterData() {
    if (this.search !== '') {
      this.Products = this.filterData.filter((data: any) => {
        return (
          data.productname
            .toLocaleLowerCase()
            .includes(this.search.toLocaleLowerCase()) ||
          data.brandname
            .toLocaleLowerCase()
            .includes(this.search.toLocaleLowerCase())
        );
      });
      this.totalRecords = this.Products.length;
      this.paginate({ first: 0, rows: this.rows });
    } else {
      this.getAllProductsData();
    }
  }

  getAllProductsData() {
    this.userService.getAllProducts().subscribe((res: any) => {
      this.Products = res;
      this.filterData = res;
      this.totalRecords = this.Products.length;
      this.paginate({ first: 0, rows: this.rows });
      console.log(res);
    });
  }

  paginate(event: any) {
    const start = event.first;
    const end = start + event.rows;
    this.paginatedData = this.Products.slice(start, end);
  }

  //

  // Update product functionalities with all
  UpdateProduct() {
    if (this.UpdateUserFormData.invalid) {
      this.showmessage = true;
      return;
    }
    this.userService
      .updateProduct(this.EditId, this.UpdateUserFormData.value)
      .subscribe((res: any) => {
        this.getAllProductsData();
        this.showmessage = false;

        this.UpdateProductvisible = false;
        console.log(res);
      });
  }
  DissmissUpdateProductModal() {
    this.UpdateProductvisible = false;
  }

  editProduct(data: any) {
    this.EditId = data.id;
    this.UpdateUserFormData.setValue({
      brandname: data.brandname,
      productname: data.productname,
      category: data.category,
      quantity: data.quantity,
      actualprice: data.actualprice,
      totalprice: data.totalprice,
    });
    this.UpdateProductvisible = true;
  }
  UpdatecheckpriceAndQuantity() {
    debugger;
    var UpdateAactualPrice =
      this.UpdateUserFormData.value.quantity *
      this.UpdateUserFormData.value.actualprice;
    this.UpdateUserFormData.patchValue({
      totalprice: UpdateAactualPrice,
    });
  }

  UpdateProductDialog() {
    this.UpdateProductvisible = true;
  }

  //

  // view single Data of product
  getProductData(id: any) {
    this.showProductvisible = true;

    this.userService.viewProduct(id).subscribe((res: any) => {
      this.viewproductItem = res[0];
      this.addUserFormData.setValue({
        brandname: res[0].brandname,
        productname: res[0].productname,
        category: res[0].category.value,
        quantity: res[0].quantity,
        actualprice: res[0].actualprice,
        totalprice: res[0].totalprice,
      });

      console.log(res);
    });
  }

  //

  // Delete product functionalities
  DeleteProduct(id: any) {
    this.userService.DeleteProduct(id).subscribe((res: any) => {
      this.getAllProductsData();
      console.log(res);
    });
  }

  // here i have calculate total price functionalities
  checkpriceAndQuantity() {
    debugger;
    var AactualPrice =
      this.addUserFormData.value.quantity *
      this.addUserFormData.value.actualprice;
    this.addUserFormData.patchValue({
      totalprice: AactualPrice,
    });
  }

  backToDashboard() {
    this.router.navigate(['/']);
  }

  showProductModal() {
    this.showProductvisible = true;
  }
}
