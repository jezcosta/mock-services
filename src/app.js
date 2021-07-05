import createError from "http-errors";
import express, { json, urlencoded, static as exStatic } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import sassMiddleware from "node-sass-middleware";
import cors from "cors";

import indexRouter from "./routes/index";
import configRouter from "./routes/config";
import environmentRouter from "./routes/environment";
import mockRouter from "./routes/mock";
import statusRouter from "./routes/status";

var app = express();

// view engine setup
app.set("views", join(__dirname, "../src/views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: join(__dirname, "public"),
    dest: join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true,
  })
);
app.use(exStatic(join(__dirname, "../public")));

app.use("/mock-services/configs", configRouter);
app.use("/mock-services/environment", environmentRouter);
app.use("/mock-services/mock", mockRouter);
app.use("/mock-services/status", statusRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
