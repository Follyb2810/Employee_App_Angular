import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
 counter = 0;
 counterValue = signal(0);
 count = signal(0);
//  constructor(private cdr: ChangeDetectorRef) {}
 increment(){
  this.counter++;
   this.counterValue.set(this.counterValue() + 1);
   this.count.update(val =>val +1);
   
 }
 decrement(){
  if (this.counter > 0) {
    this.counter--;
  }
  this.counterValue.set(this.counterValue() - 1);
  this.count.update(val =>val -1);
  
}
reset(){
   this.count.set(0);
  this.counterValue.set(0);
  this.counter = 0;
 }
}
