import * as mongoose from 'mongoose';

const catSchema = new mongoose.Schema({
  id:Number,
  name: String,
  weight: Number,
  age: Number,
  description:String
});

const Cat = mongoose.model('Cat', catSchema);

export default Cat;
