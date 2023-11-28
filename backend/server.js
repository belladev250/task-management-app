const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");
require("dotenv").config();
require('./config/db')

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use(errorHandler);
app.listen(port, () => console.log(`Server started listening on port ${port}`));
