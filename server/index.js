require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admins");
const authRoutes = require("./routes/auth");
const route = require("./routes/userRoute")
const passwordResetRoutes = require("./routes/passwordReset");
const uploadRoute = require("./routes/uploadRoute");
const certificatRoute = require("./routes/certificateRoute");


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", route);
app.use("/api/admins", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api", route);
app.use("/api", uploadRoute);
app.use("/api/generate", certificatRoute);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
