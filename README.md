
## Prerequisites

- Node.js
- MongoDB

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/book-api.git
    cd book-api
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory with the following content:

    ```
    MONGO_URI=mongodb://localhost:27017/bookdb
    PORT=5000
    ```

4. **Run the application**:

    ```bash
    npm start
    ```

The server should now be running on `http://localhost:5000`.

## Endpoints

- **Create Book**: `POST /api/books`
    - Sample request body:
    ```json
    {
        "title": "Sample Book",
        "author": "John Doe",
        "publishedDate": "2023-01-01",
        "pages": 300,
        "genre": "Fiction"
    }
    ```

- **Get All Books**: `GET /api/books`

- **Get Book By ID**: `GET /api/books/:id`

- **Update Book**: `PUT /api/books/:id`
    - Sample request body:
    ```json
    {
        "title": "Updated Book",
        "author": "Jane Doe",
        "publishedDate": "2023-02-01",
        "pages": 350,
        "genre": "Science Fiction"
    }
    ```

- **Delete Book**: `DELETE /api/books/:id`

- **Search Books**: `GET /api/books?author=John Doe`

## Testing with Postman

You can use the provided Postman collection to test the API endpoints. Import the `BookAPI.postman_collection.json` file into Postman to get started.

## License

This project is licensed under the MIT License.

