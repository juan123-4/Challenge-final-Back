const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    playerImg: { type: String, required: true },
    position: { type: String, required: true },
    Age: { type: String, required: true },
    country: { type: String, required: true },
    countryImg: String,
    team: { type: String, required: true },
    teamImg: String,
    height: { type: String, required: true },
    heightImg: String,
    weight: { type: String, required: true },
    weightImg: String,
    descripcion: { type: String, required: true },
}, { timestamps: true });


const Player = mongoose.model('players', PlayerSchema);

module.exports = Player;