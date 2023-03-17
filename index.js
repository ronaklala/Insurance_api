const express = require("express");
var cors = require("cors");
const { default: mongoose } = require("mongoose");
var bodyParser = require("body-parser");

const app = express();
app.use(cors());

const DB =
  "mongodb+srv://Warrior:Ronak3103@mydb.tgsvt.mongodb.net/Insurance?retryWrites=true&w=majority";
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(bodyParser.json());

//Calling Routes
app.use(require("./Routes/adminRoutes"));
app.use(require("./Routes/InsuranceAgentsRoutes"));
app.use(require("./Routes/ClientRoutes"));

app.listen(process.env.PORT || 5000);
