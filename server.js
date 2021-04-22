const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
// const path = require('path');

const PORT = process.env.PORT || 8080

const app = express();
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// routes
const htmlRoutes = require('./routes/html-routes');
const apiRoutes = require('./routes/api-routes');
// give access to them
app.use(htmlRoutes);
app.use(apiRoutes);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});