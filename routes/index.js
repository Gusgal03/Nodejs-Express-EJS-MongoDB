const express = require("express");
const router = express.Router(); //para dar orden a las rutas

router.get("/", (req, res) => {
    res.render("index");
});

module.exports = router;