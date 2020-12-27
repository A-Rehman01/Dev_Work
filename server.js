const express = require("express");
const connectDB = require("./Config/db");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;

//Database Connection
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

// Serve Static assests in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  try {
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  } catch (err) {
    console.log("err", err);
  }
}

app.listen(PORT, () => console.log(`Server running in ${PORT} PORT`));
