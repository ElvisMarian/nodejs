const ObjectId = require('mongodb').ObjectId;
const { personaSchema } = require("../models");

module.exports = {
    read: async (req, res) => {
        try {
            const { id } = req.params;
            let result;
            if (id) {
                result = await personaSchema.findOne({ id });
            } else {
                result = await personaSchema.find({});
            }
            res.send({ status: 200, message: "Read successfully", result })
        } catch (err) {
            res.send({ status: 500, message: err.message })
        }
    },
    create: (req, res) => {
        console.log(req.body);
        const post = new personaSchema({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
        });
        if (!post) {
            res.send({ status: 400, message: " Object creation failed" });
        }
        post.save();
        res.send({ status: 200, message: "Object created successfully!" });
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, age, email } = req.body;

            if (!id || (!name && !age && !email)) {
                res.status(400).json({ status: 400, message: "Invalid request parameters." });
            }
            const updatedFields = {};
            if (name) {
                updatedFields.name = name;
            }
            if (age) {
                updatedFields.age = age;
            }
            if (email) {
                updatedFields.email = email;
            }
            const result = await personaSchema.findOneAndUpdate({ id }, updatedFields);
            res.status(200).json({ status: 200, message: "Object updated successfully!", initial_element: result });
        } catch (err) {
            res.send({ status: 500, message: err.message })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            if (id) {
                const persona = await personaSchema.findOneAndDelete({ id });
                res.status(200).send({ status: 200, message: "Object deleted successfully!", element: persona });
            } else {
                await personaSchema.deleteMany();
                res.status(200).send({ status: 200, message: "Objects deleted successfully!" });
            }
        } catch (err) {
            res.status(400).send({ status: 400, message: err.message });
        }
    },
}