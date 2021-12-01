import React, { Component } from "react";
import { gql, useQuery } from "@apollo/client";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

function Books() {
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.books.map(({ name, id }) => <li key={id}>{name}</li>);
}

class BookList extends Component {
  render() {
    return (
      <div>
        <ul id="book-list">
          <Books/>
        </ul>
      </div>
    );
  }
}

export default BookList;
