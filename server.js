const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const Users = require('./schema/Users')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const port = 7000
const mongoUrl = "mongodb+srv://Trina:trina@soumakdb-g9zuk.mongodb.net/authdb?retryWrites=true&w=majority"
 
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(() => console.log("> MongoDB Connected!"))
    .catch(err => console.log(err))

app.post('/signup', (req, res) => {
    const email = req.body.email
    const name = req.body.name 
    const password = req.body.password
    const phoneNo = req.body.phoneNo

    Users.findOne({email: email}).exec()
        .then((user) => {
            if(user) {
                res.json({
                    msg: "Email already exists :( "
                })
            } else {
                // hash password 
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if(err) {
                            return res.json({
                                error: "Something went wrong!"
                            })
                        }

                        // create new user
                        const newUser = new Users({
                            name: name,
                            email: email,
                            password: hash,
                            phoneNo: phoneNo  
                        })
                    
                        newUser.save()
                            .then(() => {
                                const payload = {
                                    email: email,
                                    name: name 
                                }
                                
                                // generate token
                                jwt.sign(payload, 'my_secret_key', { expiresIn: '1h' }, (err, token) => {
                                    if(err) {
                                        return res.json({
                                            error: "Something went wrong!"
                                        })
                                    }

                                    // send response
                                    res.status(200).json({
                                        msg: "Signup successful",
                                        token: token 
                                    })   
                                });  
                            })  
                            .catch((error) => {
                                console.log(error)
                                res.status(400).json({
                                    error: "Something went wrong!"
                                })
                            })
                    })
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({
                error: "Something went wrong!"
            })
        })
})

app.listen(port, () => console.log("> Server is up on " + port))