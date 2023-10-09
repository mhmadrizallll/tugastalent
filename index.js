const express = require("express");
const session = require("express-session");
const router = require("./routers");
const app = express();
const port = 3000;

const fs = require("fs");
const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
const secret = {
  secret: "secret",
  resave: false,
  saveUninitialize: true,
  cookie: {},
};
// console.log(users)

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session(secret));
app.use("/", router);

app.listen(port, (req, res) => {
  console.log(`app running on port ${port}`);
});
