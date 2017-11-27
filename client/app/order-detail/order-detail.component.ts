import { Component, OnInit } from '@angular/core';
import { CatService } from '../services/cat.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
// import {OrderDetailComponent} from "../order-detail/order-detail.component";
import index from "@angular/cli/lib/cli";
import { ActivatedRoute } from '@angular/router';
import {OrderService} from "../services/order.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {



  cats = [];
  cat : object=null;

  totalMoney:number=0;


  id: number;
  private sub: any;
  private kk:any;





  orders=[];
  use:any;


  isLoading = true;
  isEditing = false;



  constructor(private catService: CatService,
              private formBuilder: FormBuilder,
              public auth:AuthService,
              public toast: ToastComponent,
              private activatedRoute: ActivatedRoute,
              private orderService:OrderService,) { }

  ngOnInit() {
    this.getCats();
    this.getOrders();

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.catService.getCats()
        .subscribe(res => {
          // get specific phone according to id from DB
          let tmpObj = res;
          console.log(tmpObj)
          Object.keys(tmpObj).forEach( key => {
            if (tmpObj[key].id == this.id) {
              this.cat = tmpObj[key];
              return;
            }
          });

        });

    });
    // this.totalMoney = this.orderService.getOrders().subscribe(
    //   res=>{
    //     let obj= res;
    //   console.log(obj)
    // Object.keys(obj).forEach(key=> this.totalMoney+=obj[key].price);}
    //
    // )
    //  this.use=this.orderService.getOrders().subscribe(
    //   res=>this.use = res
    // );
    // console.log(this.use);
    // this.totalMoney=Object.keys(this.use).forEach(key=> this.totalMoney+=this.use[key].price)








    // this.activatedRoute.params.subscribe(params=>
    //  this.id= params['id']
    // )
    //
    // this.getCat();
  }

  getOrders(){
    this.orderService.getOrders().subscribe(
      data=>this.orders = data,
      error=>console.log(error),
      ()=>this.isLoading = false
    )
    this.totalMoney=0;
    this.orderService.getOrders().subscribe(
      data=>{
        let obj=data;
        Object.keys(obj).forEach(key=> this.totalMoney+=obj[key].age);

      }

    )




  }

  getCats() {
    this.catService.getCats().subscribe(
      data => this.cats = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  addOrder(cat){
    this.catService.addOrder(cat).subscribe(
      res=>{
        const newOrder=res.json();
        this.orders.push(newOrder);
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
    this.totalMoney=0;
    this.orderService.getOrders().subscribe(
      data=>{
        let obj=data;
        Object.keys(obj).forEach(key=> this.totalMoney+=obj[key].age);

      }

    )
  }
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
      this.totalMoney=0;
      this.orderService.getOrders().subscribe(
        data=>{
          let obj=data;
          Object.keys(obj).forEach(key=> this.totalMoney+=obj[key].age);

        }

      )
    }
  }


  //
  // enableEditing(cat) {
  //   this.isEditing = true;
  //   this.cat = cat;
  // }
  //
  // cancelEditing() {
  //   this.isEditing = false;
  //   this.cat = {};
  //   this.toast.setMessage('item editing cancelled.', 'warning');
  //   // reload the cats to reset the editing
  //   this.getCats();
  // }

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
// getTotal():Observable<any> {
//     this.orderService.getOrders().subscribe(
//       data=>{
//         let obj=data;
//           Object.keys(obj).forEach(key=> this.totalMoney+=obj[key].age);
//
//       }
//
//     )
//   return this.kk;
// }

}
