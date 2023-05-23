var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello_world: String
    secret_flag: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello_world: () => {
    return "Hello World!";
  },

  secret_flag: () => {
    return process.env.SECRET_MESSAGE || "flag";
  }
};

var app = express();

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Scam HQ</title>
      </head>
      <body>
        <h1 style="margin: 20px;">Roboscammer HQ</h1>
        <hr>
        <p style="margin: 20px;">We're working on getting everything setup, in the meantime please keep scamming people! >:) </p>
      </body>
    </html>
  `);
});

app.use('/robots.txt', express.static('robots.txt'));

app.get('/secret-api', (req, res) => {
  res.json({
    hello_world: "Prints hello world message",
    secret_flag: "Prints the flag"
  });
});

app.use(express.static('public'));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');