# WTWR (What to Wear?):

A backend API for managing news articles and users. Users can save articles from external sources and de

## Accessing the Application

- [Deployed Backend Domain](https://api.newsource.undo.it)
- [Frontend GitHub Repository](https://github.com/alex-manis/news_frontend)

## Technologies

This project uses the following technologies and libraries:

- **Node.js** – JavaScript runtime for building the server
- **Express** – Web framework for handling routing and middleware
- **MongoDB** – NoSQL database for storing users and clothing items
- **Mongoose** – ODM (Object Data Modeling) library for MongoDB
- **bcryptjs** – Password hashing
- **jsonwebtoken** – JWT authentication
- **Celebrate / Joi** – Request validation
- **Validator** – URL and email validation
- **Winston / express-winston** – Request and error logging
- **ESLint** – Linter for code quality and style
- **Prettier** – Code formatter
- **Postman** – Tool for testing API endpoints

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/alex-manis/news_backend
```

2. Navigate to the project folder:

```bash
cd news_explorer_backend
```

3. Install dependencies:

```bash
npm install
```

4. Make sure MongoDB is running locally (default port 27017).

5. Start the server:

```bash
npm start
```

The API will be available at `http://localhost:3002`.

---

## API Endpoints

### Authentication

- **POST /signup** – Create a new user
- **POST /signin** – Log in and receive a JWT token

**Request body example (/signup):**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "strongpassword123"
}
```

**Response example (/signup):**

```json
{
  "data": {
    "_id": "64f0c7f4a3d2b1a234567890",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Request body example (/signin):**

```json
{
  "email": "john@example.com",
  "password": "strongpassword123"
}
```

**Response example (/signin):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Users

- **GET /user/me** – Get current user
- **PATCH /users/me** – Update current user (name and avatar)

**Response example (GET /users/me):**

```json
{
  "data": {
    "_id": "64f0c7f4a3d2b1a234567890",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Articles

- **GET /articles** – Get all articles saved by the current user
- **POST /articles** – Save a new article from external API
- **DELETE /articles/:articlesId** – Delete a saved article

**POST request body example:**

```json
{
  "keyword": "Space",
  "title": "NASA launches new telescope",
  "text": "NASA has successfully launched...",
  "date": "2025-10-19",
  "source": "NASA News",
  "link": "https://www.nasa.gov/article",
  "image": "https://www.nasa.gov/image.jpg"
}
```

**POST /Articles response example:**

```json
{
  "data": {
    "_id": "6500c8a1a3d2b1a234567891",
    "keyword": "Space",
    "title": "NASA launches new telescope",
    "text": "NASA has successfully launched...",
    "date": "2025-10-19",
    "source": "NASA News",
    "link": "https://www.nasa.gov/article",
    "image": "https://www.nasa.gov/image.jpg",
    "owner": "64f0c7f4a3d2b1a234567890"
  }
}
```

**DELETE /Articles/:ArticleId response example:**

```json
{
  "data": {
    "_id": "6500c8a1a3d2b1a234567891",
    "keyword": "Space",
    "title": "NASA launches new telescope",
    "text": "NASA has successfully launched...",
    "date": "2025-10-19",
    "source": "NASA News",
    "link": "https://www.nasa.gov/article",
    "image": "https://www.nasa.gov/image.jpg",
    "owner": "64f0c7f4a3d2b1a234567890"
  }
}
```

---

## Error Handling

- `400` – Bad request: invalid data or invalid ID
- `401` – Unauthorized: invalid or missing JWT token
- `403` – Forbidden: trying to delete another user’s item
- `404` – Not found: user/item does not exist or route does not exist
- `409` – Conflict: duplicate email during signup
- `500` – Internal server error

All error responses have the format:

```json
{
  "message": "Error message here"
}
```

---

## Notes

- All saved articles are linked to a user via the `owner` field.
- Users can only delete their own saved articles.
- Authentication is required for all routes except /signup and /signin.
- For list endpoints, an empty array is returned if the user has no saved articles.
