const express = require("express");
const router = express.Router(); //para dar orden a las rutas
const Author = require("../models/author");

//Rutas de todos los autores
router.get("/", async (req, res) => {
    let searchOptions = {};
    if(req.query.name != null && req.query.name !== "") {
        searchOptions.name = new RegExp(req.query.name, "i");
    }
    try {
        const authors = await Author.find(searchOptions);
        res.render("authors/index", { 
            authors: authors,
            searchOptions: req.query
        });
    }catch {
        res.redirect("/");
    }
});


//Ruta de autor nuevo - mostrando un form
router.get("/new", (req, res) => {
    res.render("authors/new", { author: new Author() });
});

//Crear la ruta de autor
router.post("/", async (req, res) => {
    const author = new Author({
        name: req.body.name
    });
    try {
        const newAuthor = await author.save();
        //res.redirect(`authors/${newAuthor.id}`);
        res.redirect("authors");
    } catch {
        res.render("authors/new", {
            author:author,
            errorMessage: "Error creating author.."
        });
    }
});

module.exports = router;