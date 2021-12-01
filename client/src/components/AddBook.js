import React, { Component } from "react";
import { useQuery } from "@apollo/client";
import { getAuthorsQuery } from "../queries/queries";

function Authors() {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.authors.map(({ name, id }) => (
    <option key={id} value={id}>
      {name}
    </option>
  ));
}

class AddBooks extends Component {
  render() {
    return (
      <div>
        <form id="add-book">
          <div className="field">
            <label>Book name:</label>
            <input type="text" />
          </div>

          <div className="field">
            <label>Genre:</label>
            <input type="text" />
          </div>

          <div className="field">
            <label>Author:</label>
            <select>
                <option>Select author</option>
              <Authors />
            </select>
          </div>

        </form>
      </div>
    );
  }
}

export default AddBooks;
