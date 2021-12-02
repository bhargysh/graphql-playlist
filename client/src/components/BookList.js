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
        {data.books.map(({ id, name }) => (
          <button key={id} onClick={(e) => setselectedBookId(id)}>
            <p key={id}>{name}</p>
          </button>
        ))}
      </ul>
      {selectedBookId && <BookDetails bookId={selectedBookId} />}
    </div>
  );
};

export default BookList;
