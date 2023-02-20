const { hasUser } = require('../middlewares/guards.js');
const { getAll, create, getById, updateById, deleteById } = require('../services/itemService.js');
const parseError = require('../utils/parser.js');

const dataController = require('express').Router();

dataController
    .route('/')
    .get(async (req, res) => {
        let _ownerId;
        if (req.query.where) {
            _ownerId = JSON.parse(req.query.where.split('=')[1]);
        }
        try {
            const items = await getAll(_ownerId);
            res.status(200).json(items);
        } catch (error) {
            res.status(204).json([]);
        }
    })
    .post(hasUser(), async (req, res) => {
        try {
            const data = Object.assign({ _ownerId: req.user._id }, req.body)
            const item = await create(data);
            res.status(201).json(item);
        } catch (err) {
            const message = parseError(err);
            res.status(400).json({ message });
        }
    })

dataController
    .route('/:id')
    .get(async (req, res) => {
        let id = req.params.id;
        try {
            const item = await getById(id);
            res.status(200).json(item);
        } catch (err) {
            const message = parseError(err);
            res.status(400).json({ message });
        }
    })
    .put(hasUser(), async (req, res) => {
        let id = req.params.id;

        let data = req.body;
        try {
            const existing = await getById(id);
            if (req.user._id != existing._ownerId) {
                return res.status(403).json({ message: 'You have to be owner of the record for edit it!' })
            }
            const item = await updateById(id, data);
            res.status(200).json(item);
        } catch (err) {
            const message = parseError(err);
            res.status(400).json({ message });
        }
    })
    .delete(async (req, res) => {
        let id = req.params.id;
        try {
            await deleteById(id);
            res.status(200).end()
        } catch (err) {
            const message = parseError(err);
            res.status(400).json({ message });
        }
    })
module.exports = dataController;
