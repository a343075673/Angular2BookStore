import * as mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  id:Number,
  name: String,
  weight: Number,
  age: Number
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
