import { React, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

const AddBooks = () => {
  const Authors = () => {
    const { loading, error, data } = useQuery(getAuthorsQuery);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error, uh oh!</div>;

    return data.authors.map(({ name, id }) => (
      <option key={id} value={id}>
        {name}
      </option>
    ));
  };

  const [bookName, setBookName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthor] = useState("");

  const [addBookMutationFunction, { loading, error }] =
    useMutation(addBookMutation);

  const onSubmit = (event) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error, uh oh!</div>;

    addBookMutationFunction({
      variables: { name: bookName, genre: genre, authorId: authorId },
      refetchQueries: [{ query: getBooksQuery }],
    });

    event.preventDefault();
  };

  return (
    <div>
      <form id="add-book" onSubmit={onSubmit}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            value={bookName}
            onChange={(event) => setBookName(event.target.value)}
          />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          />
        </div>

        <div className="field">
          <label>Author:</label>
          <select
            value={authorId}
            onChange={(event) => setAuthor(event.target.value)}
          >
          <option>Select author</option>
          <Authors />
          </select>
        </div>

        <button>+</button>
      </form>
    </div>
  );
};

export default AddBooks;
