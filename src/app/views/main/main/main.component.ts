import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  showPopup: boolean = false;
  popupSubscription!: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.popupSubscription = timer(10000).subscribe(() => {
      this.showPopup = true;
    });
  }

  ngOnDestroy(): void {
    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }
  }

}