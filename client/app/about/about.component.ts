import { Component, OnInit } from '@angular/core';
import { CatService } from '../services/cat.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
// import {OrderDetailComponent} from "../order-detail/order-detail.component";
import index from "@angular/cli/lib/cli";

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  cat = {};
  cats = [];


  orders=[];


  isLoading = true;
  isEditing = false;


  addCatForm: FormGroup;
  addOrderForm:FormGroup;

  id = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);

  constructor(private catService: CatService,
    private formBuilder: FormBuilder,
    public auth:AuthService,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.getCats();
    // this.addCatForm = this.formBuilder.group({
    //   id: this.id,
    //   name: this.name,
    //   age: this.age,
    //   weight: this.weight
    // });

    this.addOrderForm = this.formBuilder.group({
      id:this.id,
      name: this.name,
      age: this.age,
      weight: this.weight,
    });

    this.addCatForm=this.formBuilder.group({
      id: this.id,
      name: this.name,
      age: this.age,
      weight: this.weight,
      description:this.description
    })
  }

  getCats() {
    this.catService.getCats().subscribe(
      data => this.cats = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  // addOrder(cat){
  //   this.catService.addOrder(cat).subscribe(
  //     data=>this.toast.setMessage('order added','success'),
  //     error => console.log(error)
  //   );
  // }
  addOrder(cat){
    this.catService.addOrder(cat).subscribe(
      res=>{
        const newOrder=res.json();
        this.orders.push(newOrder);
        this.toast.setMessage('item added successfully.', 'success');
      },
    error => console.log(error)
    );
  }

  addCat() {
    this.catService.addCat(this.addCatForm.value).subscribe(
      res => {
        const newCat = res.json();
        this.cats.push(newCat);
        this.addCatForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(cat) {
    this.isEditing = true;
    this.cat = cat;
  }

  cancelEditing() {
    this.isEditing = false;
    this.cat = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getCats();
  }

  editCat(cat) {
    this.catService.editCat(cat).subscribe(
      res => {
        this.isEditing = false;
        this.cat = cat;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCat(cat) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.catService.deleteCat(cat).subscribe(
        res => {
          const pos = this.cats.map(elem => elem._id).indexOf(cat._id);
          this.cats.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
