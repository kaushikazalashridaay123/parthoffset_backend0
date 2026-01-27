const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");
const AdminRouter = require("./routes/admin.routes");
const AuthRouter = require("./routes/auth.routes");
const uploadsPath = path.join(__dirname, "uploads");
const authJWT = require("./middlewares/authJWT");

const app = express();
require("dotenv").config();

const allowedOrigins = [
  "http://localhost:5174",
  "https://beta.parthoffset.printaegis.com",
  "https://betaapi.parthoffset.printaegis.com",
  "http://localhost:5176",
  "http://localhost:5175"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow mobile, Postman, curl
 
    // Normalize: remove trailing slash
    const cleanOrigin = origin.replace(/\/$/, "");
 
    if (allowedOrigins.includes(cleanOrigin)) {
      return callback(null, true);
    } else {
      return callback(
        new Error(
          "The CORS policy for this site does not allow access from the specified origin: " + origin
        ),
        false
      );
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  exposedHeaders: ["Content-Disposition"],
};

app.use(cors(corsOptions));

app.get("/", (_, res) => {
  res.send("Welcome to Parthoffset");
});

app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use("/uploads", express.static(uploadsPath));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(morgan("tiny"));

app.use("/admin/auth",AuthRouter);
app.use("/admin",authJWT, AdminRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found", status: false });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  })
  .catch((e) => {
    console.log(e);
  });
