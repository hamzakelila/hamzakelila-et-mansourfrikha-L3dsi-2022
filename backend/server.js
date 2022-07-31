

const express = require("express");
const user = require("./models/userModel");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const problemeRoutes = require("./routes/problemeRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

var fileupload = require("express-fileupload");


const app = express();
dotenv.config();
connectDB();
const cors =require("cors");
app.use(cors());
app.use(express.json());
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/problemes", problemeRoutes);





 

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on PORT ${PORT}`));
app.get("/", (req, res) => {
  res.send("API is running..");
});

//app.get("/api/notes", (req, res) => {
  //res.json(notes);
//});

// app.get("/api/users/allUser", (req, res) => {
//   res.json(users);
// });

//app.get("/api/notes/:id", (req, res) => {
//const note=notes.find((n) => n._id === req.params.id);
//res.send(note);
//});
