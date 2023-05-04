const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WebshopSchema = new Schema({
    id: {
        type: Number,
        required: [true, "id måste sättas"],
        trim: true,
        unique: true,
    },
    productName: {
        type: String,
        required: [true, "produktnamn måste finnas"],
        trim: true,
    },
    price: {
        type: String,
        required: [true, "pris måste finnas"],
        trim: true,
    },
    description: {
        type: String,
        required: [false, "beskrivining av produkten är valbar"],
        trim: true,
    },
    image: {
        type: [String],
        required: [false, "bild är valbart"],
    },
});

// "id": 4,
// "name": "Tygväska",
// "price": 99,
// "description": "Tygväska",
// "image": "/publicimages/merch-bag.jpg"
