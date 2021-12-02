import { React } from "react";
import { useQuery } from "@apollo/client";
import { getABookQuery } from "../queries/queries";

const BookDetails = (bookId) => {
  const { loading, error, data } = useQuery(getABookQuery, {
    variables: { id: bookId },
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error, in book details!</div>;

  const displayBookDetails = (bookData) => {
    console.log('Book data', bookData);
    if(bookData) {
      return (
        <div>
          <h2>{bookData.name}</h2>
          <p>{bookData.genre}</p>
          <p>{bookData.author.name}</p>
          <h3>All books by this author:</h3>
          <ul className="other-books">
            {bookData.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
        return (<div>No book selected...</div>);
    }
  };

  return <div id="book-details">{displayBookDetails(data)}</div>;
};

export default BookDetails;
