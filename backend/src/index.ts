import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import { CONFIG } from "../config/config";
import sequelize from "./database/database";
import passport from "./middleware/passportMiddleware";
import userRouter from "./routes/userRoutes";
const express = require('express');

sequelize.sync().then(() => {
  console.log('Database is synchronized....');
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", userRouter);

app.listen(CONFIG.PORT.PORT, () => {
  console.log(`Server is running on PORT ${CONFIG.PORT.PORT}...`);
});