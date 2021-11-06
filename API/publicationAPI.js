const router = require("express").Router();
const PublicationModel = require("../models/PublicationSchema");
const BookModel = require("../models/BookSchema");

/* 
Route           /publications/
Description     To get all the publications
Access          PUBLIC
Parameter       None
Methods         GET
*/
router.get("/", async (req, res) => {
  const Publication = await PublicationModel.find();

  res.json({
    publications: Publication,
  });
});
//-------------------------------------------------------------------------------------
/* 
  Route           /publications/new
  Description     To add a new Publications
  Access          PUBLIC
  Parameter       none
  Methods         GET
  */
router.post("/new/", async (req, res) => {
  try {
    const { newPublication } = req.body;

    const Publication = await PublicationModel.create(newPublication);

    res.status(200).json({
      msg: "Publication Added Successfully",
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
});
//--------------------------------------------------------------------------------
/* 
  Route           /publications/
  Description     To get publications author based on id
  Access          PUBLIC
  Parameter       pub_id
  Methods         GET
  */
router.get("/:pub_id", async (req, res) => {
  try {
    const { pub_id } = req.params;

    const specificPublication = await PublicationModel.findOne({
      id: parseInt(request.params.pub_id),
    });

    if (specificPublication) {
      res.status.json({
        publication: specificPublication,
      });
    } else {
      res.status(200).json({
        msg: `Publication with id ${pub_id} is not found`,
      });
    }
  } catch (err) {
    res.status(200).json({
      err,
    });
  }
});
//-------------------------------------------------------------------------------
/* 
  Route           /publications/book/
  Description     To get all the Publications based on book isbn
  Access          PUBLIC
  Parameter       isbn
  Methods         GET
  */
router.get("/book/:isbn", async (req, res) => {
  const { isbn } = req.params;

  Publication = await PublicationModel.find({
    books: isbn,
  });

  if (Publication) {
    res.status(200).json({
      founded_data: Publication.length,
      publication: Publication,
    });
  } else {
    res.status(200).json({
      founded_data: Publication.length,
      msg: `No Publication Found for the Book with ISBN ${isbn}`,
    });
  }
});
//------------------------------------------------------------------------

// Route    - /publications/updateBook/:id
// Des      - to update/add new book
// Access   - Public
// Method   - PUT
// Params   - id
// Body     - { "book": ISBN }

router.put("/updateBook/:pub_id", async (req, resp) => {
  const updatedPublication = await PublicationModel.findOneAndUpdate(
    { id: parseInt(request.params.pub_id) },
    { $addToSet: { books: request.body.book } },
    { new: true }
  );

  const updatedBook = await BookModel.findOneAndUpdate(
    { ISBN: request.body.book },
    { publication: parseInt(request.params.id) },
    { new: true }
  );

  return response.json({ publication: updatedPublication, book: updatedBook });
});

// Route    - /publications/delete/:pub_id
// Des      - delete a publication
// Access   - Public
// Method   - DELETE
// Params   - publicationID
// Body     - none

router.delete("/delete/:pub_id", async (req, res) => {
  const updatedPublication = await PublicationModel.findOneAndDelete({
    id: parseInt(request.params.pub_id),
  });

  return response.json({ publications: updatedPublication });
});
// Route    - /publications/deleteBook/:pub_id/:isbn
// Des      - delete a book from publication
// Access   - Public
// Method   - DELETE
// Params   - publicationID, bookID
// Body     - none

router.delete("/deleteBook/:pub_id/:book_id", async (req, res) => {
  const pub_id = parseInt(request.params.pub_id);
  const isbn = request.params.book_id;

  const updatedPublication = await PublicationModel.findOneAndUpdate(
    { id: pub_id },
    { $pull: { books: isbn } },
    { new: true }
  );

  const updatedBook = await BookModel.findOneAndUpdate(
    { ISBN: isbn },
    { publication: -1 },
    { new: true }
  );

  res.status(200).json({ publication: updatedPublication, book: updatedBook });
});

module.exports = router;
