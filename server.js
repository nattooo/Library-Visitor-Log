const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const app = express()
const port = 3000

// Setup Method Override
app.use(methodOverride('_method'))

// Setup EJS
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) //to parse form

// To parse JSON in req.body
app.use(express.json())

// Connect to router
const libraryMemberRouter = require('./routes/libraryMembers')
const visitorLogRouter = require('./routes/visitorLogs')

app.use('/', libraryMemberRouter);
app.use('/', visitorLogRouter);


app.listen(port, () => {
  console.log(`Library Visitor Log | Listening at http://localhost:${port}`)
})