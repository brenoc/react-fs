import express from 'express'
import ReactFS from './index'

const app = express()

app.get('/', function(req, res) {
  res.send('Hello World')
})

app.listen(3000)

ReactFS()
console.log('Express started on port 3000')
