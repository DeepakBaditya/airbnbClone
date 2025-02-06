const mongoose = require('mongoose');
const {Schema} = mongoose;
main().
then(()=>{console.log("connection successful")})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}
const userSchema = new Schema({
  userName: String,
  addresses: [
    {
        _id : false,
        location : String,
        city: String,
    },
  ],                     
});
const User = mongoose.model('User', userSchema);
const addUsers = async () => {
    const user1 = new User({
        userName: 'John Doe',
        addresses: [
        { location: 'Street 1', city: 'City 1' },
        { location: 'Street 2', city: 'City 2' },
        ],
    });
    //user1.addresses.push({ location: 'Street 2', city: 'City 2' });
    // Save the user to the database
    const result = await user1.save();
    console.log(result);
    }
addUsers();