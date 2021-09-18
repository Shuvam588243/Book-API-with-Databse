require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const booker = express();
const port = process.env.PORT || 3000;
const database = require('./dataset');
booker.use(express.json());
booker.use(express.urlencoded({extended:true}));
const BookModel = require('./models/BookSchema');
const AuthorModel = require('./models/AuthorSchema');
const PublicationModel = require('./models/PublicationSchema');

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

//--------------------------------------------------------------------------------
/* 
Route           /
Description     To get all the books
Access          PUBLIC
Parameter       None
Body            None
Methods         GET
*/
booker.get('/', async(req,res)=>
{
    try{
        const Books = await BookModel.find();
        res.json(Books);
    }catch(err)
    {
        res.json({err:err.message})
    }
});
//-----------------------------------------------------------------------------------
/* 
Route           /books/new
Description     To get all the Publications based on book isbn
Access          PUBLIC
Parameter       isbn
Methods         GET
Body            newBook(ISBN,title,pub_date,language,page_num,author,category,publicat)
*/
booker.post('/books/new',(req,res)=>{
    try{
        const {newBook} = req.body 
        
    const Book = BookModel.create(newBook);

        res.json({
            msg : "Books Added",
            book : Book
        });
    }catch(err)
    {
        res.json({err:err.message})
    }
});
//-----------------------------------------------------------------------------------
/* 
Route           /books/isbn/
Description     To get specific book based on isbn
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booker.get('/books/isbn/:isbn', async(req,res)=>
{
    try{
        const {isbn} = req.params;
    const getBook = await BookModel.findOne({ ISBN : isbn })


    if(getBook)
    {
        res.json(
            {
                book : getBook
            }
        );
    }
    else
    {
        res.json({
            error : `No Book is available for the ISBN ${isbn}`
        });
    }
    }
    catch(err)
    {
        res.json({err:err.message})  
    }
    
});
//-------------------------------------------------------------------------------
/* 
Route           /books/category/
Description     To get all the books of a particular category
Access          PUBLIC
Parameter       category
Methods         GET
*/
booker.get('/books/category/:category', async(req,res)=>
{
    try{
        const getSpecificBook = await BookModel.find({ 
            category : req.params.category
        })
        
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
                error : `No Book is available for the Category ${req.params.category}`
            });
        }
    }catch(err)
    {
        res.json({err:err.message})  
    }
    
});
//---------------------------------------------------------------------------------
/* 
Route           /books/language/
Description     To get all the books of a particular language
Access          PUBLIC
Parameter       lang
Methods         GET
*/
booker.get('/books/language/:lang',(req,res)=>
{
    try{
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
    }catch(err)
    {
        res.json({err:err.message})   
    }
    
});
//--------------------------------------------------------------------------------

/* 
Route           /books/update
Description     To update the book authors
Access          PUBLIC
Parameter       None
Methods         GET
Body            id
*/
booker.put('/books/update/:isbn', async(req,res)=>
{
    try{
        const {isbn} = req.params
    const { newAuthor } = req.body

    const updateBook = await BookModel.findOneAndUpdate(
        {
            ISBN : isbn
        },
        {
            $addToSet:{
                author : newAuthor
            }
        },
        {
            new : true
        }
    )

    res.json({
        msg : "Author Updated Successfully",
        book : updateBook
    })
    }
    catch(err)
    {
        res.json({err:err.message})  
    }
});  
//--------------------------------------------------------------------------------
/* 
Route           /authors
Description     To get all the Authors
Access          PUBLIC
Parameter       None
Methods         GET
*/
booker.get('/authors', async(req,res)=>
{

    const Author = await AuthorModel.find()
    res.json(
        {
            author : Author
        }
    );
});
//--------------------------------------------------------------------------------
/* 
Route           /books/new
Description     To get all the Publications based on book isbn
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booker.post('/authors/new',(req,res)=>{
   try{
    const {newAuthor} = req.body 
    const Author = AuthorModel.create(newAuthor)
    res.json({
        msg : "Author Added",
    });
   }
   catch(err)
   {
    res.json({err:err.message})   
   }
});
//--------------------------------------------------------------------------------
/* 
Route           /authors
Description     To get specific author based on id
Access          PUBLIC
Parameter       id
Methods         GET
*/
booker.get('/authors/:id', async(req,res)=>
{
    const {id} = req.params;

    try{
        const specificAuthor = await AuthorModel.find({ id })

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
    }catch(err)
    {
        res.json({err:err.message})    
    }
});
//-------------------------------------------------------------------------------
/* 
Route           /authors/book/
Description     To get all the Authors based on book isbn
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booker.get('/authors/book/:isbn', async(req,res)=>
{
    const AuthorByBook = await AuthorModel.findOne({ 
        books : req.params.isbn
    });

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
//------------------------------------------------------------------------------------
/* 
Route           /Publications
Description     To get all the publications
Access          PUBLIC
Parameter       None
Methods         GET
*/
booker.get('/Publications',async(req,res)=>
{
    const Publication = await PublicationModel.find()

    res.json(
        {
            publications : Publication
        }
    );
});
//-------------------------------------------------------------------------------------
/* 
Route           /Publications/new
Description     To add a new Publications
Access          PUBLIC
Parameter       none
Methods         GET
*/
booker.post('/Publications/new/',async(req,res)=>{
    try{
        const {newPublication} = req.body 

    const Publication = await PublicationModel.create(newPublication);

    res.status(200).json({
        msg : "Publication Added"
    })
    }
    catch(err)
    {
        res.status(400).json({
            err
        })
    }    
});
//--------------------------------------------------------------------------------
/* 
Route           /Publications/
Description     To get publications author based on id
Access          PUBLIC
Parameter       pub_id
Methods         GET
*/
booker.get('/Publications/:pub_id', async(req,res)=>
{
    try{
        const {pub_id} = req.params

    const specificPublication = await PublicationModel.findOne({
        id : pub_id
    });

    if(specificPublication)
    {
        res.status.json({
            publication : specificPublication
        })
    }
    else
    {
        res.status(200).json({
            msg : `Publication with id ${pub_id} is not found`
        })
    }
    }
    catch(err)
    {
        res.status(200).json({
            err
        })
    }
});
//-------------------------------------------------------------------------------
/* 
Route           /Publications/book/
Description     To get all the Publications based on book isbn
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booker.get('/Publications/book/:isbn', async(req,res)=>
{
    const {isbn} = req.params;

    Publication = await PublicationModel.find({
        books : isbn
    });

    if(Publication)
    {
        res.status(200).json({
            founded_data : Publication.length,
            publication : Publication
        })
    }
    else
    {
        res.status(200).json({
            founded_data : Publication.length,
            msg : `No Publication Found for the Book with ISBN ${isbn}`
        })
    }
});
//------------------------------------------------------------------------

/* 
Route           /Publications/update/book/:isbn
Description     To get all the Publications based on book isbn
Access          PUBLIC
Parameter       isbn
Body            pubid
Methods         PUT
*/
booker.put('/Publications/update/book/:isbn', async(req,res)=>{

    const {isbn} = req.params;
    const {pubid} = req.body;

    const updatedPublication = await PublicationModel.updateOne({
        id : pub_id
    },{
        $addToSet:
        {
            books : isbn
        }
    },{
        new : true
    });

    const updatedBook = await BookModel.updateOne({
        ISBN : isbn
    },{
        publication : pubid
    },{
        new : true
    })

    res.json({
        msg : "Book Updated Successfully",
        book : updatedBook,
        publication : updatedPublication,
        
    });

});
//--------------------------------------------------------------------------------
/* 
Route           /book/delete_author/
Description     To delete author from a book
Access          PUBLIC
Parameter       isbn,id(author)
Methods         DELETE
*/
booker.delete('/book/delete_author/:isbn/:id',async(req,res)=>
{
    const { isbn, id} = req.params

    //removing Author from the book
    const updatedBook = await BookModel.updateOne({
        ISBN : isbn
    },{
        $pull:{
            author : id
        }
    },{
        new : true
    });

    //Removing Book from the author
    const updatedAuthor = await AuthorModel.updateOne({
        id
    },{
        $pull:{
            books : isbn
        }
    },{
        new : true
    })
 

    res.status(200).statusjson(
        {
            msg : "Successfull",
            book : updatedBook,
            author : updatedAuthor
        }
    )
})
//--------------------------------------------------------------------------------

/* 
Route           /book/delete_publication/
Description     To delete publication from a book
Access          PUBLIC
Parameter       isbn,id(publication)
Methods         DELETE
*/
booker.delete('/book/delete_publication/:isbn/:id',async(req,res)=>
{
    const { isbn, id} = req.params

    //removing Publication from a book
    const updatedBook = await BookModel.updateOne({
        ISBN : isbn
    },{
        publication : "null"
    },{
        new : true
    });

    //removing Books from a publication
    const updatedPublication = await Publications.updateOne({
        id
    },{
        $pull : {
            books : isbn
        }
    },{
        new : true
    })
    

    res.json(
        {
            msg : "Successfull",
            book : updatedBook,
            publication : updatedPublication
        }
    )
})


booker.listen(port,()=>
{
    console.log(`Listening to port ${port}`);
});