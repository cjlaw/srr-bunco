const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");

const app = express();
app.use(bodyParser.json());

// Serve only the static files form the dist directory
app.use(express.static("./dist/bunco"));

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/dist/bunco/index.html"));
});

const adapter = new FileAsync("db.json");
low(adapter)
  .then(db => {

    // Routes
    app.get("/api/rsvps", (req, res) => {
      const rsvps = db.get("rsvps").value();
      res.send(rsvps);
    });

    app.post("/api/rsvps", (req, res) => {
      var rsvpsCount = db.get("rsvps").value().length;

      db.get("rsvps")
        .push(req.body)
        .last()
        .assign({ id: Date.now().toString(), position: rsvpsCount })
        .write()
        .then(rsvp => res.send(rsvp));
    });

    app.delete("/api/rsvps", (req, res) => {
      const rsvps = db.get("rsvps")
        .remove()
        .write()
        .then(() => res.send());
    });

    app.get("/api/getport", function(req, res) {
      var port = process.env.PORT;
      res.json({result: port});
    });

    // Set db default values
    return db
      .defaults({
        rsvps: [{ id: 0, name: "", timestamp: "" }]
      })
      .write();
  })
  .then(() => {
    let port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Express server listening on port ${port}!`);
    });
  });
