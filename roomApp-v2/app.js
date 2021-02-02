const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const router = require("./routes/routes");

app.use(router);


app.listen(8040, function() {
  console.log("Server lauscht auf http://localhost:8040");
});