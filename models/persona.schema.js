const autoIncrement = require('@alec016/mongoose-autoincrement');
const { default: mongoose } = require("mongoose");

autoIncrement.initialize(mongoose.connection);

const personaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

personaSchema.plugin(autoIncrement.plugin, "personas")

const personaModel = mongoose.model('personas', personaSchema);

module.exports = personaModel;