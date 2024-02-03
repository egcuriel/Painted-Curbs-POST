const express = require("express");
const database = require("./database.js");
const userRoutes = require("./routes/users.js");
const reportRoutes = require("./routes/reports.js");

const app = express();

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);


app.listen(process.env['PORT'], (err) => {
  if (err) {
    console.log("ERROR!!!!");
  } else {
    console.log("Server started on port 3001");
  }
});


