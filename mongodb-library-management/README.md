# MongoDB Fundamentals – Library Management Database

A simple MongoDB project demonstrating NoSQL concepts, data modeling, CRUD operations, searching, indexes, and relationships.

## Collections
- `books`
- `authors`
- `genres`

## Requirements
- MongoDB Community Server or MongoDB Atlas
- `mongosh`

## Run
Open `mongosh`, then run:

```javascript
load("library.js")
```

The script creates `libraryDB`, inserts sample data, creates indexes, and demonstrates CRUD/search operations.

## Useful queries

```javascript
use libraryDB
db.books.find()
db.books.find({ title: /harry/i })
db.books.find({ publishedYear: { $gt: 1950 } })
db.authors.find({ country: "India" })
db.books.updateOne({ title: "1984" }, { $set: { available: false } })
db.books.deleteOne({ title: "Temporary Book" })
```

## Suggested GitHub repository
`mongodb-library-management`
