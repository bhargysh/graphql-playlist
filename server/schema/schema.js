const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const _ = require('lodash');

const dummyBookData = [
    {name: 'Eye of the Sheep', genre: 'Drama', id: '1'},
    {name: 'Intro to MLMs', genre: 'Non-Fiction', id: '2'},
    {name: 'The Alchemist', genre: 'Fiction', id: '3'},
    {name: 'Dune', genre: 'Sci-Fi', id: '4'},
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: { // don't need to wrap in a func as we don't care about order
        book: {
            type: BookType,
            args: { id: { type: GraphQLString }}, // pass the id when making query for book
            resolve(parent, args) { // how to get data from DB/other source
                return _.find(dummyBookData, { id: args.id })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
