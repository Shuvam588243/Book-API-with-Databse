const router = require("express").Router();
const BookModel = require("../models/BookSchema");
const AuthorModel = require("../models/AuthorSchema");

/* 
Route           /
Description     To get all the books
Access          PUBLIC
Parameter       None
Body            None
Methods         GET
*/
router.get("/", async (req, res) => {
  try {
    const Books = await BookModel.find();
    res.json(Books);
  } catch (err) {
    res.json({ err: err.message });
  }
});

/* 
Route           /books/new
Description     To add a new book
Access          PUBLIC
Parameter       none
Methods         POST
Body            newBook(ISBN,title,pub_date,language,page_num,author,category,publicat)
*/
router.post("/books/new", (req, res) => {
  try {
    const { newBook } = req.body;

    const Book = BookModel.create(newBook);

    res.json({
      msg: "Books Added",
      book: Book,
    });
  } catch (err) {
    res.json({ err: err.message });
  }
});

/* 
Route           /books/isbn/
Description     To get specific book based on isbn
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
router.get("/books/isbn/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;
    const getBook = await BookModel.findOne({ ISBN: isbn });

    if (getBook) {
      res.json({
        book: getBook,
      });
    } else {
      res.json({
        error: `No Book is available for the ISBN ${isbn}`,
      });
    }
  } catch (err) {
    res.json({ err: err.message });
  }
});

/* 
Route           /books/category/
Description     To get all the books of a particular category
Access          PUBLIC
Parameter       category
Methods         GET
*/
router.get("/books/category/:category", async (req, res) => {
  try {
    const getSpecificBook = await BookModel.find({
      category: req.params.category,
    });

    if (getSpecificBook.length != 0) {
      res.json({
        book: getSpecificBook,
      });
    } else {
      res.json({
        error: `No Book is available for the Category ${req.params.category}`,
      });
    }
  } catch (err) {
    res.json({ err: err.message });
  }
});

/* 
Route           /books/language/
Description     To get all the books of a particular language
Access          PUBLIC
Parameter       lang
Methods         GET
*/
router.get("/books/language/:lang", (req, res) => {
  try {
    const getSpecificBook = await BookModel.find({
      language: req.params.language,
    });

    if (getSpecificBook) {
      res.json({
        book: getSpecificBook,
      });
    } else {
      res.json({
        error: `No Book is available on language ${req.params.language}`,
      });
    }
  } catch (err) {
    res.json({ err: err.message });
  }
});

// Route    - /book/aut/:author
// Des      - to get a list of books based on author
// Access   - Public
// Method   - GET
// Params   - author
// Body     - none

router.get("/books/:author_id", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({
    authors: parseInt(request.params.author_id),
  });

  if (!getSpecificBook) {
    return response.json({
      error: `No book found for the author of ${parseInt(
        request.params.author_id
      )}`,
    });
  }
  return response.json(getSpecificBook);
});

/* 
Route           /books/update/:isbn
Description     To add new author in the book
Access          PUBLIC
Parameter       None
Methods         GET
Body            id
*/
router.put("/books/update/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;
    const { newAuthor } = req.body;

    const updateBook = await BookModel.findOneAndUpdate(
      {
        ISBN: isbn,
      },
      {
        $addToSet: {
          author: newAuthor,
        },
      },
      {
        new: true,
      }
    );

    res.json({
      msg: "Author Updated Successfully",
      book: updateBook,
    });
  } catch (err) {
    res.json({ err: err.message });
  }
});

// Route    - /books/update/:isbn
// Des      - update book title
// Access   - Public
// Method   - PUT
// Params   - isbn
// Body     - { title: newTtile }

Router.put("/update/:isbn", async (req, res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    { ISBN: request.params.isbn },
    { title: request.body.title },
    { new: true }
  );

  return response.json(updatedBook);
});
// Route    - /books/deleteBook/:isbn
// Des      - to delete a book
// Access   - Public
// Method   - DELETE
// Params   - isbn
// Body     - none

router.delete("/books/deleteBook/:isbn", async (req, resp) => {
  const deleteBook = await BookModel.findOneAndDelete({
    ISBN: request.params.isbn,
  });

  return response.json({
    message: `Book with isbn ${req.params.isbn} deleted successfully`,
  });
});
// Route    - /book/deleteAuthor/:BookID/:authorID
// Des      - delete an author from the book
// Access   - Public
// Method   - DELETE
// Params   - bookID, authorID
// Body     - none

router.delete("/books/deleteAuthor/:isbn/:author_id", async (req, res) => {
  const isbn = request.params.isbn;
  const author_id = parseInt(request.params.author_id);

  const updatedBook = await BookModel.findOneAndUpdate(
    { ISBN: isbn },
    { $pull: { authors: author_id } },
    { new: true }
  );

  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    { id: author_id },
    { $pull: { books: isbn } },
    { new: true }
  );

  return response.json({ book: updatedBook, author: updatedAuthor });
});
