const { Router } = require('express');
const { PostModel } = require('../Models/post.model');
const postRoute = Router();



postRoute.post('/', async (req, res) => {
    const payload = req.body;
    try {
        const product = new PostModel(payload);
        await product.save();
        res.status(200).send({ msg: "Product Added Successfully" });
    } catch (err) {
        console.log(err);
        res.send({ Error: err })
    }
});

module.exports = { postRoute };