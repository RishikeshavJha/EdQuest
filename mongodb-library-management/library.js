// MongoDB Fundamentals Assignment - Library Management Database

db = db.getSiblingDB("libraryDB");

db.books.drop();
db.authors.drop();
db.genres.drop();

const authorResult = db.authors.insertMany([
  { name: "R. K. Narayan", country: "India", birthYear: 1906 },
  { name: "J. K. Rowling", country: "United Kingdom", birthYear: 1965 },
  { name: "George Orwell", country: "United Kingdom", birthYear: 1903 },
  { name: "Paulo Coelho", country: "Brazil", birthYear: 1947 },
  { name: "Jane Austen", country: "United Kingdom", birthYear: 1775 }
]);

const genreResult = db.genres.insertMany([
  { name: "Fiction" },
  { name: "Fantasy" },
  { name: "Dystopian" },
  { name: "Philosophical Fiction" },
  { name: "Romance" }
]);

const authors = authorResult.insertedIds;
const genres = genreResult.insertedIds;

db.books.insertMany([
  { title: "Malgudi Days", authorId: authors[0], genreId: genres[0], publishedYear: 1943, available: true, copies: 4 },
  { title: "Harry Potter and the Philosopher's Stone", authorId: authors[1], genreId: genres[1], publishedYear: 1997, available: true, copies: 6 },
  { title: "1984", authorId: authors[2], genreId: genres[2], publishedYear: 1949, available: true, copies: 3 },
  { title: "The Alchemist", authorId: authors[3], genreId: genres[3], publishedYear: 1988, available: false, copies: 2 },
  { title: "Pride and Prejudice", authorId: authors[4], genreId: genres[4], publishedYear: 1813, available: true, copies: 5 }
]);

db.books.createIndex({ title: 1 });
db.books.createIndex({ publishedYear: 1 });
db.authors.createIndex({ name: 1 });

print("\nAll books:");
db.books.find().forEach(printjson);

print("\nBooks containing 'Harry':");
db.books.find({ title: /harry/i }).forEach(printjson);

print("\nBooks published after 1950:");
db.books.find({ publishedYear: { $gt: 1950 } }).forEach(printjson);

print("\nAvailable books:");
db.books.find({ available: true }).forEach(printjson);

print("\nAuthors from the United Kingdom:");
db.authors.find({ country: "United Kingdom" }).forEach(printjson);

print("\nAuthors whose names start with J:");
db.authors.find({ name: /^J/i }).forEach(printjson);

// UPDATE
db.books.updateOne(
  { title: "The Alchemist" },
  { $set: { available: true }, $inc: { copies: 1 } }
);

// DELETE
db.books.insertOne({
  title: "Temporary Book",
  authorId: authors[0],
  genreId: genres[0],
  publishedYear: 2026,
  available: true,
  copies: 1
});
db.books.deleteOne({ title: "Temporary Book" });

// Relationship-style query with $lookup
print("\nBooks with author names:");
db.books.aggregate([
  { $lookup: {
      from: "authors",
      localField: "authorId",
      foreignField: "_id",
      as: "author"
  }},
  { $unwind: "$author" },
  { $project: { _id: 0, title: 1, publishedYear: 1, available: 1, author: "$author.name" } }
]).forEach(printjson);

print("\nLibrary database setup completed.");
