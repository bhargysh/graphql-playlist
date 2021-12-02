import React from "react";
import { useQuery } from "@apollo/client";
import { getABookQuery } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(getABookQuery, {
    variables: { id: bookId },
    errorPolicy: "all",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.networkError.message}</div>;
  if (data) {
    const { book } = data;
    return (
      <div id="book-details">
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <h3>All books by this author:</h3>
        <ul className="other-books">
          {book.author.books.map((book) => {
            console.log("book", book);
            return <li key={book.id}>{book.name}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return <div>No book selected...</div>;
  }
};

export default BookDetails;
