const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const secrets = require('../secrets')

const Users = require('../users/users-model')



router.post('/register', (req,res)=>{
    const credentials = req.body
    if(credentials){
        const rounds = process.env.BCRYPT_ROUNDS || 12;

        const hash = bcryptjs.hashSync(credentials.password, rounds)
        credentials.password = hash

        Users.addUser(credentials)
        .then( user => {
            res.status(201).json({ data: user})
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        } )
    } else {
        res.status(400).json({
            message: "Please provide username and password, the password should ne aplphamueric"
        })

    }
})

router.post('/login', (req,res)=> {
    const {username , password} = req.body
    if(req.body){
        Users.findUsersBy({username : username})
        .then(([user]) =>{
            if(user && bcryptjs.compareSync(password, user.password)){
                const token = signToken(user)
                res.status(200).json({message: 'Welcome to our API', token})
            }else {
                res.status(401).json({message: "Invalid credentials"})
            }
        })
        .catch( err =>{
            res.status(500).json({
                message: err.message
            })
        })
    }else{
        res.status(400).json({
            message: "please provide username and password and the password shoud be alphanumeric",
          });
    }
})







function signToken(account){
 
const payload = {
    subject: account.id,
    username: account.username,
    authCode: account.authCode
}

const secret = secrets.jwtSecret

const options = {
    expiresIn: '1day',
}

    return jwt.sign(payload, secret, options)
}



module.exports = router;