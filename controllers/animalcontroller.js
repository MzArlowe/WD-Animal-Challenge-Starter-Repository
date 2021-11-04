const express = require("express");
const router = express.Router();
const { Animal } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");

router.post("/create", async (req, res) => {

    let { name, legNumber, predator } = req.body.animal;

    try {
        const NewAnimal = await Animal.create({
            name,
            legNumber,
            predator
        });

        res.status(201).json({
            message: "Animal successfully created",
            user: NewAnimal
        })
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Animal already listed",
            });
        } else {
            res.status(500).json({
                message: "Unable to create animal",
            });
        }
    }
});

router.delete("/delete/:id", async (req, res) => {
    const animalId = req.params.id;

    try {
        const query = {
            where: {
                id: animalId,
            }
        };
        await Animal.destroy(query);
        res.status(200).json({
            message: "Animal Entry Removed!"
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/", async (req, res) => {
    try {
        const entries = await Animal.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;