const mongoose = require('mongoose');

const BookSchema = mongoose.Schema(
    {
        ISBN : {
            type : String,
            required : [true, "ISBN of the Book is required"],
            unique : [true, "The ISBN of the Book must be Unique"]
        },
        title : {
            type : String,
            required : [true, "The Title of the Book is Required"]
        },
        pub_date : {
            type : String,
            required : [true, "The Publication Date of the Book is Required"]
        },
        language : {
            type :String,
            required : [true, "Language of the Book is Required"]
        },
        page_num : {
            type : Number,
            required : [true, "Page Number of the book is Required"],
        },
        author : {
            type : Array,
        },
        category : {
            type : Array,
            required : [true,"Category Cant be Empty"]
        },
        publication : {
            type : String,
        }
    }
);

module.exports = mongoose.model('Books',BookSchema);