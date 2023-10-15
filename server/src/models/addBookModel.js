const mongoose = require('mongoose')
const schema = mongoose.Schema;
const addBookSchema = new schema({
    bookName: { type: String ,required:true },
    bookAuthor: { type: String,required:true },
    bookType: { type: String,required:true },
    bookLanguage: { type: String,required:true },
    loginId:{type:mongoose.Types.ObjectId}
})
const addBookModel = mongoose.model('addBook_tb', addBookSchema)
module.exports = addBookModel