const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require('dotenv').config();

const { personaRoutes } = require("./routes");
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER?.toLowerCase()}.cpugfyp.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`)
mongoose.connection.on('open', function (_ref) {
    console.log('Connected to mongo server.');
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log(names || err);
    });
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/persona", personaRoutes);

app.listen(process.env.PORT || 8081);