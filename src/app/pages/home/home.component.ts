import { Component, signal } from '@angular/core';
import { GreetingComponent } from '../../component/greeting/greeting.component';
import { CounterComponent } from '../../component/counter/counter.component';

@Component({
  selector: 'app-home',
  imports: [GreetingComponent,CounterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 homeMessage = signal("hello folly");
 KeyUpHandler(){
  console.log("this is key up")
 }
 ClickHandler(){
  console.log("this is key up")
 }
 ClickEventHandler(event:KeyboardEvent){
  console.log("this is key up",event)
  console.log("user press the" + event.key +" key")
 }
}
