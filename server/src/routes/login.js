const express = require('express')
const login = express.Router();
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const regs = require('../models/regModel')
const logs = require('../models/loginModel')
const checkAuth = require('../middleware/checkauth')
const mongoose = require('mongoose');
const objectid = mongoose.Types.ObjectId
login.post('/reg', async (req, res) => {
    try {
        const oldUser = await logs.findOne({ username: req.body.username });
        if (oldUser) {
            return res.status(400).json({ success: false, error: true, message: "User already exists" });
        }
        const oldPhone = await regs.findOne({ number: req.body.number });
        if (oldPhone) {
            return res.status(400).json({ success: false, error: true, message: "Phone number already exists" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        let log = { username: req.body.username, password: hashedPassword, role: 2 }

        const result = await logs(log).save()

        let reg = { name: req.body.name, address: req.body.address, phone: req.body.number, loginId: result._id }
        const result2 = await regs(reg).save()

        if (result2) {
            res.status(201).json({ success: true, error: false, message: "Registration completed", details: result2 });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Got to Login Routes but Something went wrong" });
        console.log(error);

    }
})
login.post('/log', async (req, res) => {
    try {
        const uname = await logs.findOne({ username: req.body.username });
        if (!uname) {
            return res.status(404).json({ success: false, error: true, message: "user not found" })
        }
        const comparePass = await bcrypt.compare(req.body.password, uname.password)
        console.log(comparePass);
        if (comparePass) {
            const token = jwt.sign({ loginId: uname._id }, 'aaa', { expiresIn: '1h' })
            return res.status(201).json({ success: true, error: false, message: "Login completed", details: uname, token: token });
        }
        else {
            return res.status(405).json({ success: false, error: true, message: "password not match" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: true, message: "login route connceted bt not working" })
    }
})
login.get('/profile', checkAuth, async (req, res) => {
    console.log(req.userData.id);
    try {
        const proDetails = await logs.aggregate([
            {
                '$lookup': {
                    'from': 'reg_tbs',
                    'localField': '_id',
                    'foreignField': 'loginId',
                    'as': 'register_details'
                }
            },
            {
                '$unwind': '$register_details'
            },
            {
                '$match': {
                    '_id': new objectid(req.userData.id)
                }
            },
            {
                '$group': {
                    '_id': '$_id',
                    'username': { '$first': '$username' },
                    'name': { '$first': '$register_details.name' },
                    'address': { '$first': '$register_details.address' },
                    'Phone': { '$first': '$register_details.phone' }
                }
            }

        ])
        console.log(proDetails);
        return res.status(201).json({ success: true, error: false, message: "Profile found", details: proDetails[0] });
    } catch (error) {
        return res.status(500).json({ success: false, error: true, message: "Profile route connceted bt not working" })
    }
})

module.exports = login