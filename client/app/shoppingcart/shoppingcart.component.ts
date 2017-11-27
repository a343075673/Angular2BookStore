import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { CatService } from '../services/cat.service';
import { OrderService} from "../services/order.service";
import { ToastComponent } from '../shared/toast/toast.component';
@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  order={};
  orders=[];

  isLoading = true;
  isEditing = false;
  showSelected : boolean;

  constructor(private catService: CatService,
              private orderService:OrderService,
              private router: Router,
              private formBuilder: FormBuilder,
              public toast: ToastComponent,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getOrders();
    // this.countOrders();


    //
    // this.addCatForm = this.formBuilder.group({
    //   id: this.id,
    //   name: this.name,
    //   age: this.age,
    //   weight: this.weight
    // });
  }

  //
  // getCats() {
  //   this.catService.getCats().subscribe(
  //     data => this.cats = data,
  //     error => console.log(error),
  //     () => this.isLoading = false
  //   );
  // }


  getOrders(){
    this.orderService.getOrders().subscribe(
      data=>this.orders = data,
      error=>console.log(error),
      ()=>this.isLoading = false
    )
  }
// countOrders(){
//     this.orderService.countOrders().subscribe(
//       data=>this.orders=data,
//       error=>console.log(error)
//     )}



  //
  // addCat() {
  //   this.catService.addCat(this.addCatForm.value).subscribe(
  //     res => {
  //       const newCat = res.json();
  //       this.cats.push(newCat);
  //       this.addCatForm.reset();
  //       this.toast.setMessage('item added successfully.', 'success');
  //     },
  //     error => console.log(error)
  //   );
  // }

  // enableEditing(cat) {
  //   this.isEditing = true;
  //   this.cat = cat;
  // }
  // enableEditing(order){
  // this.isEditing=true;
  // this.order=order;
  // }

  // cancelEditing() {
  //   this.isEditing = false;
  //   this.cat = {};
  //   this.toast.setMessage('item editing cancelled.', 'warning');
  //   // reload the cats to reset the editing
  //   this.getCats();
  // }
  //
  // editCat(cat) {
  //   this.catService.editCat(cat).subscribe(
  //     res => {
  //       this.isEditing = false;
  //       this.cat = cat;
  //       this.toast.setMessage('item edited successfully.', 'success');
  //     },
  //     error => console.log(error)
  //   );
  // }

  //
  // deleteCat(cat) {
  //   if (window.confirm('Are you sure you want to permanently delete this item?')) {
  //     this.catService.deleteCat(cat).subscribe(
  //       res => {
  //         const pos = this.cats.map(elem => elem._id).indexOf(cat._id);
  //         this.cats.splice(pos, 1);
  //         this.toast.setMessage('item deleted successfully.', 'success');
  //       },
  //       error => console.log(error)
  //     );
  //   }
  // }

  deleteOrder(order){
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.orderService.deleteOrder(order).subscribe(
        res => {
          const pos = this.orders.map(elem => elem._id).indexOf(order._id);
          this.orders.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  deleteOrder2(order){

    this.orderService.deleteOrder(order).subscribe(
      res => {
        const pos = this.orders.map(elem => elem._id).indexOf(order._id);
        this.orders.splice(pos, 1);
        this.toast.setMessage('cart empty!', 'success');
      },
      error => console.log(error)
    );

  }

  // removeOrder(){
  // if(window.confirm('are you sure you want to empty your cart?')){
  //   this.orderService.removeCart().subscribe(
  //     data=>this.orders=data,
  //     error=>console.log(error)
  //   )
  // }
  // }



  deleteAll(){
    Object.keys(this.orders).forEach(key=>this.deleteOrder2(this.orders[key]))
  }

}

