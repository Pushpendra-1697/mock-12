const { Router } = require('express');
const { PostModel } = require('../Models/post.model');
const browserRoute = Router();


browserRoute.get('/', async (req, res) => {
    let { category, q, order, sort, page = 1, limit = 4 } = req.query;
    // console.log(sort, order)
    console.log(order)
    try {
        if (category) {
            let products = await PostModel.find({ category });
            res.send(products);
        } else if (q && !sort) {
            let products = await PostModel.find({ name: { $regex: `${q}`, $options: "six" } });
            res.send(products);
        } else if (page && sort && order) {
            console.log("3")
            console.log(sort, order)
            if (order == "asc") {
                let products = await PostModel.aggregate([{ $sort: { sort: 1 } }]);
                res.send(products);
            } else if (order == "desc") {
                let products = await PostModel.aggregate([{ $sort: { sort: -1 } }]);
                res.send(products);
            } else {
                let products = await PostModel.find();
                res.send(products);
            }
        } else if (page) {
            if (Number(page) === 1) {
                let products = await PostModel.find().skip(0).limit(+limit);
                res.send(products);
            } else {
                let s = Number(page) * Number(limit) - Number(limit);
                let products = await PostModel.find().skip(s).limit(+limit);
                res.send(products);
            }
        } else {
            if (order == "asc") {
                console.log(order)
                let products = await PostModel.aggregate([{ $sort: { sort: 1 } }]);
                res.send(products);
            } else if (order == "desc") {
                let products = await PostModel.aggregate([{ $sort: { sort: -1 } }]);
                res.send(products);
            } else {
                let products = await PostModel.find();
                res.send(products);
            }
        }
    } catch (err) {
        console.log(err);
        res.status(404).send({ Error: "Something went wrong" });
    }
});

browserRoute.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await PostModel.findByIdAndDelete({ _id: id });
        res.send({ msg: "Delete Successfully" });
    } catch (err) {
        console.log(err);
        res.status(404).send({ Error: "Something went wrong" });
    }
});

module.exports = { browserRoute };





