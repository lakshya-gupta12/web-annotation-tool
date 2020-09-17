const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const imgRoutes = express.Router();
const PORT = 4000;
let Annot = require('./img_schema');
app.use(cors());
app.use(bodyParser.json());
const cred = require("./db");
mongoose.connect(`mongodb+srv://lakshya:${cred.pwd}@img-annotate.r95ct.mongodb.net/${cred.db_username}?retryWrites=true&w=majority`, { useNewUrlParser: true,useUnifiedTopology: true });
const connection = mongoose.connection;connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
imgRoutes.route("/").get((req,res) => {
    res.send("Hello World!")
})

imgRoutes.route('/add').post((req,res) => {
    console.log(req.body)
    let img = new Annot(req.body)
    img.save()
        .then(img => {
            res.status(200).json({'img': 'Image Annotation added successfully'});
        })
        .catch(err => {
            res.status(400).send('Annotation Failed!');
        });
})
app.use('/img', imgRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});