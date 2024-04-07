const salaModel = require('../models/salaModel');

exports.get = async (req, res) => {
    return await salaModel.listarSalas();
}