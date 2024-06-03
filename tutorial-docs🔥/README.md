Creating a Book API with Express.js, Joi for validation, MongoDB, and Mongoose involves several steps. Here's a comprehensive guide to building such an API with all CRUD operations and a search operation using query parameters.

### Step 1: Setting Up the Project

1. **Initialize the Project**:
    ```bash
    mkdir book-api
    cd book-api
    npm init -y
    ```

2. **Install Dependencies**:
    ```bash
    npm install express mongoose joi dotenv
    npm install --save-dev nodemon
    ```

3. **Project Structure**:
    ```
    book-api/
    ├── node_modules/
    ├── src/
    │   ├── controllers/
    │   │   └── bookController.js
    │   ├── models/
    │   │   └── book.js
    │   ├── routes/
    │   │   └── bookRoutes.js
    │   ├── validation/
    │   │   └── bookValidation.js
    │   ├── app.js
    │   └── config.js
    ├── .env
    ├── .gitignore
    ├── package.json
    └── README.md
    ```

### Step 2: Creating the Basic Server

**src/app.js**:
```javascript
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes');
const app = express();

dotenv.config();

app.use(express.json());
app.use('/api/books', bookRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

**.env**:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Step 3: Creating the Book Model

**src/models/book.js**:
```javascript
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    pages: { type: Number, required: true },
    genre: { type: String, required: true }
});

module.exports = mongoose.model('Book', bookSchema);
```

### Step 4: Creating Validation with Joi

**src/validation/bookValidation.js**:
```javascript
const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    author: Joi.string().min(3).max(255).required(),
    publishedDate: Joi.date().required(),
    pages: Joi.number().integer().min(1).required(),
    genre: Joi.string().min(3).max(255).required()
});

module.exports = bookSchema;
```

### Step 5: Creating the Controller

**src/controllers/bookController.js**:
```javascript
const Book = require('../models/book');
const bookSchema = require('../validation/bookValidation');

const getBooks = async (req, res) => {
    try {
        const books = await Book.find(req.query);
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createBook = async (req, res) => {
    const { error } = bookSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const book = new Book(req.body);
    try {
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateBook = async (req, res) => {
    const { error } = bookSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
```

### Step 6: Creating the Routes

**src/routes/bookRoutes.js**:
```javascript
const express = require('express');
const {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
```

### Step 7: Running the Server

1. **Add Start Script** in **package.json**:
    ```json
    "scripts": {
        "start": "nodemon src/app.js"
    }
    ```

2. **Start the Server**:
    ```bash
    npm start
    ```

### Step 8: Testing the API

- Use a tool like Postman to test all the CRUD endpoints (`GET /api/books`, `GET /api/books/:id`, `POST /api/books`, `PUT /api/books/:id`, `DELETE /api/books/:id`).
- Test the search operation with query parameters (e.g., `GET /api/books?author=SomeAuthor`).
