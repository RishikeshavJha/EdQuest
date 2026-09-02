# MongoDB Library Queries

```javascript
use libraryDB
```

### Read all books
```javascript
db.books.find()
```

### Search by title
```javascript
db.books.find({ title: /harry/i })
```

### Books published after 1950
```javascript
db.books.find({ publishedYear: { $gt: 1950 } })
```

### Available books
```javascript
db.books.find({ available: true })
```

### Authors from India
```javascript
db.authors.find({ country: "India" })
```

### Authors starting with J
```javascript
db.authors.find({ name: /^J/i })
```

### Update a book
```javascript
db.books.updateOne(
  { title: "1984" },
  { $set: { available: false } }
)
```

### Delete a book
```javascript
db.books.deleteOne({ title: "Temporary Book" })
```

### Count books
```javascript
db.books.countDocuments()
```

### Sort by publication year
```javascript
db.books.find().sort({ publishedYear: 1 })
```

### Join books with authors
```javascript
db.books.aggregate([
  {
    $lookup: {
      from: "authors",
      localField: "authorId",
      foreignField: "_id",
      as: "author"
    }
  }
])
```
