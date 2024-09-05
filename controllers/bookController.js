const Book = require('../models/Book');
const upload = require('../middleware/upload');

exports.addBook = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }

        const { title, author, year } = req.body;
        const coverPage = req.file ? `/uploads/${req.file.filename}` : null;

        try {
            const book = new Book({
                title,
                author,
                year,
                coverPage,
                uploadedBy: req.user.id,
            });

            const newBook = await book.save();
            res.status(201).json(newBook);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateBook = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }

        const { title, author, year } = req.body;
        const coverPage = req.file ? `/uploads/${req.file.filename}` : null;

        try {
            let book = await Book.findById(req.params.id);
            if (!book) return res.status(404).json({ message: 'Book not found' });

            book.title = title || book.title;
            book.author = author || book.author;
            book.year = year || book.year;
            book.coverPage = coverPage || book.coverPage;

            const updatedBook = await book.save();
            res.status(200).json(updatedBook);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

exports.deleteBook = async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        await book.remove();
        res.status(200).json({ message: 'Book removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
