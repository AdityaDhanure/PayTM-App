const express = require('express');
const zod = require('zod');
const {User, Account} = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const {authMiddleware} = require("../middleware");

const cors = require("cors");

app.use(cors({
  origin: "https://paytm-app-8h79.onrender.com", // or "*" for all
  methods: ["GET", "POST", "PUT", "DELETE"]
}));


const router = express.Router();

function createToken(username){
    return jwt.sign({
       username: username
   }, JWT_SECRET);
}


const signupUser = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})
router.post('/signup', async (req, res) => {
//User validation.
    const body = req.body;
    const username = body.username;
    const obj = signupUser.safeParse(body);  // Validating if the inputs matches the required zod object.
    if(!obj.success){
        return res.json({
            msg: 'Incorrect inputs'
        })
    }
    const user = await User.findOne({ // Finding existing user.
        username: req.body.username
    })
    if(user){
        return res.status(400).json({
            msg: 'Email already taken / Incorrect inputs'
        })
    }

    // User creation.
    const dbUser = await User.create(body);

    await Account.create({
        userId: dbUser._id,
        balance: (1 + Math.random() * 1000000).toFixed(3)
    })

    const token = createToken(username);
    res.json({
        msg: 'User Created Successfully',
        token: token
    })
})


const signInUser = zod.object({
    username: zod.string().email(),
    password: zod.string()
})
router.post('/signin', async (req, res) => {
    const body = req.body;
    const username = body.username;
    const password  = body.password;
    const {success} = signInUser.safeParse(body);
    if(!success){
        return res.json({
            msg: 'Incorrect inputs'
        })
    }
    const user = await User.findOne({username, password})
    if(!user){
        return res.status(400).json({
            msg: 'User not found. Check username or password (or) Signup first!'
        })
    }

    const token = createToken(username);
    res.json({
        msg:'Signed In Successfully',
        token: token
    })
})


const updateBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})
router.put('/update', authMiddleware, async (req, res) => {
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        res.status(403).json({
            msg: 'Incorrect inputs'
        })
    }

    await User.updateOne({
        username: req.username   // Whom to update?
    }, {
        "$set":{  // What to set or update?
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }
    })

    res.status(200).json({
        msg: 'Updated Successfully',
    })
})



router.get('/bulk', async(req, res) => {
    const filter = req.query.filter || '';

    const users = await User.find({   // Finding the users on the basis of filter variable in find()
        '$or':[{
            firstname: {
                $regex: (filter)
            }
        },{
            lastname: {
                $regex: (filter)
            }
        }]
    })
    if(users){
        return res.status(200).json({
            users: users.map(user =>({
                _id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname
            }))
        })
    } else{
        return res.status(404).json({
            msg: 'Not Found'
        })
    }


})

router.get('/finduser', authMiddleware, async(req, res) => {
    const username = req.username;
    const user = await User.findOne({username})

    if(!user){
        return res.status(404).json({
            msg: 'User Not Found',
            login: false
        })
    }
    res.status(200).json({
        userId: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname
    })

})


module.exports = router;