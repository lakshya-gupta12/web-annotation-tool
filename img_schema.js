const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Annot = new Schema({
    img_path:{
        type: String
    },
    img_annotate:{
        type: String
    },
    
});module.exports = mongoose.model('Annot', Annot);