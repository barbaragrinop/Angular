import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {

  productName: string = 'book';
  products = [];
  isDisable = true;
  private productsSubscription : Subscription;


  constructor(private productsService: ProductsService) {
    setTimeout(() => {
      this.isDisable = false;
    }, 3000);
   }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
    this.productsSubscription = this.productsService.productsUpdated.subscribe(()=>{
      this.products = this.productsService.getProducts();
    });
  }

  onAddProduct(form){
    if(form.valid){
      this.productsService.addProduct(form.value.productName);
    }
  }

  onRemoveProduct(productName: string){
    this.products = this.products.filter(p=> p !== productName);
  }

  ngOnDestroy(){
    this.productsSubscription.unsubscribe();
  }
}
