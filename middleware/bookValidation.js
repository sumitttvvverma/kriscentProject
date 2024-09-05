const { check, validationResult } = require('express-validator');

exports.validateBook = [
    check('title', 'Title is required').not().isEmpty(),
    check('author', 'Author is required').not().isEmpty(),
    check('year', 'Year is required and should be a valid year').isInt({ min: 1450, max: new Date().getFullYear() }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
