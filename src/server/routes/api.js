const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const useridsto = '';


const mongoose = require('mongoose')
const { error } = require('console')
 const db = "mongodb+srv://harika:harika@cluster0.lxqlm.mongodb.net/NewProject?retryWrites=true&w=majority"
 mongoose.connect(db, err => {
     if(err) {
            console.error('Error!'+err)
     }
     else{
         console.log('Connected to Mongodb')
     }
 })
function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }
//To Post Signin Data
router.post('/register',(req, res) =>{
   let userData = req.body
   let user = new User(userData)
   user.save((err,registered)=>{
       if(err){
           console.log(err)
       }else {
           let payload = { subject: registered._id}
           let token = jwt.sign(payload, 'secretkey')
           res.status(200).send({token})
       }
   })
})

//to Login
router.post('/login', (req, res) => {
    let userData = req.body 
    User.findOne({ username: userData.username}, (err, user) =>{
        if(err){
            console.log(err)
        }else{
            if(!user){
                res.status(401).send('Invaild Username')
            } else if(user.Password !== userData.Password) {
                res.status(401).send('Invalid password')
            }else {
                let payload = {subject: user._id}
                let token = jwt.sign(payload , 'secretkey')
                res.status(200).send({token}) 
            }
        }
    })
})
module.exports = router ;