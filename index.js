require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const booker = express();
const port = process.env.PORT || 3000;
const database = require('./dataset');
booker.use(express.json());
booker.use(express.urlencoded({extended:true}));

//Database Connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}
).then(()=>
{
    console.log('Database Connected');
});

/* 
Route           /
Description     To get all the books
Access          PUBLIC
Parameter       None
Methods         GET
*/
booker.get('/',(req,res)=>
{
    res.json(
        {
            books : database.Books
        }
    );
});
/* 
Route           /books/new
Description     To get all the Publications based on book isbn
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booker.post('/books/new',(req,res)=>{
    const newBook = req.body 
        database.Books.push(newBook);
        res.json({
            msg : "Books Added",
            book : database.Books
        });
});
/* 
Route           /books/isbn/
Description     To get specific book based on isbn
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booker.get('/books/isbn/:isbn',(req,res)=>
{
    const getSpecificBook = database.Books.filter(
        (book)=>book.ISBN === req.params.isbn
    );

    if(getSpecificBook.length != 0)
    {
        res.json(
            {
                book : getSpecificBook
            }
        );
    }
    else
    {
        res.json({
            error : `No Book is available for the ISBN ${req.params.isbn}`
        });
    }
    
});
/* 
Route           /books/category/
Description     To get all the books of a particular category
Access          PUBLIC
Parameter       category
Methods         GET
*/
booker.get('/books/category/:category',(req,res)=>
{
    const getSpecificBook = database.Books.filter(
        (book)=>book.category.includes(req.params.category)
    );
    
    if(getSpecificBook.length != 0)
    {
        res.json(
            {
                book : getSpecificBook
            }
        );
    }
    else
    {
        res.json({
            error : `No Book is available for the ISBN ${req.params.isbn}`
        });
    }
    
});
/* 
Route           /books/language/
Description     To get all the books of a particular language
Access          PUBLIC
Parameter       lang
Methods         GET
*/
booker.get('/books/language/:lang',(req,res)=>
{
    const getSpecificBook = database.Books.filter(
        (book)=>book.language === req.params.lang
    );
    
    if(getSpecificBook.length != 0)
    {
        res.json(
            {
                book : getSpecificBook
            }
        );
    }
    else
    {
        res.json({
            error : `No Book is available for the ISBN ${req.params.isbn}`
        });
    }
    
});

/* 
Route           /authors
Description     To get all the Authors
Access          PUBLIC
Parameter       None
Methods         GET
*/
booker.get('/authors',(req,res)=>
{
    res.json(
        {
            author : database.Authors
        }
    );
});
/* 
Route           /books/new
Description     To get all the Publications based on book isbn
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booker.post('/authors/new',(req,res)=>{
    const newAuthor = req.body 
        database.Authors.push(newAuthor);
        res.json({
            msg : "Author Added",
            book : database.Authors
        });
});
/* 
Route           /authors
Description     To get specific author based on id
Access          PUBLIC
Parameter       id
Methods         GET
*/
booker.get('/authors/:id',(req,res)=>
{
    const specificAuthor = database.Authors.filter((author)=>
    author.id === req.params.id)

    if(specificAuthor.length != 0)
    {
        res.json(
            {
                author : specificAuthor
            }
        )
    }
    else
    {
        res.json({
            error : `Author with id ${req.params.id} doesn't exist`
        })
    }
});
/* 
Route           /authors/book/
Description     To get all the Authors based on book isbn
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booker.get('/authors/book/:isbn',(req,res)=>
{
    const AuthorByBook = database.Authors.filter((author)=>
    author.books.includes(req.params.isbn))

    if(AuthorByBook.length != 0)
    {
        res.json(
            {
                author : AuthorByBook
            }
        )
    }
    else
    {
        res.json({
            error : `Author for book with ISBN ${req.params.isbn} doesn't exist`
        })
    }
});
/* 
Route           /Publications
Description     To get all the publications
Access          PUBLIC
Parameter       None
Methods         GET
*/
booker.get('/Publications',(req,res)=>
{
    res.json(
        {
            publications : database.Publications
        }
    );
});
/* 
Route           /Publications/new
Description     To add a new Publications
Access          PUBLIC
Parameter       none
Methods         GET
*/
booker.post('/Publications/new/',(req,res)=>{
    const newPublication = req.body 

        Publications = database.Publications.filter((pub)=>
        {
            if(newPublication.id === pub.id)
            {
                res.json({
                    msg : `Plublication with id ${newPublication.id} already exists`
                });
            }
            else
            {
                database.Publications.push(newPublication);
            }
        }); 
        res.json({
            msg : "Author Added",
            book : database.Publications
        });
});
/* 
Route           /Publications/
Description     To get publications author based on id
Access          PUBLIC
Parameter       pub_id
Methods         GET
*/
booker.get('/Publications/:pub_id',(req,res)=>
{
    const specificPublications = database.Publications.filter((publication)=>
    publication.id === req.params.pub_id)

    if(specificPublications.length != 0)
    {
        res.json(
            {
                publication : specificPublications
            }
        )
    }
    else
    {
        res.json({
            error : `Publication with id ${req.params.id} doesn't exist`
        })
    }
});
/* 
Route           /Publications/book/
Description     To get all the Publications based on book isbn
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booker.get('/Publications/book/:isbn',(req,res)=>
{
    const PublicationByBooks = database.Publications.filter((publication)=>
    publication.books.includes(req.params.isbn))

    if(PublicationByBooks.length != 0)
    {
        res.json(
            {
                publications : PublicationByBooks
            }
        )
    }
    else
    {
        res.json({
            error : `Publications for book with ISBN ${req.params.isbn} doesn't exist`
        })
    }
});

/* 
Route           /Publications/update/book/:isbn
Description     To get all the Publications based on book isbn
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booker.put('/Publications/update/book/:isbn',(req,res)=>{

    database.Publications.forEach((pub)=>{
        if(pub.id === req.body.pubid)
        {
            pub.books.push(req.params.isbn)
            console.log('Publications Updated');
        }
    });

    database.Books.forEach((book)=>
    {
        if(book.ISBN === req.params.isbn)
        {
            book.publication = req.body.pubid
            console.log('Books Updated');
        }
    });

    res.json({
        book : database.Books,
        publication : database.Publications,
        msg : "Book Updated Successfully"
    });

});




booker.listen(port,()=>
{
    console.log(`Listening to port ${port}`);
});