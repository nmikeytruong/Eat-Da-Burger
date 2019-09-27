var express = require("express");

var burger = require("../models/burger.js");

var router = express.Router();

router.get("/", function(req, res) {
    burger.all(function(data) {
        var burgersObject = {
            burgers: data
        };
        console.log(burgersObject);
        res.render("index", burgersObject);
    }); 
});

router.post("/api/burgers", function(req, res) {
    console.log(req.body);
    burger.insert(
      ["burger_name", "devoured"], 
      [req.body.name, req.body.devoured], 
      function(result) {
        res.json({ id: result.insertId});
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " +req.params.id;

  burger.update({
      devoured: req.body.devoured
    }, condition, function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});



module.exports = router;