const express = require('express');
const router = require('./routes/router')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.use(express.static('views'))

router(app)

app.listen(3000, () => console.log('port 3000'))
