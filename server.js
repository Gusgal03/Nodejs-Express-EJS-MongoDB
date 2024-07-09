if (process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
//config el viewengine con ejs
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");  //para reutilizar los html
app.use(expressLayouts);
app.use(express.static("public")); //archivs como JS, CSS, HTML
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false}));

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use("/", indexRouter);
app.use("/authors", authorRouter);


app.listen(process.env.PORT || 3000);

