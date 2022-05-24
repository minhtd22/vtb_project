/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(express.json());
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to minhtd application.' });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/product.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require('./app/models/index');

const Role = db.role;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
    initial();
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

const initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: 'moderator',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: 'admin',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
};
