import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CatService } from './services/cat.service';
import { OrderService} from "./services/order.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  //
  // order={};
  // orders=[];
  // //
  constructor(public auth: AuthService,
              private orderService:OrderService,) { }
  //
  // ngOnInit(){
  //   // this.getOrders;
  //   // this.deleteAll();
  // }
  // //
  // getOrders(){
  //   this.orderService.getOrders().subscribe(
  //     data=>this.orders = data,
  //     error=>console.log(error),
  //   )
  // }
  // //
  // deleteOrder2(order){
  //
  //   this.orderService.deleteOrder(order).subscribe(
  //     res => {
  //       const pos = this.orders.map(elem => elem._id).indexOf(order._id);
  //       this.orders.splice(pos, 1);
  //     },
  //     error => console.log(error)
  //   );
  //
  // }
  //
  //
  // deleteAll(){
  //   Object.keys(this.orders).forEach(key=>this.deleteOrder2(this.orders[key]))
  // }
}
