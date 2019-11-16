const express = require('express')
const body_parser = require('body-parser')

const app = express()

app.use(express.static('static'))

app.listen(8080, () => console.log("Server is listening on 8080"))
