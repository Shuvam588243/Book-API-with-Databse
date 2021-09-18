const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema(
    {
        id : {
            type : String,
            required : [true, "The Publication ID cannot be blank"],
            unique : [true, "The Publication ID Must be Unique"]
        },
        name : {
            type : String,
            required : [true, "The Name of the Publication Cannot be Blank"]
        },
        books : {
            type : Array,
            required : true
        }
    }
)

const publicationModel = mongoose.model('Publications', publicationSchema)

module.exports = publicationModel;