const { getAll, create, getById, updateById, deleteById } = require('../services/itemService.js');
const parseError = require('../utils/parser.js');

const dataController = require('express').Router();

dataController
    .route('/catalog')
    .get(async (req, res) => {
        try {
            const items = await getAll();
            res.status(200).json(items);
        } catch (error) {
            res.status(204).json([]);
        }
    })
    .post(async (req, res) => {
        try {
            const data = Object.assign({ _ownerId: req.user._id }, req.body)
            const item = await create(data);
            res.status(201).json(item);
        } catch (error) {
            const message = parseError(err);
            res.status(400).json({ message });
        }
    })

dataController
    .route('/catalog/:id')
    .get(async (req, res) => {
        let id = req.params.id;
        try {
            const item = await getById(id);
            res.status(200).json(item);
        } catch (error) {
            const message = parseError(err);
            res.status(400).json({ message });
        }
    })
    .put(async (req, res) => {
        let id = req.params.id;

        let data = req.body;
        try {
            const item = await updateById(id, data);
            res.status(200).json(item);
        } catch (error) {
            const message = parseError(err);
            res.status(400).json({ message });
        }
    })
    .delete(async (req, res) => {
        let id = req.params.id;
        try {
            await deleteById(id);
            res.status(200).end()
        } catch (error) {
            const message = parseError(err);
            res.status(400).json({ message });
        }
    })
module.exports = dataController;
