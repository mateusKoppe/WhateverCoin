const express = require('express')
const bodyParser = require('body-parser')
const Blockchain = require('../blockchain')

const HTTP_PORT = process.env.HTTP_PORT || 3001

const app = express()
const blockchain = new Blockchain()

app.use(bodyParser.json())

app.get('/blocks', (req, res) => {
  res.json(blockchain.chain)
})

app.post('/mine', (req, res) => {
  blockchain.addBlock(req.body.data)
  res.redirect('/blocks')
})

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`))
