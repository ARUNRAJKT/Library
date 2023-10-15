const express = require('express');
const addBookModel = require('../models/addBookModel');
const checkauth = require('../middleware/checkauth');
const book = express.Router();
book.use(express.static('./public'))
book.post('/addbook',checkauth, async (req, res) => {
   
    console.log("------------------------",req.userData.id);
    try {
        const bookdetails = {
            loginId:req.userData.id,
            bookName: req.body.bookName,
            bookAuthor: req.body.bookAuthor,
            bookType: req.body.bookType,
            bookLanguage: req.body.bookLanguage
        }
        console.log(bookdetails);
        addBookModel(bookdetails).save().then((details) => {
            console.log(details);
            
            res.status(200).json({ success: true, error: false, message: "book have been addedd" });
        }).catch(()=>{
            res.status(501).json({ success: false, error: true, message: "all fields are required " });
        })

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "book route entered but failed " });
        console.log(error);

    }

})
book.get('/showbook',checkauth, async (req, res) => {
    console.log(req.userData.id);
    try {
        const showBook = await addBookModel.find([])
        console.log(showBook)
        return res.status(201).json({ success: true, error: false, message: "found book", data: showBook });
       
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: true, message: "not found", data: error })
    }
})
book.get('/deleteBook/:deleteid', async (req, res) => {
    try {
        const id = req.params.deleteid
        const deleteId = await addBookModel.deleteOne({ _id: id })
        console.log(deleteId)
        res.status(201).json({ success: true, error: false, message: "book deleted" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: true, message: "not found", data: error })
    }
})

book.get('/updateBook/:updateid', async (req, res) => {
    try {
        const id = req.params.updateid
        console.log("got to update book route",id);
        const updateId = await addBookModel.findOne({ _id: id })
        console.log("the book deatils is<<<<<<<<<<<",updateId)
        res.status(201).json({ success: true, error: false, message: "book Details founded",details:updateId });
      
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: true, message: "not found", data: error })
    }
})
book.post('/updated',async (req,res)=>{
    try {
        const bookdetails = {
            bookName: req.body.bookName,
            bookAuthor: req.body.bookAuthor,
            bookType: req.body.bookType,
            bookLanguage: req.body.bookLanguage
        }
        console.log(bookdetails);
        addBookModel.updateOne({_id:req.body._id},{$set:bookdetails}).then((details) => {
            console.log(details);
            res.status(200).json({ success: true, error: false, message: "book have been updated" });
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: true, message: "not found", data: error })
    }
})
book.post('/search', async (req, res) => {
    try {
        const searchBook = await addBookModel.find({ bookAuthor:req.body.search})
        console.log("the book are",searchBook)
        res.status(201).json({ success: true, error: false, message: "book Details founded",details:searchBook });
        console.log("got to book search route"); 
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: true, message: "not found", data: error })
    }
})


module.exports = book