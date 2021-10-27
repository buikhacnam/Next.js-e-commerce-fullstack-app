import validator from 'validator'
import bcrypt from 'bcryptjs'
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [50, 'Name must be less than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    role: {
        type: String,
        enum: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

//Encrypt password using bcrypt before saving User
userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    } else {
        next()
    }
})

// syntax in nextjs:  if user model already exists, use it / if not create it
module.exports = mongoose.models.User || mongoose.model('User', userSchema)