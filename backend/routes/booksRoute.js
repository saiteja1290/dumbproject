import express from "express";
import { Book } from "../models/bookmodel.js"

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        if (!req.body.username || !req.body.branch || !req.body.overall_rank || !req.body.branch_rank || !req.body.rating) {
            return response.status(400).send({
                message: "Send all required fields",
            })
        }
        const newbook = {
            username: req.body.username,
            branch: req.body.branch,
            overall_rank: req.body.overall_rank,
            branch_rank: req.body.branch_rank,
            rating: req.body.rating
        }
        const book = await Book.create(newbook);

        return res.status(201).send(book)

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})
//Route to get all books from database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})
//Route to get one book by taking the parameter as id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const books = await Book.findById(id);
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})
//Route for updating book info - we use put 
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.username || !req.body.branch || !req.body.overall_rank || !req.body.branch_rank || !req.body.rating) {
            return response.status(400).send({
                message: "Send all required fields",
            })
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body); //You are updating book here itself no need to return this "result" variable.

        if (!result) {
            return res.status(200).send({ message: error.message })
        }

        return res.status(400).send({ message: "Book updated succesfully!!" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
export default router;