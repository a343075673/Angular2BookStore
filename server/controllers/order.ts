import Order from '../models/order';
import BaseCtrl from './base';

export default class OrderCtrl extends BaseCtrl {
  model = Order;

  remove=()=>{
    this.model.remove({});
  };
}
