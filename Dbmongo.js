const mongoose = require('mongoose')

// Create schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    }
});


// Create model
const User = mongoose.model('User', userSchema)

// Connect to the database
mongoose.connect('mongodb://localhost:27017/testone')
.then(()=>{
    console.log("Database connected successfully");
})
.catch(err=>{
    console.log(err)
});

// Create and save a document

// const addNewUser = async()=>{
//     const newUser = new User({
//         name: 'Daniel',
//         email: 'daniel@gmail.com',
//         password: '123',
//         phone: '080999666419',
//         age: 20
//     })
//     await newUser.save()
//     console.log(newUser);
// };
// addNewUser();

// Fetch all users
// const getAllUsers = async ()=>{
//     const users = await User.find()
//     console.log(users);
// }
// getAllUsers();

// Fetch a user 
// const getOneUser = async ()=>{
//     const user = await User.find({age: 20})
//     console.log(user);
// };
// getOneUser();

// Fetch one document or record by id
// const getUserById = async ()=>{
//     const user = await User.find({age: {$gte: 22}});
//     console.log(user);
// };
// getUserById()

// Update documents
// const updateUserById = async ()=>{
//     const user = await User.findById('66421ae3e95f1356ef887050')
//     user.name = 'Onyinyechi';
//     await user.save();
//     console.log(user);
// };
// updateUserById();

// Delete documents
const deleteUser = async () =>{
    const user = await User.findByIdAndDelete('66421a481605130ca6ceb2c4')
    console.log(user);
}
deleteUser();







