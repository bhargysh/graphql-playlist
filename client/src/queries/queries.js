import { gql } from "@apollo/client";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`

const getABookQuery = gql`
  query($id: ID!){
    book(id: $id){
      id
      name
      genre
      author{
        name
        age
        books{
          id
          name
        }
      }
    }
  }
`

export { getBooksQuery, getAuthorsQuery, addBookMutation, getABookQuery };
