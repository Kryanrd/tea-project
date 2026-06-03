import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductType } from 'src/types/product.type';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public products: ProductType[] = [];
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(
        {
          next: (data) => {
            this.products = data;
          },
          error: (err) => {
            console.log(err);
            this.router.navigate(['/']);
          }
        })
  }

}
