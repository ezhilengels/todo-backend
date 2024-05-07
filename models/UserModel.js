const mongoose = require('mongoose')
const brcypt = require('bcrypt')
const validator = require('validator')
const {Schema} = mongoose

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    
    },
    password:{
        type: String,
        required: true
    
    }
})

//static signup methode
UserSchema.statics.signup = async function(email, password) {
    //validation
    if(!email || !password) {
        throw Error('All field must be filled')
    }
    if(!validator.isEmail(email)) {
        throw Error('Entered valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Please enter strong password')
    }
    const exists = await this.findOne({email})
    if(exists) {
        throw Error('Email already in use')
    }
    const salt = await brcypt.genSalt(10)
    const hash = await brcypt.hash(password, salt)
    const user = this.create({email, password: hash})
    return user
}

//static login methode
UserSchema.statics.login = async function(email, password) {
    //validation
    if(!email || !password) {
        throw Error('All field must be filled')
    }
    const user = await this.findOne({email})
    if(!user) {
        throw Error('Incorrect email')
    }
    const match = await brcypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }
    return user
}

module.exports = mongoose.model('User', UserSchema)