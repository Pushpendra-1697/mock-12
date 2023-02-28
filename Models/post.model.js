const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    name: String,
    description: String,
    category: String,
    image: String,
    location: String,
    postedAt: Date,
    price: String
}, {
    versionKey: false
});

const PostModel = model('post', postSchema);

module.exports = { PostModel };