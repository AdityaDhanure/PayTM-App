const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://adityadhanure0607:Ra6MLnQsfmPrtw5k@cluster0.j0yq53i.mongodb.net/paytm')

const userSchema = new mongoose.Schema({
    username: String,
    password:String,
    firstname:String,
    lastname:String
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId || String,
        ref: 'User'
    },
    balance: Number
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
}