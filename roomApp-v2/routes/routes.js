const express = require("express");
const router = express.Router();
const module_rooms = require("../models/rooms");

router.use(express.static("public"));

router.get("/", function(req, res, next) {
  res.render("dashboard");
});

router.get("/raumliste", function(req, res, next) {
  res.render("index", {
    raeume: module_rooms.getIndexInnerListHTML
  });
});

router.get("/raumdetail", function(req, res, next) {
  res.render("details");
});

router.get("/buchungsdetail", function(req, res, next) {
  res.render("booking");
});

router.get("/neuebuchung", function(req, res, next) {
  res.render("reserve");
});

router.use(function(req, res, next){
  res.status(404);
  res.render("404");
});

module.exports = router;