const router = require("express").Router();
const BookModel = require("../models/BookSchema");
const AuthorModel = require("../models/AuthorSchema");
/* 
Route           /authors
Description     To get all the Authors
Access          PUBLIC
Parameter       None
Methods         GET
*/
router.get("/", async (req, res) => {
  const Author = await AuthorModel.find();
  res.json({
    author: Author,
  });
});

/* 
  Route           /authors/new
  Description     To add a new author
  Access          PUBLIC
  Parameter       isbn
  Methods         GET
  */
router.post("/new", (req, res) => {
  try {
    const { newAuthor } = req.body;
    const Author = AuthorModel.create(newAuthor);
    res.json({
      msg: "Author Added Successfully",
    });
  } catch (err) {
    res.json({ err: err.message });
  }
});

/* 
  Route           /authors/:author_id
  Description     To get specific author based on id
  Access          PUBLIC
  Parameter       id
  Methods         GET
  */
router.get("/:author_id", async (req, res) => {
  const { author_id } = req.params;

  try {
    const getSpecificAuthor = await AuthorModel.find({ id: author_id });

    if (specificAuthor) {
      res.json({
        author: getSpecificAuthor,
      });
    } else {
      res.json({
        error: `Author with id ${req.params.author_id} doesn't exist`,
      });
    }
  } catch (err) {
    res.json({ err: err.message });
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
router.get("/book/:isbn", async (req, res) => {
  const getAuthorByBook = await AuthorModel.findOne({
    books: req.params.isbn,
  });

  if (AuthorByBook.length) {
    res.json({
      author: getAuthorByBook,
    });
  } else {
    res.json({
      error: `Author for book with ISBN ${req.params.isbn} doesn't exist`,
    });
  }
});
// Route    - /authors/update/:id
// Des      - update author details
// Access   - Public
// Method   - PUT
// Params   - id
// Body     - { "author_name": "new author_name" }

router.put("/update/:author_id", async (req, resp) => {
  const updatedAuthorName = await AuthorModel.findOneAndUpdate(
    { id: parseInt(req.params.author_id) },
    { name: req.body.author_name },
    { new: true }
  );

  return res.json(updatedAuthorName);
});
// Route    - /authors/delete/:author_id
// Des      - delete an author
// Access   - Public
// Method   - DELETE
// Params   - author_id
// Body     - none

router.delete("/delete/:author_id", async (req, res) => {
  const deleteAuthor = await AuthorModel.findOneAndDelete({
    id: parseInt(req.params.author_id),
  });

  return res.json({ msg: "Author deleted successfully" });
});

module.exports = router;
