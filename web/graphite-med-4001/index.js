const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { v4: uuid } = require("uuid");
const crypto = require('crypto');

const schema = buildSchema(`
  input UserInput {
    email: String
    role:String
  }

  type User {
    id: String
    email: String
    role: String
  }

  type Query {
    giveFlag: String
  }  

  type Mutation {
    addUser(input: UserInput): User
  }

  type Input {
    email: String
    role: String
  }

`);

class User {
  constructor(id, { email, role }) {
    this.id = id;
    this.email = email;
    this.role = role;
  }
}

//TODO: actually add users, i'm avoiding this for now cause i dont want to have to clear the users out etc etc
const users = new Map();

let cleanup = []; //borrowing this section from lactf ;)

setInterval(() => {
    console.log("cleanup time");
    const now = Date.now();
    let i = cleanup.findIndex((x) => now < x[1]);
    if (i === -1) {
        i = cleanup.length;
    }
    for (let j = 0; j < i; j++) {
        const account = users.get(cleanup[i][0]);
        accounts.delete(cleanup[i][0]);
    }
    cleanup = cleanup.slice(i);
}, 1000 * 60);


const root = {
  giveFlag: () => {
    return process.env.SECRET_MESSAGE || "flag";
  },

  addUser: ({ input }) => { 
    if (users.has(input.email)){
      return "Already on the list";
    }
    const id = uuid();
    const nUser = new User(id, input);
    users.set(input.email, {nUser});
    console.log(users.get(nUser.email));
    return new User(id, input);
  },
};

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <html>
    <title>Zen Yoga Group</title>
      <style>
        body {
          background-color: powderblue;
          font-family: Arial, sans-serif;
        }

        p {
          margin-top: 20px;
          margin-left: 20px;
          font-family: Arial, sans-serif;
          font-size: 20px;
        }
        
        h2 {
          margin-top: 50px;
          margin-left: 75px;
          text-shadow: 2px 2px 2px gray;
        }
        
        form {
          margin-left: 50px;
          padding: 20px;
          background-color: white;
          width: 300px;
          border-radius: 10px;
          box-shadow: 5px 5px 5px gray;
        }
        
        input[type="email"] {
          width: 250px;
          padding: 10px;
          border-radius: 5px;
          border: 2px solid lightgray;
          margin-bottom: 10px;
          font-size: 16px;
        }
        
        input[type="submit"] {
          background-color: gray;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          font-size: 16px;
        }
      </style>
      <body>

        <h2>Join our mailing list!</h2>
        <form id="register">
          <input type="email" name="email" required />
          <input type="submit" value="Submit" />
        </form>
        <p> Interested in becoming self aware? Interested in escaping your flesh prison? Join us for a class
         on becoming enlightened by looking inward. Introspection is the answer to all struggles. </p>
        <script>
          const form = document.querySelector('#register');
          form.addEventListener('submit', event => {
            event.preventDefault();
            const info = new FormData(form);
            const email = info.get('email');
            const mutation = \`
              mutation {
                addUser(input: { email: "\${email}" }) {
                  id
                  email
                }
              }
          \`;
          fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: mutation })
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              if (data.addUser === "Already on the list") {
                alert("You're already on the list!");
              } else {
                alert("Thanks for signing up!");
              }
          })
            .catch(error => console.error(error));
        });
        </script>

      </body>
    </html>
  `);
});

app.use(express.static('public'));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: false,
}));
app.listen(4001);
console.log('server started at localhost:4001');