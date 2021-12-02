import { React, useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const [selectedBookId, setselectedBookId] = useState(undefined);
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <div>
      <ul id="book-list">
        {data.books.map(({ name, id }) => (
          <button onClick={(e) => setselectedBookId(id)}>
            <li key={id}>{name}</li>
          </button>
        ))}
      </ul>
      {selectedBookId && <BookDetails bookId={selectedBookId} />}
    </div>
  );
};

export default BookList;
