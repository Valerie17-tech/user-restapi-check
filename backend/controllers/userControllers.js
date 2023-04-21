const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const axios = require('axios');

//@desc Register new User
//@route POST /api/users
//@access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, phone, password} = req.body

    if(!name || !email || !phone || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('This user already exists')
    }
    // Hash passwords
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = User.create({
        name, email, phone, password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: generateToken(user._id)
        })
    }
    else{
         res.status(400)
         throw new Error('Invalid User Data')
    }
})


//@desc Authenticate a new User
//@route POST /api/users/login
//@access PUBLIC
 const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // Checking for user email
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: generateToken(user._id)
        })
    }
    else{
         res.status(400)
         throw new Error('Invalid email')
    }
})

// 63c966494d3b366b4178e247

//@desc Get user data
//@route GET /api/users/me
//@access PRIVATE
 const getMe = asyncHandler(async (req, res)=> {

    res.status(200).json({message: 'user data display'})
})


// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
    registerUser, loginUser, getMe
}