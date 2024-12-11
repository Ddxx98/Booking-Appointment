const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const sequelize = require('./util/database')
const userRoutes = require('./routes/user');

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user',userRoutes)

sequelize.sync()
    .then(result => {
        app.listen(3000, () => {
            //console.log(result)
            console.log("Server running in 3000")
        });
    })
    .catch(err => {
        console.log(err);
    });