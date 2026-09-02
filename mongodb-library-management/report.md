# MongoDB Fundamentals Assignment Report

**Student Name:** Rishikeshav Jha  
**Class:** Computer Engineering/ TE-A  
**Date:** 26-08-2026

## 1. Introduction

MongoDB is a document-oriented NoSQL database. Instead of storing information in traditional rows and tables, MongoDB stores BSON documents inside collections. This makes it suitable for applications where data structures may change over time.

For this assignment, a library management database was created with books, authors, and genres.

## 2. Installation and Configuration

MongoDB can be installed locally using MongoDB Community Server or used through MongoDB Atlas. After installation, `mongosh` can be used to interact with the database.

The supplied `library.js` file can be loaded with:

```javascript
load("library.js")
```

## 3. Data Model

The database contains three collections.

**Authors:** stores author name, country, and birth year.

**Genres:** stores genre names.

**Books:** stores title, publication year, availability, number of copies, and references to the author and genre.

MongoDB automatically provides an `_id` for each document. The `authorId` and `genreId` fields demonstrate references between collections.

## 4. CRUD Operations

CRUD means Create, Read, Update, and Delete.

- Create: `insertOne()` and `insertMany()`
- Read: `find()`
- Update: `updateOne()` and `updateMany()`
- Delete: `deleteOne()` and `deleteMany()`

The project demonstrates all four operations.

## 5. Searching

MongoDB supports filtering and regular-expression searches. For example:

```javascript
db.books.find({ title: /harry/i })
```

Books can also be filtered by publication year:

```javascript
db.books.find({ publishedYear: { $gt: 1950 } })
```

Authors can be searched by country or name pattern.

## 6. Indexes

Indexes were added to the book title, publication year, and author name fields. Indexes can improve query performance when applications frequently search or sort using those fields.

## 7. Relationships and $lookup

Although MongoDB is a NoSQL database, related data can be represented using document references. The `$lookup` aggregation stage can combine documents from different collections when an application needs relationship-style results.

## 8. Importance of NoSQL

NoSQL systems are useful for applications that require flexible schemas, scalability, rapid development, and distributed architectures. They are commonly considered for large or changing datasets, content platforms, analytics systems, and modern web applications.

MongoDB's document model can closely match the objects used by application code, which can simplify development.

## 9. Conclusion

The library project demonstrates MongoDB fundamentals including database creation, collections, document modeling, CRUD operations, search queries, indexes, references, and `$lookup`.

NoSQL databases are an important option in modern software development. The best database choice depends on the application's data structure, consistency needs, query patterns, and scalability requirements.
