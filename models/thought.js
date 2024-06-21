const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
    title: {type: String, required: true},
    object: {type: String, required: true},
    description: String,
    image: String,
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;