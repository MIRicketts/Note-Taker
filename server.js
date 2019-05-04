const express = require("express");
const connection = require("./connection");
const path = require("path");

// create server using express() and set a port
const app = express();
const PORT = process.env.PORT || 3000;

// set middleware to handle incoming POST data
// for incoming json data
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// set up routes
app.get("/index", function (req, res) {
  res.sendFile(path.join)(__dirname, "./index.html")
});

app.get("/notes", function (req, res) {
  // send notes.html when user hits "/notes"
  res.sendFile(path.join(__dirname, "./notes.html"))
});

// API routes

// GET info from table
app.get("/api/notes", function (req, res) {
  // query(ask) database for table data
  connection.query("SELECT * FROM notes", function (err, notesData) {
    if (err) {
      // 500 error for database issue. based on the query from the database
      return res.status(500).json(err);
    }
    // if not error, send back array of data
    res.json(notesData);
  });
});

// POST route that takes in req.body and creates a new message
app.post("/api/notes", function (req, res) {
  // retrieve from notes and post message 
  connection.query("SELECT COUNT(*)", function (err, idData) {
    if (err) {
      return res.status(500).json(err);
    }



    // insert into new table using req.body 
    connection.query("INSERT INTO notes SET ?", req.body, function (err, insertInfo) {
      if (err) {
        return res.status(400).json(err);
      }
      // if info inserted correctly
      res.json({
        status: "All Good"
      })
    });
  });
});

app.get("*", function(req, res){
  res.send("<h1> 404 Error!<h1>");
});

// turn on server
// Always last in the app
app.listen(PORT, () => console.log(`You are now on local:${PORT}.`));