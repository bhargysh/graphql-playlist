const express = require("express");
const { graphqlHTTP } = require("express-graphql"); //allows express to understand graphql
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
mongoose.connect(
  "mongodb+srv://bharg:db2810@graphql-tutorial.iye93.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
