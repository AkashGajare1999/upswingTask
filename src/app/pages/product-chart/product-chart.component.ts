import { Component, OnInit } from '@angular/core';
import { UserManagmentService } from '../../services/user-managment.service';
import { Router } from '@angular/router';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-product-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './product-chart.component.html',
  styleUrl: './product-chart.component.css',
})
export class ProductChartComponent implements OnInit {
  chartData: any;
  chartOptions: any;
  ProductData: any[] = [];
  constructor(
    private router: Router,
    public userService: UserManagmentService
  ) {}

  ngOnInit(): void {
    this.getAllData();
  }

  clicktoProductList() {
    this.router.navigate(['/UserManagement']);
  }

  getAllData() {
    this.userService.getAllProducts().subscribe((res: any) => {
      this.ProductData = res;

      this.showchartData();
      console.log(res);
    });
  }

  showchartData() {
    debugger;
    this.chartData = {
      labels: this.ProductData.map((product) => product.category.value),
      datasets: [
        {
          label: 'Price',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: this.ProductData.map((product) => product.totalprice),
        },
      ],
    };

    this.chartOptions = {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Brand',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Price',
          },
        },
      },
    };
  }
}
