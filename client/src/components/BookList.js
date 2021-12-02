import { React, useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selectedBookId, setselectedBookId] = useState("");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <div>
      <ul id="book-list">
        {data.books.map(({ name, id }) => (
          <li key={id} onClick={(e) => setselectedBookId(id)}>
            {name}
          </li>
        ))}
      </ul>
      <BookDetails bookId={selectedBookId} />
    </div>
  );
};

export default BookList;
