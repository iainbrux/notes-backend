const express = require("express");
const app = express();

const cors = require('cors');

app.use(express.json()); //JSON parser for POST requests
app.use(cors()) // Allow for CORS
app.use(express.static('build')) //attach frontend

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

const generateID = () => {
  const maxID = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxID + 1;
};

/* notes.map(n => n.id) creates a new array of the ID values ONLY, then finds the max number */

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = +request.params.id; // same as converting to Number
  const note = notes.find((note) => note.id === id);
  note ? response.json(note) : response.status(404).end();
});

app.delete("/api/notes/:id", (request, response) => {
  const id = +request.params.id;
  console.log("request.params = ", request.params);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const body = request.body; //the body key cannot be accessed without express.json() defined above

  if (!body.content) { //failsafe if body content is not found
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateID(),
  };

  notes = notes.concat(note);
  response.json(note);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
