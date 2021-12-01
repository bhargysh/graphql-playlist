const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;
const _ = require("lodash");

const dummyBookData = [
  { name: "Eye of the Sheep", genre: "Drama", id: "1", authorId: "1" },
  { name: "Intro to MLMs", genre: "Non-Fiction", id: "2", authorId: "3" },
  { name: "The Alchemist", genre: "Fiction", id: "3", authorId: "4" },
  { name: "Dune", genre: "Sci-Fi", id: "4", authorId: "2" },
  { name: "Children of Dune", genre: "Sci-Fi", id: "5", authorId: "2" },
  { name: "Intro to Economics", genre: "Non-Fiction", id: "6", authorId: "3" },
];

const dummyAuthorData = [
  { name: "Spongebob Sqaurepants", age: 32, id: "1" },
  { name: "Alana Hawaii", age: 56, id: "2" },
  { name: "Berg Shermer", age: 26, id: "3" },
  { name: "Cool Guy", age: 49, id: "4" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({ // we need this to be a function because it only gets evaluated when the whole file is complied
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
        type: AuthorType,
        resolve(parent, args) {
            return _.find(dummyAuthorData, { id: parent.authorId })
        }
    }
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
        type: new GraphQLList(BookType),
        resolve(parent, args){
            return _.filter(dummyBookData, { authorId: parent.id })
        }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // don't need to wrap in a func as we don't care about order
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } }, // pass the id when making query for book
      resolve(parent, args) { // how to get data from DB/other source
        return _.find(dummyBookData, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(dummyAuthorData, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
