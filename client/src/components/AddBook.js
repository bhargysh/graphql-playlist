import { React, useState } from "react";
import { useQuery } from "@apollo/client";
import { getAuthorsQuery } from "../queries/queries";

const AddBooks = () => {
  const Authors = () => {
    const { loading, error, data } = useQuery(getAuthorsQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error, uh oh!</p>;

    return data.authors.map(({ name, id }) => (
      <option key={id} value={id}>
        {name}
      </option>
    ));
  };

  const [book, setBookName] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");

  const onSubmit = (event) => {
    const formDetails = {
        'Book Name': book,
        'Genre': genre,
        'Author': author,
    }
    console.log(formDetails);
    event.preventDefault()
  };

  return (
    <div>
      <form id="add-book" onSubmit={onSubmit}>
        <div className="book-name-field">
          <label>Book name:</label>
          <input type="text" value={book} onChange={(event) => setBookName(event.target.value)} />
        </div>

        <div className="genre-field">
          <label>Genre:</label>
          <input type="text" value={genre} onChange={(event) => setGenre(event.target.value)}/>
        </div>

        <div className="author-field">
          <label>Author:</label>
          <select value={author} onChange={(event) => setAuthor(event.target.value)}>
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
