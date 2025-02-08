const mongoose = require('mongoose');
const {Schema} = mongoose;
main().
then(()=>{console.log("connection successful")})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}
const orderSchema = new Schema({    
    item: String,
    price: Number,         
});
const Orders = mongoose.model('Orders', orderSchema);
const addOrders = async () => {
    let res = await Orders.insertMany([
    {item : "samosa",price: 12},
    {item : "chips",price: 10},
    {item : "choclate",price: 40}
    ]);
    // console.log(res);
    }
addOrders();

const customerSchema = new Schema({
    name: String,
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Orders'
      }
    ]
});
const Customer = mongoose.model('Customer', customerSchema);
// const addCustomers = async () => {
//   let cust1 = new Customer({
//     name: 'John Doe',
//   });
//     let order1 = await Orders.findOne({ item: 'chips' });
//     let order2 = await Orders.findOne({ item: 'choclate' });
//     cust1.orders.push(order1);
//     cust1.orders.push(order2);
//     let result = await cust1.save();
//     console.log(result);
// };
// addCustomers();

// approach 2
// Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s).
// Populated paths are no longer set to their original _id , their value is replaced with the mongoose document returned from the database by performing a separate query before returning the results.

const findCustomers = async () => {
    let result = await Customer.find({}).populate('orders');
    console.log(result);
};
findCustomers();