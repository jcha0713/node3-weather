"use strict";

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.use(express.static(publicDirPath));
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Joohoon Cha",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Joohoon Cha",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Send me a message if you need help. Thanks, have a nice day.",
    name: "Joohoon Cha",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address to search.",
    });
  }
  const address = req.query.address;
  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location,
        forecast: data.forecast,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMsg: "Help not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMsg: "Page not found.",
  });
});

app.listen(port, () => {
  console.log(`Server is now running on port ${port}!`);
});
