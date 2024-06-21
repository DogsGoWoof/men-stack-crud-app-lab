const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Thought = require("./models/thought");
const path = require("path");

const app = express();

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
    res.render("index.ejs")
});


app.get("/thoughts", async (req, res) => {
    const allThoughts = await Thought.find();
    res.render("thoughts/index.ejs", {
        thoughts: allThoughts,
    });
});
// vv CREATE  vv //

app.get("/thoughts/new", (req, res) => {
    res.render("thoughts/new.ejs");
});

// vv READ  vv //

app.get("/thoughts/:thoughtId", async (req, res) => {
    const foundThought = await Thought.findById(req.params.thoughtId);
    res.render("thoughts/show.ejs", { 
        thought: foundThought 
    });
});

app.post("/thoughts", async (req, res) => {
    await Thought.create(req.body);
    res.redirect("/thoughts");
});

app.get("/thoughts/:thoughtId/edit", async (req, res) => {
    const foundThought = await Thought.findById(req.params.thoughtId);
    res.render("thoughts/edit.ejs", { 
        thought: foundThought 
    });
});

// vv UPDATE vv //

// vv DELETE vv //

app.listen("3000", () => {
    console.log("Listening on port 3000")
});