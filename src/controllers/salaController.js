exports.get = async (req, res) => {
    let salaModel = require('../models/salaModel');
    return salaModel.listarSalas();
}