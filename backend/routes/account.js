const express = require("express");
const {authMiddleware} = require("../middleware");
const {Account, User} = require("../db");
const mongoose = require("mongoose");

const cors = require("cors");

app.use(cors({
  origin: "https://your-frontend-on-vercel.vercel.app", // or "*" for all
  methods: ["GET", "POST", "PUT", "DELETE"]
}));


const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const username = req.username;
    const user = await User.findOne({username});

    const account = await Account.findOne({
        userId: user._id
    });

    res.json({
        balance: account.balance
    })
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const username = req.username;
    const senderUser = await User.findOne({username});

    const session = await mongoose.startSession();

    session.startTransaction();
    const { to, amount } = req.body;

    // Fetching the account of the sender in the transaction.
    const account = await Account.findOne({userId: senderUser._id}).session(session);
    if(!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: 'Insufficient balance or Sender don\'t have an account!'
        })
    }

    // Fetching the account of the recipient in the transaction.
    const toAccount = await Account.findOne({userId: to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            msg: 'Recipient doesn\'t have an account!'
        })
    }

    await Account.updateOne({userId: senderUser._id}, {
        $inc:{balance: -amount}
    }).session(session)

    await Account.updateOne({userId: to}, {
        $inc:{balance: amount}
    }).session(session)

    await session.commitTransaction()
    res.status(200).json({
        msg: 'Transferred Successfully'
    })
})

module.exports = router;