const Item = require('../models/Item.js');

async function getAll(_ownerId) {
    if (_ownerId) {
        return Item.find({ _ownerId }).lean().exec();

    }
    return Item.find({}).lean().exec();
}

async function getById(id) {
    return Item.findById(id).exec();
}

async function getMyShoes(_ownerId) {
    return Item.find({ _ownerId }).lean().exec();
}

async function create(item) {
    return Item.create(item);
}

async function updateById(id, item) {
    const existing = await getById(id);

    existing.make = item.make;
    existing.model = item.model;
    existing.description = item.description;
    existing.price = item.price;
    existing.year = item.year;
    existing.material = item.material;
    existing.img = item.img;

    await existing.save();

    return existing;
}

async function deleteById(id) {
    return Item.findByIdAndDelete(id)
}

module.exports = {
    getAll,
    getById,
    getMyShoes,
    create,
    updateById,
    deleteById
}