const express = require('express')
const bodyParser = require('body-parser')
const addRequestId = require('express-request-id')

const app = express();
app.use(addRequestId())
app.use(bodyParser.json())

app.get('/', (req, res) => {
   res.json({message: 'hello world', requestId: req.id});
})

app.get('/foo', ({ id, query }, res, next) => {
    const { bar } = query
    res.json( { bar: `${bar}`, requestId: id })
})

app.post('/foo', ({ id, body }, res, next) => {
    const { bar } = body

    if (typeof bar === 'undefined' ) { 
        return res
        .status(500)
        .json({ error: 'missing `bar`', requestId: id})
    }

    res.json( { bar: `${bar}`, requestId: id } )
})

const server = app.listen(8081, function () {
   const port = server.address().port
   console.log("Example app listening to port %s", port)
})
