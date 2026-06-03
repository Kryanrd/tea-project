import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  isFormVisible: boolean = true;
  errorMessage: string = '';

  orderForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-ЯЁ]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-ЯЁ]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^\\+?\\d{11}$')]],
    country: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яёА-ЯЁ]+$')]],
    index: ['', [Validators.required, Validators.pattern('^\\d+$')]],
    address: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-ЯёЁ0-9\\s\\-/]+$')]],
    product: [''],
    comment: ['']
  })

  get firstName(): AbstractControl<string | null, string | null> | null {
    return this.orderForm.get('firstName');
  }

  get lastName(): AbstractControl<string | null, string | null> | null {
    return this.orderForm.get('lastName');
  }

  get phone(): AbstractControl<string | null, string | null> | null {
    return this.orderForm.get('phone');
  }

  get country(): AbstractControl<string | null, string | null> | null {
    return this.orderForm.get('country');
  }

  get index(): AbstractControl<string | null, string | null> | null {
    return this.orderForm.get('index');
  }

  get address(): AbstractControl<string | null, string | null> | null {
    return this.orderForm.get('address');
  }

  get product(): AbstractControl<string | null, string | null> | null {
    return this.orderForm.get('product');
  }

  get comment(): AbstractControl<string | null, string | null> | null {
    return this.orderForm.get('comment');
  }

  constructor(private fb: FormBuilder, private activedRoute: ActivatedRoute, private productServise: ProductService) { }

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.activedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.orderForm.patchValue({ product: params['product'] });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

  public createOrder(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    const formValue = this.orderForm.value;
    this.subscriptionOrder = this.productServise.createOrder({
      name: formValue.firstName ?? '',
      last_name: formValue.lastName ?? '',
      phone: formValue.phone ?? '',
      country: formValue.country ?? '',
      zip: formValue.index ?? '',
      product: formValue.product ?? '',
      address: formValue.address ?? '',
      comment: formValue.comment ?? ''
    })
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.isFormVisible = false;
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Произошла ошибка. Попробуйте еще раз.';
          }
        },
        error: () => {
          this.errorMessage = 'Произошла ошибка. Попробуйте еще раз.';
        }
      });
  }


}
